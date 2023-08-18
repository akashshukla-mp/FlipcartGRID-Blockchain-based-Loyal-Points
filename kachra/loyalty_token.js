const LoyaltyToken = artifacts.require("LoyaltyToken");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("LoyaltyToken", function (/* accounts */) {
  it("should assert true", async function () {
    await LoyaltyToken.deployed();
    return assert.isTrue(true);
  });
});



// contract('SimpleContract', ()=>{
//   it('Should update data', async () =>{
//       const storage = await SimpleContract.new();
//       await storage.updateData(10);
//       const data = await storage.readData();
//       assert(data.toString() === '10');
//   })
// });
