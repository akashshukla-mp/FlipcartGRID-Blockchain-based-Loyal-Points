// import React, { useState, useEffect } from 'react';
// import Web3 from 'web3';
// // import LoyaltyProgramContract from './LoyaltyProgram.json'; // The compiled contract ABI

// const LoyaltyProgramInteraction = () => {
//   const [web3, setWeb3] = useState(null);
//   const [contract, setContract] = useState(null);
//   const [account, setAccount] = useState(null);
//   const [balance, setBalance] = useState(0);

//   useEffect(() => {
//     async function init() {
//       if (window.ethereum) {
//         const web3Instance = new Web3(window.ethereum);
//         setWeb3(web3Instance);

//         try {
//           const accounts = await web3Instance.eth.requestAccounts();
//           setAccount(accounts[0]);

//           const networkId = await web3Instance.eth.net.getId();
//           const deployedNetwork = LoyaltyProgramContract.networks[networkId];
//           const contractInstance = new web3Instance.eth.Contract(
//             LoyaltyProgramContract.abi,
//             deployedNetwork && deployedNetwork.address
//           );
//           setContract(contractInstance);
//         } catch (error) {
//           console.error(error);
//         }
//       }
//     }

//     init();
//   }, []);

//   async function fetchBalance() {
//     if (contract && account) {
//       const balance = await contract.methods.checkBalance().call({ from: account });
//       console.log("My balance:", balance);
//       // setBalance(balance);
//     }
//   }

//   useEffect(() => {
    

//     fetchBalance();
//   }, [contract, account]);  

//   const handleEarnTokens = async () => {
//     if (contract && account) {
//       await contract.methods.earnTokens(1).send({ from: account });
//       fetchBalance();
//     }
//   };

//   const handleRedeemTokens = async () => {
//     if (contract && account) {
//       await contract.methods.redeemTokens(2).send({ from: account });
//       fetchBalance();
//     }
//   };

//   return (
//     <div>
//       <p>Your account: {account}</p>
//       <p>Your balance: {balance} tokens</p>
//       <button onClick={handleEarnTokens}>Earn Tokens</button>
//       <button onClick={handleRedeemTokens}>Redeem Tokens</button>
//     </div>
//   );
// };

// export default LoyaltyProgramInteraction;

// // import React from 'react'

// // const LoyaltyProgramInteraction = () => {
// //   return (
// //     <div>LoyaltyProgramInteraction</div>
// //   )
// // }

// // export default LoyaltyProgramInteraction
