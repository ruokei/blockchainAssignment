
window.userWalletAddress = null
const loginButton = document.getElementById('loginButton');
const userWallet = document.getElementById('userWallet');

function toggleButton() {
    if (!window.ethereum) {
        loginButton.innerText = 'MetaMask is not installed';
        loginButton.classList.remove('bg-purple-500', 'text-white');
        loginButton.classList.add('bg-gray-500', 'text-gray-100', 'cursor-not-allowed');
        return false;
    }

    loginButton.addEventListener('click', loginWithMetaMask)
}

async function loginWithMetaMask() {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        .catch((e) => {
            console.error(e.message)
            return
        })
    if (!accounts) { return }

    window.userWalletAddress = accounts[0]
    userWallet.innerText = window.userWalletAddress
    loginButton.innerText = 'Sign out of MetaMask'

    loginButton.removeEventListener('click', loginWithMetaMask)
    setTimeout(() => {
        loginButton.addEventListener('click', signOutOfMetaMask)
    }, 200)
}

function signOutOfMetaMask() {
    window.userWalletAddress = null
    userWallet.innerText = ''
    loginButton.innerText = 'Sign in with MetaMask'

    loginButton.removeEventListener('click', signOutOfMetaMask)
    setTimeout(() => {
        loginButton.addEventListener('click', loginWithMetaMask)
    }, 200)
}

window.addEventListener('DOMContentLoaded', () => {
    toggleButton()
});

// ------------------------------------------- CONTENT ------------------------------------------------------ //
async function loadWeb3() {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        window.ethereum.enable();
    }
}

async function loadContract() {
    // set ABI
    var abi = [{ "constant": true, "inputs": [{ "name": "_tweetId", "type": "uint256" }], "name": "getTweetDetail", "outputs": [{ "name": "tweetId", "type": "uint256" }, { "name": "name", "type": "string" }, { "name": "content", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_name", "type": "string" }, { "name": "_content", "type": "string" }], "name": "createTweet", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "getTotalTweet", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "uint256" }], "name": "tweets", "outputs": [{ "name": "tweetId", "type": "uint256" }, { "name": "name", "type": "string" }, { "name": "content", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "tweetId", "type": "uint256" }, { "indexed": false, "name": "name", "type": "string" }, { "indexed": false, "name": "content", "type": "string" }], "name": "NewTwitter", "type": "event" }];

    //set contract address
    var contractAddress = '0xCBdcfE1e3F664ec31833E766B4a46ba725B8c0A3';

    return await new window.web3.eth.Contract(abi, contractAddress);
}

async function addSong() {
    updateStatus('Adding Song...');
    const tweetsNumber = await window.contract.methods.getTotalTweet().call();

    for (i = 0; i < tweetsNumber; i++) {
        var result1 = await window.contract.methods.getTweetDetail(i).call();
        a.innerHTML = a.innerHTML + "<h5>" + "TweetID: " + result1[0] + " " + "Name: " + result1[1] + " Content: " + result1[2] + "</h5>";

    }

    updateStatus(`All Tweets No.: ${tweetsNumber}`);
}

async function getCurrentAccount() {
    const accounts = await window.web3.eth.getAccounts();
    return accounts[0];
}

async function changeCoolNumber() {
    updateStatus(`Updating LonelyTwitter ...`);
    const account = await getCurrentAccount();
    const coolNumber = await window.contract.methods.createTweet(document.getElementById("name").value, document.getElementById("content").value).send({ from: account });
    updateStatus('Updated.');
}

async function load() {
    await loadWeb3();
    window.contract = await loadContract();
    updateStatus('Ready!');
}

function updateStatus(status) {
    const statusEl = document.getElementById('status');
    statusEl.innerHTML = status;
    console.log(status);
}

load();
