const LoyaltyProgram = artifacts.require("LoyaltyProgram");
const LoyaltyToken = artifacts.require("LoyaltyToken"); // Import LoyaltyToken contract

module.exports = async function (deployer) {
  // Deploy LoyaltyToken contract
  await deployer.deploy(LoyaltyToken, "LoyaltyToken", "MATIC", 1000000); // Adjust the initial supply as needed

  // Get the deployed LoyaltyToken contract instance
  const loyaltyTokenInstance = await LoyaltyToken.deployed();

  // Get the address of the deployed LoyaltyToken contract
  const tokenAddress = loyaltyTokenInstance.address;

  // Deploy LoyaltyProgram contract with the retrieved token address
  const redemptionPeriod = 169344000; // Replace with the desired redemption period in seconds
  await deployer.deploy(LoyaltyProgram, tokenAddress, redemptionPeriod);
};
