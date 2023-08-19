// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract LoyaltyToken is ERC20 {
    address public owner;

    mapping(address => uint256) public userBalances;

    constructor(
        string memory name,
        string memory symbol,
        uint256 initialSupply
    ) ERC20(name, symbol) {
        _mint(msg.sender, initialSupply);
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    function mint(address account, uint256 amount) public onlyOwner {
        _mint(account, amount);
    }

    function earnTokens(uint256 amount) public {
        require(amount > 0, "Amount must be greater than 0");
        _mint(msg.sender, amount);
        userBalances[msg.sender] += amount;
    }

    function redeemTokens(uint256 amount) public {
        require(userBalances[msg.sender] >= amount, "Insufficient balance");
        _burn(msg.sender, amount);
        userBalances[msg.sender] -= amount;
    }

    function getBalance() public view returns (uint256) {
        return userBalances[msg.sender];
    }
    
    function getSender() public view returns (address){
        return msg.sender;
    }

}
