// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract LoyaltyProgram {
    address public tokenAddress; // Address of the LoyaltyToken contract
    uint256 public redemptionPeriod; // Time period in seconds after which tokens expire

    mapping(address => uint256) public userBalances;

    constructor(address _tokenAddress, uint256 _redemptionPeriod) {
        tokenAddress = _tokenAddress;
        redemptionPeriod = _redemptionPeriod;
    }

    modifier withinRedemptionPeriod() {
        require(
            block.timestamp < redemptionPeriod,
            "Redemption period has ended"
        );
        _;
    }

    function earnTokens(uint256 amount) public {
        require(amount > 0, "Amount must be greater than 0");
        IERC20 token = IERC20(tokenAddress);
        token.transferFrom(msg.sender, address(this), amount);
        userBalances[msg.sender] += amount;
    }

    function redeemTokens(uint256 amount) public withinRedemptionPeriod {
        require(
            userBalances[msg.sender] >= amount,
            "Insufficient balance to redeem"
        );
        IERC20 token = IERC20(tokenAddress);
        userBalances[msg.sender] -= amount;
        token.transfer(msg.sender, amount);
    }

    function checkBalance() public view returns (uint256) {
        return userBalances[msg.sender];
    }
}
