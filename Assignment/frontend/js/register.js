
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

async function loadWeb3() {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        window.ethereum.enable();
    }
}

async function loadContract() {
    // set ABI
    var abi = [
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "artistList",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "artistAddress",
                    "type": "address"
                },
                {
                    "internalType": "string",
                    "name": "artistName",
                    "type": "string"
                },
                {
                    "internalType": "bool",
                    "name": "isExist",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "customerList",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "customerName",
                    "type": "string"
                },
                {
                    "internalType": "bool",
                    "name": "isExist",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "artistAddress",
                    "type": "address"
                }
            ],
            "name": "getArtistDetail",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "address",
                            "name": "artistAddress",
                            "type": "address"
                        },
                        {
                            "internalType": "string",
                            "name": "artistName",
                            "type": "string"
                        },
                        {
                            "internalType": "bool",
                            "name": "isExist",
                            "type": "bool"
                        }
                    ],
                    "internalType": "struct User.Artist",
                    "name": "",
                    "type": "tuple"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "customerAddress",
                    "type": "address"
                }
            ],
            "name": "getCustomerDetail",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "string",
                            "name": "customerName",
                            "type": "string"
                        },
                        {
                            "internalType": "bool",
                            "name": "isExist",
                            "type": "bool"
                        }
                    ],
                    "internalType": "struct User.Customer",
                    "name": "",
                    "type": "tuple"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "isExist",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "products",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "musicId",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "musicName",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                }
            ],
            "name": "registerArtist",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                }
            ],
            "name": "registerCustomer",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ]
    //set contract address
    var contractAddress = '0xCBdcfE1e3F664ec31833E766B4a46ba725B8c0A3';

    return await new window.web3.eth.Contract(abi, contractAddress);
}

async function registerCustomer() {
    updateStatus('Registering Customer...');
    const account = await getCurrentAccount();
    const customerDet = await window.contract.methods.registerCustomer(
     document.getElementById("name1").value).send({ from: account });
    updateStatus('Registered.');
}

async function registerArtist() {
    updateStatus('Registering Artist...');
    const account = await getCurrentAccount();
    const customerDet = await window.contract.methods.registerArtist(
     document.getElementById("name2").value).send({ from: account });
    updateStatus('Registered.');
}

async function getCurrentAccount() {
    const accounts = await window.web3.eth.getAccounts();
    return accounts[0];
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
