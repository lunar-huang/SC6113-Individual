const contractAddress = '0x68373fCaDd421231E0b8a55B69d6423df15F8D3a';
const contractABI = [
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "borrow",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "deposit",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "payBack",
        "outputs": [],
        "stateMutability": "nonpayable",
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
        "name": "balances",
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
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "borrowed",
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
        "name": "lend",
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
        "name": "totalDeposits",
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
        "name": "viewBalance",
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
        "name": "viewBorrowed",
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
        "name": "viewTotalDeposits",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

const web3 = new Web3(Web3.givenProvider);
const contract = new web3.eth.Contract(contractABI, contractAddress);

async function depositValue() {
    const accounts = await web3.eth.requestAccounts();
    const value = document.getElementById('moneyInput').value;
    console.log("value: " + value);
    console.log("accounts[0] " + accounts[0]);
    await contract.methods.deposit(value).send({ from: accounts[0] });
}

async function payBack() {
    const accounts = await web3.eth.requestAccounts();
    const value = document.getElementById('moneyInput').value;
    console.log("value: " + value);
    console.log("accounts[0] " + accounts[0]);
    await contract.methods.payBack(value).send({ from: accounts[0] });
}

async function getTotalDepositValue() {
    // 获取当前用户的账户地址（使用 MetaMask）
    const accounts = await web3.eth.requestAccounts();
    const account = accounts[0];  // 正确获取账户地址
    const balances = await contract.methods.balances(account).call();
    // 打印并显示借款余额
    console.log("Personal Balances: " + account + ": " + balances);
    document.getElementById('balances').innerText = "Balance Value: " + balances;
    return balances;
}

async function borrowValue() {
    const accounts = await web3.eth.requestAccounts();
    const value = document.getElementById('borrowAmount').value;
    console.log("value: " + value);
    console.log("accounts[0] " + accounts[0]);
    await contract.methods.borrow(value).send({ from: accounts[0] });
}

async function getAvailValue(elementId) {
    const storedValue = await contract.methods.viewTotalDeposits().call();
    console.log("Available money " + storedValue);

    if (!elementId) {
        return storedValue;
    }

    // 获取指定的元素
    const element = document.getElementById(elementId);
    // 判断元素类型并根据不同情况设置内容
    if (element.tagName === "INPUT") {
        // 如果是 input 元素，将其 value 设置为借款余额
        element.value = storedValue;
    } else if (element.tagName === "P" || element.tagName === "SPAN") {
        // 如果是 p 或 span 元素，将其 innerText 设置为借款余额
        element.innerText = "Available Money: " + storedValue;
    }
}

async function getBorrowedValue(elementId) {
    // 获取当前用户的账户地址（使用 MetaMask）
    const accounts = await web3.eth.requestAccounts();
    const account = accounts[0];  // 正确获取账户地址
    const borrowedAmount = await contract.methods.borrowed(account).call();
    // 打印并显示借款余额
    console.log("Borrowed value for account " + account + ": " + borrowedAmount);

    if (!elementId) {
        return borrowedAmount;
    }
    // 获取指定的元素
    const element = document.getElementById(elementId);

    // 判断元素类型并根据不同情况设置内容
    if (element.tagName === "INPUT") {
        // 如果是 input 元素，将其 value 设置为借款余额
        element.value = borrowedAmount;
    } else if (element.tagName === "P" || element.tagName === "SPAN") {
        // 如果是 p 或 span 元素，将其 innerText 设置为借款余额
        element.innerText = "Borrowed Value: " + borrowedAmount;
    }
}

async function getLendValue() {
    // 获取用户的账户地址（使用 MetaMask）
    const accounts = await web3.eth.requestAccounts();
    const account = accounts[0];  // 正确获取账户地址

    // 调用合约的 `lend` 函数
    const lendValue = await contract.methods.lend().call({ from: account });
    
    // 打印 lend 值到控制台
    console.log("Current lend value: " + lendValue);

    return lendValue;
}
