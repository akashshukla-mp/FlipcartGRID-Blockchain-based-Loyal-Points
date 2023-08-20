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
        // console.log(accounts);

        const MainObject = new web3.eth.Contract(
        ContractInfo.abi,
        // CONTACT_ADDRESS.CONTACT_ADDRESS
        contractAdd
      );

      console.log(MainObject);
      
      const seller_1 = accounts[1];
      
      await MainObject.methods.addSeller(seller_1).send({ from: accounts[0] });
      var selleriii = await MainObject.methods.isSeller(seller_1).call();
      console.log("Seller_1", selleriii);
      await MainObject.methods.removeSeller(seller_1).send({ from: accounts[0] });
      selleriii = await MainObject.methods.isSeller(seller_1).call();
      console.log("Seller_1", selleriii);
      
      const newBalance = 500;
      await MainObject.methods.setSellerBalance(seller_1, newBalance).send({ from: accounts[0] });
      var seller_1_balance = await MainObject.methods.userBalances(seller_1).call({ from: accounts[0] });
      console.log("Seller_1 balance", seller_1_balance);
      // await MainObject.methods.setSellerBalance(seller_1, 100).call({from: owner});
      // const balance = await MainObject.methods.owner().call();
      // console.log("Owner", balance);
      

    }
  
  
    test();

    return (
    <div>
 
    </div>
  )
}


export default LoyaltyComp