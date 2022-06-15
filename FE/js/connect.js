var web3Modal
var provider
var web3Instance
var contractExt
var account
const busdabi = [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[],"name":"_decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burn","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}];
const lotteryAbi = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "Bet",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_dealer",
				"type": "address"
			}
		],
		"name": "changeDealer",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "ClaimPrize",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "claimReward",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_token",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "loterrySetup",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "betNumber",
				"type": "uint256"
			}
		],
		"name": "playGame",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_token",
				"type": "address"
			}
		],
		"name": "setToken",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "setTokenAmount",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "startAgain",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "stopGame",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "StopGame",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "_buyAmount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "_totalToken",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "_totalUsers",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "_winerNumber",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "_winNumber",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "dealer",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getTotalToken",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getWinNumber",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getWonUsers",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "isStop",
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
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "token",
		"outputs": [
			{
				"internalType": "contract IERC20",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

var store = {
    accountData:null,
    allowance:0,
    balance:0,
	busdBalance:0
}
const lottery = '0xE77329eF58253972C5c4bd99B42EB8E2FD7042C1'
const busd = '0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee' //BUSD Testnet

const ellipseAddress = (
  address,
  width = 10
) =>  {
  return `${address.slice(0, width)}...`
}

const contractInit = () => {
    web3Modal = new window.Web3Modal.default({
        // network: getNetwork(),
        cacheProvider: true,
        providerOptions: getProviderOptions()
    })

    if (web3Modal.cachedProvider) {
        onConnect()
    }
}

const getProviderOptions = () => {
    const providerOptions = {
        walletconnect: {
            package: window.WalletConnectProvider.default,
            options: {
                rpc: {
                    '1': 'https://bsc-dataseed1.defibit.io',
                    '56': 'https://bsc-dataseed1.defibit.io',
                },
            }
        }
    }
    return providerOptions
}

const fetchAccountData = async () => {
    const accounts = await web3Instance.eth.getAccounts()
    account = accounts[0]
    return account
}

const fetchAccountAllowance = () => {
    contractExt = new web3Instance.eth.Contract(busdabi, busd)
    return contractExt.methods.allowance(store.accountData, lottery).call()
}

const approve = () => {
    const contractExt = new web3Instance.eth.Contract(busdabi, busd)
    const amount = "1000000000000000000000000";//Approve Max
    const tx = {
        from: store.accountData,
        to: busd,
        data: contractExt.methods.approve(lottery, web3Instance.utils.toWei(amount)).encodeABI()
    }
    return web3Instance.eth.sendTransaction(tx)
}

const getBalance = async (account) => {
    //get current token address available in wallet
    const tokenInst = new web3Instance.eth.Contract(busdabi, busd)
    const bal = await tokenInst.methods.balanceOf(account).call()
	store.busdBalance = bal / 1e18;
    //show noti    
    return store.busdBalance;
}

const isGameStop = async () => {
    const tokenInst = new web3Instance.eth.Contract(lotteryAbi, lottery)
    const bal = await tokenInst.methods.isStop().call();
	store.isGameStop = bal;
    //show noti    
    return store.isGameStop
}

const getWonUsers = async () => {
    const tokenInst = new web3Instance.eth.Contract(lotteryAbi, lottery)
    return tokenInst.methods.getWonUsers().call()
}

const getBNBBalance = async (account) => {
    const a = await web3Instance.eth.getBalance(account)
	store.balance = parseFloat(web3Instance.utils.fromWei(a, 'ether'));
    return store.balance
}

const onConnect = async () => {
    try {
        provider = await web3Modal.connect()
		web3Instance = new window.Web3(provider);
    } catch (e) {
        console.log('Could not get a wallet connection', e)
        return
    }

    // Subscribe to accounts change
    provider.on('accountsChanged', (accounts) => {
        // console.log('accounts:', accounts)
        onLogout()
        // buyAction()
    })
    // Subscribe to chainId change
    provider.on('chainChanged', (chainId) => {
        // buyAction()
        onLogout()
    })

    provider.on("disconnect", (error) => {
        onLogout()
        console.log(error)
    })

    store.accountData = await fetchAccountData();
	console.log("ACCOUNT DATA");
	updateUI()
	getBNBBalance(store.accountData);
	getBalance(store.accountData);
	isGameStop();
    store.allowance = await fetchAccountAllowance();
	updateUI()
}

const reloadBalance = async () => {
	store.balance = await getBNBBalance(store.accountData);
	store.busdBalance = await getBalance(store.accountData);
    updateUI()
}

const updateUI = () => {
  Main.updateUI()
}

const onLogout = async () => {
    store.accountData = null
    store.allowance = 0;
    store.balance = 0
    // buyAction()
    if (provider && provider.disconnect) {
        await provider.disconnect()
    }
    if (provider && provider.close) {
        await provider.close()
    }

    await web3Modal.clearCachedProvider()
    provider = null
    account = null
}

const playGame = (lotNum) => {
    web3Instance = new window.Web3(provider)
    let routerExt = new web3Instance.eth.Contract(lotteryAbi, lottery)
    let tx = {
        from: store.accountData,
        to: lottery,
        data: routerExt.methods.playGame(lotNum).encodeABI()
    }
    return web3Instance.eth.sendTransaction(tx).finally(res => reloadBalance);
}
contractInit()
