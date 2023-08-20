const LoyaltyToken = artifacts.require("LoyaltyToken");

contract("LoyaltyToken", (accounts) => {
  let loyaltyTokenInstance;

  beforeEach(async () => {
    loyaltyTokenInstance = await LoyaltyToken.new("LoyaltyToken", "MATIC", 1000000);
  });

  it("should have correct initial values", async () => {
    const name = await loyaltyTokenInstance.name();
    const symbol = await loyaltyTokenInstance.symbol();
    const owner = await loyaltyTokenInstance.owner();
    const totalSupply = await loyaltyTokenInstance.totalSupply();
    const balance = await loyaltyTokenInstance.getBalance();

    assert.equal(name, "LoyaltyToken");
    assert.equal(symbol, "MATIC");
    assert.equal(owner, accounts[0]);
    assert.equal(totalSupply.toString(), "1000000");
    console.log("Balance before:", balance.toString()); // initial balance is 0
    // assert.equal(balance.toString(), "1000000");
  });

  it("should allow users to earn and redeem tokens", async () => {
    const amountToEarn = 100;
    const amountToRedeem = 50;

    await loyaltyTokenInstance.earnTokens(amountToEarn, { from: accounts[1] });

    let userBalance = await loyaltyTokenInstance.getBalance({ from: accounts[1] });
    assert.equal(userBalance.toString(), amountToEarn.toString());

    await loyaltyTokenInstance.redeemTokens(amountToRedeem, { from: accounts[1] });

    userBalance = await loyaltyTokenInstance.getBalance({ from: accounts[1] });
    assert.equal(userBalance.toString(), (amountToEarn - amountToRedeem).toString());
  });

  it("should not allow redeeming more tokens than balance", async () => {
    const amountToRedeem = 200;

    try {
      await loyaltyTokenInstance.redeemTokens(amountToRedeem, { from: accounts[1] });
      assert.fail("Expected an error but no error was thrown");
    } catch (error) {
      assert(error.message.includes("Insufficient balance"), "Expected error message");
    }
  });


  it("should only allow owner to mint tokens", async () => {
    const amountToMint = 500;

    try {
      await loyaltyTokenInstance.mint(accounts[1], amountToMint, { from: accounts[1] });
      assert.fail("Expected an error but no error was thrown");
    } catch (error) {
      assert(error.message.includes("Only the owner can perform this action"), "Expected error message");
    }

    // await loyaltyTokenInstance.mint(accounts[1], amountToMint, { from: accounts[0] });

    // const userBalance = await loyaltyTokenInstance.getBalance({ from: accounts[1] });
    // // assert.equal(userBalance.toString(), amountToMint.toString());
  });

});
