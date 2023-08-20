const MergedLoyaltyContract = artifacts.require("MergedLoyaltyContract");

module.exports = function (deployer, network, accounts) {
  const initialSupply = 1000000; // Adjust the initial supply as needed
  const ownerAddress = accounts[0]; // Set the desired owner address

  deployer.deploy(MergedLoyaltyContract, "MyToken", "MT", initialSupply, { from: ownerAddress });
};

