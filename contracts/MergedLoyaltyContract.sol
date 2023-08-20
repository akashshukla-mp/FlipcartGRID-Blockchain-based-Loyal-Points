// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract MergedLoyaltyContract is ERC20 {
    address public owner;

    mapping(address => uint256) public userBalances;
    // mapping(address => uint256) public sellerBalances;
    mapping(address => bool) public isSeller;
    // address[] public users;

    constructor(
        string memory name,
        string memory symbol,
        uint256 initialSupply
    ) ERC20(name, symbol) {
        _mint(msg.sender, initialSupply);
        owner = msg.sender;
        isSeller[msg.sender] = true; // Owner is also a seller by default
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    modifier onlySeller() {
        require(
            isSeller[msg.sender],
            "Only authorized sellers can perform this action"
        );
        _;
    }

    function addSeller(address newSeller) public onlyOwner {
        isSeller[newSeller] = true;
    }

    function removeSeller(address seller) public onlyOwner {
        isSeller[seller] = false;
    }

    function setSellerBalance(
        address seller,
        uint256 balance
    ) public onlyOwner {
        userBalances[seller] = balance;
        isSeller[seller] = true;
    }

    function grantTokensToUser(address user, uint256 amount) public onlySeller {
        require(amount > 0, "Amount must be greater than 0");
        require(
            userBalances[msg.sender] >= amount,
            "Insufficient seller balance"
        );

        userBalances[msg.sender] -= amount;
        userBalances[user] += amount;
        _mint(user, amount);
        // if(!findUser(user)) users.push(user);
    }

    function redeemTokens(uint256 amount) public {
        require(
            userBalances[msg.sender] >= amount,
            "Insufficient balance to redeem"
        );

        _burn(msg.sender, amount);
        userBalances[msg.sender] -= amount;
    }

    

    function checkBalance() public view returns (uint256) {
        return userBalances[msg.sender];
    }

    // function mint(address account, uint256 amount) public onlyOwner {
    //     _mint(account, amount);
    //     // if(!isSeller[account] && !findUser(account)) users.push(account);

    //     userBalances[account] += amount;

    // }

    function getSender() public view returns (address) {
        return owner;
    }
}
// function getAllUserBalances() public view onlyOwner returns (address[] memory, uint256[] memory) {
//     uint256 userCount = users.length; // Assuming you have a list of users
//     address[] memory userAddresses = new address[](userCount);
//     uint256[] memory userBalancesArray = new uint256[](userCount);

//     for (uint256 i = 0; i < userCount; i++) {
//         address user = users[i]; // Assuming you have a list of users
//         userAddresses[i] = user;
//         userBalancesArray[i] = userBalances[user];
//     }

//     return (userAddresses, userBalancesArray);
// }

//     function findUser(address user) public view returns (bool) {
//             for (uint256 i = 0; i < users.length; i++) {
//                 if (users[i] == user) {
//                     return true;
//                 }
//             }
//             return false;
//     }
// }
