// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/access/Ownable.sol";

contract Slice is Ownable {
    uint256 public totalInvested;
    uint256 public totalBorrowed;
    uint256 public totalInterest;
    uint256 public investorCount;

    uint8 public charge = 4;

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

    function invest(uint256 amount) public payable {
        require(msg.value == amount, "Exact amount must be sent");
        investors[msg.sender].balance += amount;
        investors[msg.sender].timeStamp = block.timestamp;
        totalInvested += amount;
        investorCount += 1;
        emit Invested(msg.sender, amount, block.timestamp);
    }

    function withdraw(uint256 amount) public {
        require(
            investors[msg.sender].balance >= amount,
            "Insufficient balance"
        );
        require(
            investors[msg.sender].timeStamp + 30 days <= block.timestamp,
            "You can withdraw after 30 days"
        );
        investors[msg.sender].balance += totalInterest / investorCount;
        totalInterest -= totalInterest / investorCount;
        investors[msg.sender].balance -= amount;
        investors[msg.sender].timeStamp = block.timestamp;
        totalInvested -= amount;
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Transfer failed.");
    }

    function register(uint16 creditScore) public {
        users[msg.sender].creditScore = creditScore;
        if (creditScore >= 50) {
            users[msg.sender].balance = 700 ether;
        } else if (creditScore > 40) {
            users[msg.sender].balance = 500 ether;
        } else if (creditScore > 30) {
            users[msg.sender].balance = 300 ether;
        } else if (creditScore > 20) {
            users[msg.sender].balance = 200 ether;
        } else if (creditScore > 10) {
            users[msg.sender].balance = 100 ether;
        } else {
            users[msg.sender].balance = 50 ether;
        }
    }

    function borrow(uint256 amount, uint8 instalments) public payable {
        require(amount <= users[msg.sender].balance, "Insufficient balance");
        require(users[msg.sender].instalments == 0, "you already have a loan");
        users[msg.sender].balance -= amount;
        users[msg.sender].borrowedAmount += amount;
        users[msg.sender].instalments = instalments;
        users[msg.sender].instalmentAmount =
            (amount + (amount * charge * instalments) / 100) /
            instalments;
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
        totalInterest +=
            users[msg.sender].instalmentAmount -
            users[msg.sender].borrowedAmount /
            users[msg.sender].instalments;
        users[msg.sender].borrowedAmount -=
            users[msg.sender].borrowedAmount /
            users[msg.sender].instalments;
        users[msg.sender].instalments -= 1;
        totalBorrowed -= users[msg.sender].borrowedAmount;
        users[msg.sender].lastPayed = block.timestamp;

        emit Repay(msg.sender, msg.value, block.timestamp);
    }

    function setCharge(uint8 _charge) external onlyOwner {
        charge = _charge;
    }

    receive() external payable {}

    fallback() external payable {}
}
