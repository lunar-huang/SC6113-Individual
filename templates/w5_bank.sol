// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DepositAndBorrow {
    // 用户的存款余额
    mapping(address => uint256) public balances;

    // 用户的借款余额
    mapping(address => uint256) public borrowed;

    // 平台的总资金池
    uint256 public totalDeposits;
    // 平台总借出款项
    uint256 public lend;

    // 存款功能
    function deposit(uint256 amount) public {
        require(amount > 0, "You must deposit a positive amount.");

        // 更新用户余额
        balances[msg.sender] += amount;

        // 更新平台总存款
        totalDeposits += amount;
    }

    // 借款功能
    function borrow(uint256 amount) public {
        require(amount > 0, "You must borrow a positive amount.");
        require(totalDeposits >= amount, "Not enough funds in the platform to borrow.");

        // 更新用户借款余额
        borrowed[msg.sender] += amount;

        // 更新平台总存款
        totalDeposits -= amount;
        lend += amount;

        // 将借款发送给用户（在此处，假设用虚拟数字而不是实际的 ETH）
        // payable(msg.sender).transfer(amount); // 如果涉及实际 ETH，则解锁此行
    }

    function payBack(uint256 amount) public{
        require(amount > 0, "You must pay back a positive amount.");
        require(amount <= borrowed[msg.sender], "You must pay back less than borrowed.");
        // 更新平台总存款
        totalDeposits += amount;
        borrowed[msg.sender] -= amount;
        
    }

    // 查看存款余额
    function viewBalance() public view returns (uint256) {
        return balances[msg.sender];
    }

    // 查看借款余额
    function viewBorrowed() public view returns (uint256) {
        return borrowed[msg.sender];
    }

    // 查看平台的总存款
    function viewTotalDeposits() public view returns (uint256) {
        return totalDeposits;
    }
}
