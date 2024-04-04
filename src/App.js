
import './App.css';

import React, { useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';


const palioAPI = require('./palioAPI');


async function login(walletPK) {
  const walletAddress = palioAPI.get_wallet_address_by_pk(walletPK);
  const signRespFetch = await fetch(`https://palio-auto-be.vercel.app/login_info?address=${walletAddress}`,{
    method: 'GET',
  });
  const signResp = await signRespFetch.json();
  const signData = signResp.data;
  const sign = await palioAPI.sign_data(signData,walletPK);
  console.log(sign);
  const authTokenRespFetch = await fetch(`https://palio-auto-be.vercel.app/login?address=${walletAddress}&sign=${sign}`,{
    method: 'GET',
  });
  const authTokenResp = await authTokenRespFetch.json();
  const authToken = authTokenResp.data;

  return authToken;
}

async function getPoint(authToken,walletAddress) {
  const getPointFetch = await fetch(`https://palio-auto-be.vercel.app/get_point?address=${walletAddress}&auth_token=${authToken}`,{
    method: 'GET',
  });
  const getPointResp = await getPointFetch.json();
  const pointInfo = getPointResp.data;

  return pointInfo;
}

async function eggEat(authToken,walletAddress,propId) {
  const eggEatFetch = await fetch(`https://palio-auto-be.vercel.app/egg_eat?address=${walletAddress}&auth_token=${authToken}&prop=${propId}`,{
    method: 'GET',
  });
  const eggEatResp = await eggEatFetch.json();
  const status = eggEatResp.data;

  return status;
}


function App() {
  const [text, setText] = useState('');
  const [LogOutput, setLogOutput] = useState('');
  const [WorkerId, setWorkerId] = useState(0);
  const [btnClass, setBtnClass] = useState('btn-primary');
  const [btnState, setBtnState] = useState('开始批量执行');

  const appendToLog = (newLog) => {
    setLogOutput(prevLog => prevLog + newLog + '\n');
};

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const executeLogic = async() => {
    setLogOutput('');

    if (btnClass === 'btn-primary') {
      setBtnClass('btn-danger');
      setBtnState('中断');
      setWorkerId(setTimeout(async () => {
        const preProcessPKList = text.split('\n');
        let pkList = [];
        let checkPKExcept = false;
        let exceptPK = '';

        for (const checkPK of preProcessPKList) {
          if (palioAPI.get_wallet_address_by_pk(checkPK)) {
            pkList.push(checkPK);
          } else {
            checkPKExcept = true;
            exceptPK = checkPK;
            break;
          }
        }

        if (!checkPKExcept) {
          appendToLog('开始批量');

          for (const walletPK of pkList) {
            const walletAddress = palioAPI.get_wallet_address_by_pk(walletPK);
            const walletBalance = await palioAPI.get_wallet_balance(walletAddress);

            if (walletBalance === 0) {
              appendToLog(`钱包地址 ${walletAddress} 没有余额`);
              continue;
            }

            appendToLog(`钱包地址 ${walletAddress} 余额还有 ${walletBalance}`);

            const authToken = await login(walletPK);

            if (authToken) {
              const pointInfo = await getPoint(authToken,walletAddress);
              console.log(walletAddress,pointInfo);
              appendToLog(`钱包地址 ${walletAddress} 登录成功`);

              const contractObject = palioAPI.createContractCall(walletPK);
              
              if (! await palioAPI.checkEggClaim(contractObject,walletAddress)) {
                appendToLog(`钱包地址 ${walletAddress} 还没有创建鸡蛋`);
                const eggClaimTX = await palioAPI.eggClaim(contractObject);
                await eggClaimTX.wait();
                appendToLog(`钱包地址 ${walletAddress} 创建鸡蛋成功 ${eggClaimTX.hash}`);
              }

              for (let index=1;index<=3;++index) {
                if (! await palioAPI.checkUtilitiesClaim(contractObject,walletAddress,index)) {
                  const utilityClaimTX = await palioAPI.claimUtility(contractObject,index);
                  await utilityClaimTX.wait();

                  if (index === 1) {
                    appendToLog(`钱包地址 ${walletAddress} 购买每日苹果成功 ${utilityClaimTX.hash}`);
                  } else if (index === 2) {
                    appendToLog(`钱包地址 ${walletAddress} 购买每日小黄鸭成功 ${utilityClaimTX.hash}`);
                  } else if (index === 3) {
                    appendToLog(`钱包地址 ${walletAddress} 购买每日光碟成功 ${utilityClaimTX.hash}`);
                  }
                }
              }

              for (let index=1;index<=3;++index) {
                if (await eggEat(authToken,walletAddress,index))
                  appendToLog(`钱包地址 ${walletAddress} 投喂鸡蛋成功 ${index}`);
                else
                  appendToLog(`钱包地址 ${walletAddress} 投喂鸡蛋失败 ${index}`);
              }

              if (! await palioAPI.checkNFTClaim(contractObject,walletAddress)) {
                const chatClaimTX = await palioAPI.chatNFTClaim(contractObject);
                await chatClaimTX.wait();

                appendToLog(`钱包地址 ${walletAddress} 领取每周加速券成功 ${chatClaimTX.hash}`);
              }
            }
          }
        } else {
          appendToLog(`私钥${exceptPK}格式不对`);
        }
      },0));
    } else {
      setBtnClass('btn-primary');
      setBtnState('开始批量执行');
      
      if (WorkerId)
        clearTimeout(WorkerId);
  
      setWorkerId(0);
    }
  }

  return (
    <div className="container mt-8">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title text-center">xter.io palio批量签到工具</h5>
              <div className="form-group">
                <label htmlFor="inputText">私钥列表</label>
                <textarea
                  className="form-control"
                  id="pkList"
                  value={text}
                  onChange={handleChange}
                  placeholder="私钥列表"
                  style={{ height: '20vh' }}
                />
                <div className="mt-2">
                  <input type="button" class={`btn ${btnClass} w-100`} value={btnState} onClick={executeLogic}></input>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="displayText">日志输出</label>
                <textarea class="form-control" readOnly value={LogOutput} style={{ height: '50vh' }}></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
