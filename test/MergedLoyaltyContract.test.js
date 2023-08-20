const MergedLoyaltyContract = artifacts.require("MergedLoyaltyContract");

contract("MergedLoyaltyContract", (accounts) => {
  let loyaltyContract;

  beforeEach(async () => {
    loyaltyContract = await MergedLoyaltyContract.new("TestToken", "TT", 1000, { from: accounts[0] });
  });

  it("should have the correct initial balance", async () => {
    const initialBalance = 1000;
    const balance = await loyaltyContract.balanceOf(accounts[0]);
    assert.equal(balance, initialBalance, "Initial balance is incorrect");
  });

  it("should earn and redeem tokens correctly", async () => {
    const initialBalance = await loyaltyContract.balanceOf(accounts[0]);
    const amount = 100;

    await loyaltyContract.earnTokens(amount);
    let balance = await loyaltyContract.balanceOf(accounts[0]);
    assert.equal(balance, initialBalance.toNumber() + amount, "Earned tokens not added to balance");

    await loyaltyContract.redeemTokens(amount);
    balance = await loyaltyContract.balanceOf(accounts[0]);
    assert.equal(balance, initialBalance, "Redeemed tokens not subtracted from balance");
  });

  it("should mint tokens correctly", async () => {
    const recipient = accounts[1];
    const amount = 200;

    await loyaltyContract.mint(recipient, amount);
    const balance = await loyaltyContract.balanceOf(recipient);
    assert.equal(balance, amount, "Minted tokens not added to recipient's balance");
  });

  it("should return the correct sender address", async () => {
    const sender = await loyaltyContract.getSender();
    assert.equal(sender, accounts[0], "getSender() did not return the correct sender");
  });
});
