
const ethers = require("ethers");


const rpcURL = 'https://xterio.alt.technology/';
const provider = new ethers.JsonRpcProvider(rpcURL);

const contractAddress = '0xBeEDBF1d1908174b4Fc4157aCb128dA4FFa80942';
const contractABI = [{"inputs":[{"internalType":"address","name":"_gateway","type":"address"},{"internalType":"address","name":"_payeeAddress","type":"address"},{"internalType":"address","name":"_eggAddress","type":"address"},{"internalType":"address","name":"_chatNFTAddress","type":"address"},{"internalType":"uint256","name":"_eventStartTime","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"booster","type":"address"},{"indexed":true,"internalType":"uint256","name":"chapterIndex","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"boostPrice","type":"uint256"}],"name":"Boost","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"claimer","type":"address"},{"indexed":false,"internalType":"address","name":"nftaddress","type":"address"},{"indexed":true,"internalType":"uint256","name":"chapterIndex","type":"uint256"}],"name":"ClaimChatNFT","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"claimer","type":"address"},{"indexed":false,"internalType":"address","name":"nftaddress","type":"address"}],"name":"ClaimEgg","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"claimer","type":"address"},{"indexed":true,"internalType":"uint8","name":"utilityType","type":"uint8"}],"name":"ClaimUtility","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"count","type":"uint256"}],"name":"Regenerate","type":"event"},{"inputs":[],"name":"BOOST_PRICE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"CHAPTER_PERIOD","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"DAY_PERIOD","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_CHAPTER","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_REGENERATE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_UTILITIES_PER_DAY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"boost","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"boosted","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"chatNFTAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"chatNFTClaimed","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"checkChapterStatus","outputs":[{"internalType":"bool","name":"chatNFTClaimedStatus","type":"bool"},{"internalType":"bool","name":"boostedStatus","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"checkChatNFTClaimStatusBatch","outputs":[{"internalType":"bool[]","name":"","type":"bool[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"claimChatNFT","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"claimEgg","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint8","name":"utilityType","type":"uint8"}],"name":"claimUtility","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"uint8","name":"utilityType","type":"uint8"},{"internalType":"uint256","name":"dayIdx","type":"uint256"}],"name":"claimedUtilities","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"uint8","name":"utilityType","type":"uint8"}],"name":"claimedUtilitiesToday","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"uint8[]","name":"utilityTypes","type":"uint8[]"}],"name":"claimedUtilitiesTodayBatch","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"eggAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"eggClaimed","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"eventStartTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"gateway","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"payeeAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"regenerate","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"regenerated","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_addr","type":"address"}],"name":"setChatNFTAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_addr","type":"address"}],"name":"setEggAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_gateway","type":"address"}],"name":"setGateway","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_payee","type":"address"}],"name":"setPayeeAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}];


function createContractCall(wallet_pk) {
    const wallet_imp = new ethers.Wallet(wallet_pk);
    const signer = wallet_imp.connect(provider);

    return new ethers.Contract(contractAddress,contractABI,signer);
}

async function checkEggClaim(contract_object,wallet_address) {
    return await contract_object.eggClaimed.staticCall(wallet_address);
}

async function eggClaim(contract_object) {
    return await contract_object.claimEgg();
}

async function checkUtilitiesClaim(contract_object,wallet_address,type) {
    return await contract_object.claimedUtilitiesToday.staticCall(wallet_address,type);
}

async function claimUtility(contract_object,type) {
    return await contract_object.claimUtility(type);
}

async function checkNFTClaim(contract_object,wallet_address) {
    const {chatNFTClaimedStatus, _} = await contract_object.checkChapterStatus(wallet_address);

    return chatNFTClaimedStatus;
}

async function chatNFTClaim(contract_object) {
    return await contract_object.claimChatNFT();
}

function get_wallet_address_by_pk(wallet_pk) {
    const wallet_imp = new ethers.Wallet(wallet_pk);
    return wallet_imp.address;
}

async function get_wallet_balance(wallet_address) {
    return await provider.getBalance(wallet_address);
}

async function get_current_block_number() {
    return await provider.getBlockNumber();
}

async function get_block_info(block_number) {
    return await provider.getBlock(block_number);
}

async function sign_data(text,wallet_pk) {
    const wallet_imp = new ethers.Wallet(wallet_pk);
    
    return await wallet_imp.signMessage(text);
}

async function get_gas_price(get_from_rpc_api) {
    if (get_from_rpc_api) {
        return await provider.getGasPrice();
    }

    const current_block_number = await get_current_block_number();
    const last_block_info = await get_block_info(current_block_number - 1);

    return parseInt(last_block_info['baseFeePerGas']);
}


export {
    createContractCall,
    checkEggClaim,
    eggClaim,
    checkUtilitiesClaim,
    claimUtility,
    checkNFTClaim,
    chatNFTClaim,
    get_wallet_balance,
    get_gas_price,
    get_wallet_address_by_pk,
    sign_data
}
