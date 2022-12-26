// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Slice {
    uint256 public totalInvested;
    uint256 public totalBorrowed;
    uint256 public totalInterest;

    struct User {
        uint256 balance;
        uint256 instalmentAmount;
        uint256 borrowedAmount;
        uint256 timeStamp;
        uint256 lastPayed;
        uint8 instalments;
        uint32 creditScore;
    }

    mapping(address => User) public users;
    mapping(address => uint256) public investors;

    event Borrow(
        address indexed user,
        uint256 amount,
        uint8 instalments,
        uint256 timeStamp
    );

    event Repay(address indexed user, uint256 amount, uint256 timeStamp);
    event Invested(address indexed user, uint256 amount, uint256 timeStamp);

    function invest(uint amount) public payable {
        require(msg.value == amount, "Exact amount must be sent");
        investors[msg.sender] += amount;
        totalInvested += amount;
        emit Invested(msg.sender, amount, block.timestamp);
    }

    function borrow(
        uint amount,
        uint8 instalments,
        uint256 instalment_amount
    ) public {
        require(amount <= users[msg.sender].balance, "Insufficient balance");
        require(instalments == 0, "you already have a loan");
        users[msg.sender].balance -= amount;
        users[msg.sender].borrowedAmount += amount;
        users[msg.sender].instalments = instalments;
        users[msg.sender].instalmentAmount = instalment_amount;
        users[msg.sender].timeStamp = block.timestamp;
        totalBorrowed += amount;
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Transfer failed.");
        emit Borrow(msg.sender, amount, instalments, block.timestamp);
    }

    function repay() public payable {
        require(
            msg.value == users[msg.sender].instalmentAmount,
            "Exact amount must be sent"
        );
        users[msg.sender].instalments -= 1;
        users[msg.sender].borrowedAmount -=
            users[msg.sender].borrowedAmount /
            users[msg.sender].instalments;
        totalBorrowed -= users[msg.sender].borrowedAmount;
        users[msg.sender].lastPayed = block.timestamp;
        emit Repay(msg.sender, msg.value, block.timestamp);
    }
}
