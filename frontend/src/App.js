import logo from './logo.svg';
import './App.css';
import LoyaltyComp from './components/LoyaltyComp';
const Web3 = require("web3");
const CONTACT_ABI = require("./config");
const CONTACT_ADDRESS = require("./config");
// const contract = require("@truffle/contract");


function App() {
  
  return (
    <div className="App">
      <LoyaltyComp/>
    </div>
  );
}

export default App;
