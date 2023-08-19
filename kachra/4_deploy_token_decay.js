const TokenDecay = artifacts.require("TokenDecay");
const LoyaltyToken = artifacts.require("LoyaltyToken"); // Import LoyaltyToken contract

module.exports = async function (deployer) {
  // Deploy LoyaltyToken contract
  await deployer.deploy(LoyaltyToken, "LoyaltyToken", "MATIC", 1000000); // Adjust the initial supply as needed

  // Get the deployed LoyaltyToken contract instance
  const loyaltyTokenInstance = await LoyaltyToken.deployed();

  // Deploy TokenDecay contract with the retrieved token address
  await deployer.deploy(TokenDecay, loyaltyTokenInstance.address);
};
