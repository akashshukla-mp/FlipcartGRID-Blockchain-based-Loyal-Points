// import React, { useState, useEffect } from 'react';
// import Web3 from 'web3';
// // import TokenDecayContract from './TokenDecay.json'; // The compiled contract ABI

// const DecayInteractionComponent = () => {
//   const [web3, setWeb3] = useState(null);
//   const [contract, setContract] = useState(null);
//   const [account, setAccount] = useState(null);

//   useEffect(() => {
//     async function init() {
//       if (window.ethereum) {
//         const web3Instance = new Web3(window.ethereum);
//         setWeb3(web3Instance);

//         try {
//           await window.ethereum.enable(); // Request user permission to access accounts
//           const accounts = await web3Instance.eth.getAccounts();
//           console.log(accounts);
//           setAccount(accounts[0]);

//           const networkId = await web3Instance.eth.net.getId();
//           const deployedNetwork = TokenDecayContract.networks[networkId];
//           const contractInstance = new web3Instance.eth.Contract(
//             TokenDecayContract.abi,
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

//   const handleDecayTokens = async () => {
//     if (contract && account) {
//       try {
//         await contract.methods.decayTokens().send({ from: account });
//         console.log("Tokens decayed successfully");
        

//       } catch (error) {
//         console.error("Error decaying tokens:", error);
//       }
//     }
//   };

//   return (
//     <div>
//       <p>Your account: {account}</p>
//       <button onClick={handleDecayTokens}>Decay Tokens</button>
//     </div>
//   );
// };

// export default DecayInteractionComponent;
