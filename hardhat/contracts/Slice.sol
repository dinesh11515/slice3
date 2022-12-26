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

    struct Investor {
        uint256 balance;
        uint256 timeStamp;
    }

    mapping(address => User) public users;
    mapping(address => Investor) public investors;

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
        investors[msg.sender].balance += amount;
        investors[msg.sender].timeStamp = block.timestamp;
        totalInvested += amount;
        emit Invested(msg.sender, amount, block.timestamp);
    }

    function withdraw(uint amount) public {
        require(
            investors[msg.sender].balance >= amount,
            "Insufficient balance"
        );
        investors[msg.sender].balance -= amount;
        investors[msg.sender].timeStamp = block.timestamp;
        totalInvested -= amount;
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Transfer failed.");
    }

    //add logic here based on credit score
    function register(uint16 creditScore, uint256 maxAmount) public {
        users[msg.sender].creditScore = creditScore;
        users[msg.sender].balance = maxAmount;
    }

    function borrow(
        uint amount,
        uint8 instalments,
        uint256 instalment_amount
    ) public payable {
        require(amount <= users[msg.sender].balance, "Insufficient balance");
        require(users[msg.sender].instalments == 0, "you already have a loan");
        users[msg.sender].balance -= amount;
        users[msg.sender].borrowedAmount += amount;
        users[msg.sender].instalments = instalments;
        users[msg.sender].instalmentAmount = instalment_amount;
        users[msg.sender].timeStamp = block.timestamp;
        totalBorrowed += amount;
        (bool success, ) = payable(msg.sender).call{value: amount}("");
        require(success, "Transfer failed.");
        emit Borrow(msg.sender, amount, instalments, block.timestamp);
    }

    function repay() public payable {
        require(
            msg.value == users[msg.sender].instalmentAmount,
            "Exact amount must be sent"
        );
        users[msg.sender].borrowedAmount -=
            users[msg.sender].borrowedAmount /
            users[msg.sender].instalments;
        users[msg.sender].instalments -= 1;
        totalBorrowed -= users[msg.sender].borrowedAmount;
        users[msg.sender].lastPayed = block.timestamp;
        emit Repay(msg.sender, msg.value, block.timestamp);
    }

    receive() external payable {}

    fallback() external payable {}
}
