const LoyaltyToken = artifacts.require("LoyaltyToken");

module.exports = function (deployer) {
  const initialSupply = web3.utils.toWei("1000000", "ether"); // Initial supply in Wei (adjust as needed)
  deployer.deploy(LoyaltyToken, "LoyaltyToken", "MATIC", initialSupply);
};
