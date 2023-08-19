// // Assuming you have already initialized web3 and have the contract instances
// // const loyaltyProgramContract = './Loyal'; // LoyaltyProgram contract instance
// // const tokenDecayContract = ...;     // TokenDecay contract instance
// // import loyaltyProgramContract from "./LoyaltyProgram.json"
// // import tokenDecayContract from "./TokenDecay.json"


// // Function to handle earning tokens
// export async function earnTokens(amount) {
//     try {
//         // Convert the amount to wei (token decimals)
//         const amountWei = web3.utils.toWei(amount.toString(), 'ether');

//         // Call the earnTokens function of the LoyaltyProgram contract
//         const accounts = await web3.eth.getAccounts();
//         const sender = accounts[0];
        
//         await loyaltyProgramContract.methods.earnTokens(amountWei).send({ from: sender });

//         // Update UI or show a success message
//         console.log(`${amount} tokens earned successfully.`);
//     } catch (error) {
//         // Handle errors
//         console.error('Error earning tokens:', error);
//     }
// }

// // Function to handle redeeming tokens
// export async function redeemTokens(amount) {
//     try {
//         // Convert the amount to wei (token decimals)
//         const amountWei = web3.utils.toWei(amount.toString(), 'ether');

//         // Call the redeemTokens function of the LoyaltyProgram contract
//         const accounts = await web3.eth.getAccounts();
//         const sender = accounts[0];

//         await loyaltyProgramContract.methods.redeemTokens(amountWei).send({ from: sender });

//         // Update UI or show a success message
//         console.log(`${amount} tokens redeemed successfully.`);
//     } catch (error) {
//         // Handle errors
//         console.error('Error redeeming tokens:', error);
//     }
// }

// // Function to handle token decay
// async function decayTokens() {
//     try {
//         // Call the decayTokens function of the TokenDecay contract
//         const accounts = await web3.eth.getAccounts();
//         const sender = accounts[0];

//         await tokenDecayContract.methods.decayTokens().send({ from: sender });

//         // Update UI or show a success message
//         console.log('Tokens decayed successfully.');
//     } catch (error) {
//         // Handle errors
//         console.error('Error decaying tokens:', error);
//     }
// }

// // Example usage
// // earnTokens(50);    // Earn 50 tokens
// // redeemTokens(20);  // Redeem 20 tokens
// // decayTokens();     // Initiate token decay
