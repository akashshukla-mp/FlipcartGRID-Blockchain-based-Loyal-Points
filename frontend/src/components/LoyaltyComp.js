import React from 'react'
// import ContractInfo from "./LoyaltyProgram.json"
import { earnTokens, redeemTokens } from "./Functionality.js";
import ContractInfo from "./LoyaltyToken.json"
const Web3 = require("web3");
// const CONTACT_ABI = require("./config");
// const CONTACT_ADDRESS = require("./config");


const LoyaltyComp = () => {
  console.log("Kuch to likh de");
    const contractAdd = '0x07cbdcEA0d3D23EEB8209E28F0F1cEc3Cb4cf9eC';
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
      const senderAddress = '0x199dc5aE567dec183044e59d12232700f6aEFb3d';
      // // const balance = await MainObject.methods.
      // const senderAddress = accounts[0];
      var balance = await MainObject.methods.userBalances(senderAddress).call();
      console.log("User Balance:", balance);
      // console.log("Balance:", balance);
      // // await MainObject.methods.earnTokens(100).call();
      
      // await MainObject.methods.earnTokens(100).send({ from: senderAddress });
      // await MainObject.methods.redeemTokens(50).send({ from: senderAddress });


      
      // balance = await MainObject.methods.userBalances(randomUserAdress).call();
      // console.log("User Balance:", balance);
      // // console.log("Sender Address:", MainObject.methods.getSender().call());
      // const printit = await MainObject.methods.getSender().send({ from: senderAddress });
      //     console.log("My msg.sender", printit);


    }
  
  
    test();

    return (
    <div>
 
    </div>
  )
}


export default LoyaltyComp