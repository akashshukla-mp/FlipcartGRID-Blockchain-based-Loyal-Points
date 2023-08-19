import React, { Component } from 'react';
// import Web3 from 'web3'; // Make sure you have web3 installed
import LoyaltyTokenABI from './LoyaltyToken.json'; // Replace with your contract's ABI
const contractAddress = '0x841A3992616B1bc5A62BF908967C54f61B65D6e8'; // Replace with your contract's address
const Web3 = require('web3');

class LoyaltyTokenApp extends Component {
  state = {
    web3: null,
    contract: null,
    userBalance: 0,
    amountToEarn: 0,
    amountToRedeem: 0,
  };

  async componentDidMount() {
    try {
      // Connect to Web3
      const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545'); // Use the correct provider

      // Load the contract
      const contract = new web3.eth.Contract(LoyaltyTokenABI.abi, contractAddress);

      // Load user balance
      const userBalance = await contract.methods.getBalance().call({ from: web3.eth.defaultAccount });

      this.setState({ web3, contract, userBalance });
    } catch (error) {
      console.error('Error:', error);
    }
  }

  handleEarnTokens = async () => {
    const { contract, amountToEarn } = this.state;

    if (amountToEarn > 0) {
      await contract.methods.earnTokens(amountToEarn).send({ from: this.state.web3.eth.defaultAccount });
      this.updateUserBalance();
    }
  };

  handleRedeemTokens = async () => {
    const { contract, amountToRedeem } = this.state;

    if (amountToRedeem > 0) {
      await contract.methods.redeemTokens(amountToRedeem).send({ from: this.state.web3.eth.defaultAccount });
      this.updateUserBalance();
    }
  };

  updateUserBalance = async () => {
    const { contract } = this.state;
    const userBalance = await contract.methods.getBalance().call({ from: this.state.web3.eth.defaultAccount });
    this.setState({ userBalance });
  };

  render() {
    const { userBalance, amountToEarn, amountToRedeem } = this.state;

    return (
      <div>
        <h1>Loyalty Token App</h1>
        <p>Your balance: {userBalance} Tokens</p>
        <div>
          <input
            type="number"
            placeholder="Amount to earn"
            value={amountToEarn}
            onChange={(e) => this.setState({ amountToEarn: e.target.value })}
          />
          <button onClick={this.handleEarnTokens}>Earn Tokens</button>
        </div>
        <div>
          <input
            type="number"
            placeholder="Amount to redeem"
            value={amountToRedeem}
            onChange={(e) => this.setState({ amountToRedeem: e.target.value })}
          />
          <button onClick={this.handleRedeemTokens}>Redeem Tokens</button>
        </div>
      </div>
    );
  }
}

export default LoyaltyTokenApp;
