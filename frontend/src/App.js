import logo from './logo.svg';
import './App.css';
const Web3 = require("web3");
const CONTACT_ABI = require("./config");
const CONTACT_ADDRESS = require("./config");
// const contract = require("@truffle/contract");


function App() {
  if (typeof web3 !== "undefined") {
    var web3 = new Web3(web3.currentProvider);
  } else {
    var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
  }
  async function test() {
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
    const flipCard = new web3.eth.Contract(
    CONTACT_ABI.CONTACT_ABI,
    CONTACT_ADDRESS.CONTACT_ADDRESS
  );
}
  test();
  return (
    <div className="App">

    </div>
  );
}

export default App;
