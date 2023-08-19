import React from 'react'
// import ContractInfo from "./LoyaltyProgram.json"
import ContractInfo from "./LoyaltyToken.json"
const Web3 = require("web3");
// const CONTACT_ABI = require("./config");
// const CONTACT_ADDRESS = require("./config");


const LoyaltyComp = () => {
    const contractAdd = '0x51dCfF1baC051Ac11dC6F0870E6bE0905624A3eD';
    if (typeof web3 !== "undefined") {
        var web3 = new Web3(web3.currentProvider);
      } else {
        var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
      }
      async function test() {
        const accounts = await web3.eth.getAccounts();
        console.log(accounts);

        const MainObject = new web3.eth.Contract(
        ContractInfo.abi,
        // CONTACT_ADDRESS.CONTACT_ADDRESS
        
        contractAdd
      );
      console.log(MainObject);
      const userAddress = '0x3A0f1d8f07ace25C892CBFed2FB6dd884F0c051E';
      // const balance = await MainObject.methods.
      const   senderAddress = accounts[0];
      var balance = await MainObject.methods.userBalances(userAddress).call();
      console.log("User Balance:", balance);
      // console.log("Balance:", balance);
      // await MainObject.methods.earnTokens(100).call();
      await MainObject.methods.earnTokens(100).send({ from: senderAddress });
      
      balance = await MainObject.methods.userBalances(userAddress).call();
      console.log("User Balance:", balance);
      // console.log("Sender Address:", MainObject.methods.getSender().call());
      // const printit = await MainObject.methods.getSender().send({ from: senderAddress });
          // console.log("My msg.sender", printit);
    }
      test();
  
    return (
    <div>
        
    </div>
  )
}

export default LoyaltyComp