import React, { useState, useEffect } from "react";

const LoyaltyApp = ({ web3, contract }) => {
  const [account, setAccount] = useState("");
  const [newSeller, setNewSeller] = useState("");
  const [sellerBalance, setSellerBalance] = useState(0);
  const [userAddress, setUserAddress] = useState("");
  const [tokensToGrant, setTokensToGrant] = useState(0);

  const handleAddSeller = async () => {
    try {
      await contract.methods.addSeller(newSeller).send({ from: account });
      console.log("Seller added successfully!");
    } catch (error) {
      console.error("Error adding seller:", error);
    }
  };

  const handleRemoveSeller = async () => {
    try {
      await contract.methods.removeSeller(newSeller).send({ from: account });
      console.log("Seller removed successfully!");
    } catch (error) {
      console.error("Error removing seller:", error);
    }
  };

  const handleSetSellerBalance = async () => {
    try {
      await contract.methods.setSellerBalance(newSeller, sellerBalance).send({ from: account });
      console.log("Seller balance set successfully!");
    } catch (error) {
      console.error("Error setting seller balance:", error);
    }
  };

  const handleGrantTokensToUser = async () => {
    try {
      await contract.methods.grantTokensToUser(userAddress, tokensToGrant).send({ from: account });
      console.log("Tokens granted successfully!");
    } catch (error) {
      console.error("Error granting tokens:", error);
    }
  };

  useEffect(() => {
    async function loadAccount() {
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
    }
    loadAccount();
  }, []);

  return (
    <div>
      <h1>Loyalty App</h1>
      <p>Account: {account}</p>

      {/* Add Seller */}
      <input
        type="text"
        placeholder="Seller address"
        value={newSeller}
        onChange={(e) => setNewSeller(e.target.value)}
      />
      <button onClick={handleAddSeller}>Add Seller</button>

      {/* Remove Seller */}
      <input
        type="text"
        placeholder="Seller address"
        value={newSeller}
        onChange={(e) => setNewSeller(e.target.value)}
      />
      <button onClick={handleRemoveSeller}>Remove Seller</button>

      {/* Set Seller Balance */}
      <input
        type="text"
        placeholder="Seller address"
        value={newSeller}
        onChange={(e) => setNewSeller(e.target.value)}
      />
      <input
        type="number"
        placeholder="Seller balance"
        value={sellerBalance}
        onChange={(e) => setSellerBalance(e.target.value)}
      />
      <button onClick={handleSetSellerBalance}>Set Seller Balance</button>

      {/* Grant Tokens to User */}
      <input
        type="text"
        placeholder="User address"
        value={userAddress}
        onChange={(e) => setUserAddress(e.target.value)}
      />
      <input
        type="number"
        placeholder="Tokens to grant"
        value={tokensToGrant}
        onChange={(e) => setTokensToGrant(e.target.value)}
      />
      <button onClick={handleGrantTokensToUser}>Grant Tokens</button>
    </div>
  );
};

export default LoyaltyApp;
