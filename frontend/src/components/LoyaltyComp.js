import React from 'react'
// import ContractInfo from "./LoyaltyProgram.json"
// import { earnTokens, redeemTokens } from "./Functionality.js";
// import ContractInfo from "./LoyaltyToken.json"
import ContractInfo from "./MergedLoyaltyContract.json";
const Web3 = require("web3");
// const CONTACT_ABI = require("./config");
// const CONTACT_ADDRESS = require("./config");


const LoyaltyComp = () => {
  // console.log("Kuch to likh de");
    const contractAdd = '0xBecF5389DD4599F1222B5AC4bf322B9AE02a0080';
    if (typeof web3 !== "undefined") {
        var web3 = new Web3(web3.currentProvider);
      } else {
        var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
      }

      //  var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
      async function test() {
        const accounts = await web3.eth.getAccounts();
        console.log(accounts);

        const MainObject = new web3.eth.Contract(
        ContractInfo.abi,
        // CONTACT_ADDRESS.CONTACT_ADDRESS
        contractAdd
      );

      console.log(MainObject);
      
      const seller_1 = accounts[1];
      await MainObject.methods.checkBalance().call({ from: seller_1 });
      


      // // const balance = await MainObject.methods.
      // const senderAddress = accounts[0];
      // var balance = await MainObject.methods.userBalances(senderAddress).call();
      // console.log("User Balance:", balance);
      // console.log("Balance:", balance);
      // // await MainObject.methods.earnTokens(100).call();
      
      // var balance = await MainObject.methods.checkBalance().call({ from: senderAddress });
      // console.log("Balance before", balance);
      // await MainObject.methods.earnTokens(100).send({ from: senderAddress });
      // await MainObject.methods.redeemTokens(50).send({ from: senderAddress });

      // var balance = await MainObject.methods.checkBalance().call({ from: senderAddress });
      // console.log("Balance after", balance);
      
      // console.log("User Balance:", balance);
      // // console.log("Sender Address:", MainObject.methods.getSender().call());
      // const printit = await MainObject.methods.getSender().call();
      //   console.log("My msg.sender", printit);

    }
  
  
    test();

    return (
    <div>
 
    </div>
  )
}


export default LoyaltyComp