import { useAuth } from "../../context/auth";
import Jumbotron from "../../components/cards/Jumbotron";
import UserMenu from "../../components/nav/UserMenu";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import ProductCardHorizontal from "../../components/cards/ProductCardHorizontal";
import ContractInfo from "./MergedLoyaltyContract.json";
const Web3 = require("web3");
// 0xA8FDbe1fd3BC60ad70F4db1799Db3E8817D04726
export default function UserOrders() {
    // context
    const [auth, setAuth] = useAuth();

    // state
    const [orders, setOrders] = useState([]);
    const[balance, setBalance] = useState(null);
    const[addess, setAddress] = useState(null);

    useEffect(() => {
        if (auth?.token) getOrders();   
    }, [auth?.token])

    const getOrders = async () => {
        try{
            const { data } = await axios.get("/orders");
            setOrders(data);
        }
        catch(err){
            console.log(err);
        }
    }
    const contractAdd = '0xA8FDbe1fd3BC60ad70F4db1799Db3E8817D04726';
    // if (typeof web3 !== "undefined") {
    //     var web3 = new Web3(web3.currentProvider);
    // } else {
    //     var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
    // }
    var web3 = new Web3(window.ethereum);
    const seller_1 = '0x6dA8508283DD76a3302cd17B1893271d146819ae';
    async function getBalance() {
        const accounts = await web3.eth.getAccounts();
        // console.log(accounts);

        const MainObject = new web3.eth.Contract(
        ContractInfo.abi,
        // CONTACT_ADDRESS.CONTACT_ADDRESS
        contractAdd

        );
        var amt = await MainObject.methods.checkBalance().call({ from: accounts[0] });
        // await MainObject.methods.addSeller(seller_1).call({ from: accounts[0] });
        setBalance(amt);
    }
    
    getBalance();
    return (
        <>
            <Jumbotron title={`Hello ${auth?.user?.name}`} subTitle="Dashboard" />
            
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu /> 
                    </div>
                    <div className="col-md-9">
                        <div className="p-3 mt-2 mb-2 bg-light">
                            Orders
                        </div>
                        <div className="p-3 mt-2 mb-2 bg-light">
                    Balance: {balance} {/* Display the balance value */}
                    </div>
                        {orders?.map((o, i) => {
                            return (
                                <div key={o._id} className="border shodow bg-light rounded-4 mb-5">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Buyer</th>
                                                <th scope="col">Ordered</th>
                                                <th scope="col">Payment</th>
                                                <th scope="col">Quantity</th>
                                            </tr>
                                        </thead>
                                        <tbody> 
                                            <tr>
                                                <td>{i+1}</td>
                                                <td>{o?.status}</td>
                                                <td>{o?.buyer?.name}</td>
                                                <td>{moment(o?.createdAt).fromNow()}</td>
                                                <td>{o?.payment?.success ? "Success" : "Failed"}</td>
                                                <td>{o?.products?.length} products</td>
                                            </tr>
                                        </tbody>    
                                    </table>

                                    <div className="container">
                                        <div className="row m-2">
                                            {o?.products?.map((p, i) => (
                                                <ProductCardHorizontal key={i} p={p} remove={false}/> 
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}