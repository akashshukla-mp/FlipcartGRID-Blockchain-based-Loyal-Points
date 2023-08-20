import { useCart } from "../context/cart"
import Jumbotron from "../components/cards/Jumbotron";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/auth";
import UserCartSidebar from "../components/cards/UserCartSidebar";
import ProductCardHorizontal from "../components/cards/ProductCardHorizontal";
import ContractInfo from "./user/MergedLoyaltyContract.json"
const Web3 = require("web3");

export default function Cart() {
    // context
    const [cart, setCart] = useCart();
    const [auth, setAuth] = useAuth(); 
    const[balance, setBalance] = useState(null);
    const[addess, setAddress] = useState(null);

    // hooks
    const navigate = useNavigate();

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
            <Jumbotron 
                title={`Hello ${auth?.token && auth?.user?.name}`} 
                subTitle={cart?.length > 0 
                    ? `You have ${cart.length} items in the cart. ${auth?.token ? "" : "Please login to checkout"}` 
                    : "Your cart is empty"} 
            />

            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="p-3 mt-2 mb-2 h4 bg-light text-center">
                            { cart?.length>0 ? "My Cart " :
                                <div className="text-center">
                                    <button className="btn btn-primary" onClick={() => navigate("/")}>
                                        Continue Shopping...
                                    </button>
                                </div>
                            }
                        </div>
                    </div>
                </div> 
            </div>

            { cart?.length > 0 && (
                <div className="container">
                    <div className="row">
                        <div className="col-md-8">
                            <div className="row">
                                {
                                    cart?.map((p, index) => (
                                        <ProductCardHorizontal key={index} p={p} />
                                    ))
                                }
                            </div>
                            <div>
                          
                            </div>

                        </div>
                        <UserCartSidebar />
                    </div>
                </div>
            )}
        </>
    )
}