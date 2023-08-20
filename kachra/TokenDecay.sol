// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";



contract TokenDecay {
    address public tokenAddress; // Address of the LoyaltyToken contract

    constructor(address _tokenAddress) {
        tokenAddress = _tokenAddress;
    }

    function decayTokens() public {
        IERC20 token = IERC20(tokenAddress);
        uint256 userBalance = token.balanceOf(msg.sender);
        uint256 decayedAmount = userBalance / 10; // For example, decay 10% of the balance
        token.transfer(address(this), decayedAmount);
    }
}
