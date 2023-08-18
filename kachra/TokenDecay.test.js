const TokenDecay = artifacts.require("TokenDecay");
const LoyaltyToken = artifacts.require("LoyaltyToken");

contract("TokenDecay", (accounts) => {
    let tokenDecayInstance;
    let loyaltyTokenInstance;

    before(async () => {
        tokenDecayInstance = await TokenDecay.deployed();
        loyaltyTokenInstance = await LoyaltyToken.deployed();
    });

    it("should decay tokens", async () => {
        const initialBalance = 1000 * 10 ** 18; // Assuming initial balance is 1000 tokens
        await loyaltyTokenInstance.mint(accounts[0], initialBalance);

        const userBalanceBeforeDecay = await loyaltyTokenInstance.balanceOf(accounts[0]);
        await tokenDecayInstance.decayTokens({ from: accounts[0] });
        const userBalanceAfterDecay = await loyaltyTokenInstance.balanceOf(accounts[0]);

        assert.isAbove(userBalanceBeforeDecay.toNumber(), userBalanceAfterDecay.toNumber(), "Tokens were not decayed");
    });
});
