import { useEffect, useState } from "react";
import {useAuth} from "../../context/auth";
import {useCart} from "../../context/cart";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DropIn from "braintree-web-drop-in-react";
import { toast } from "react-hot-toast";
import ContractInfo from "../../MergedLoyaltyContract.json"
const Web3 = require("web3");

export default function UserCartSidebar(){
    // context
    const [auth, setAuth] = useAuth();
    const [cart, setCart] = useCart();
    const[balance, setBalance] = useState(0);
    const[cartAmt, setCartAmt] = useState(null);

    // state
    const [clientToken, setClientToken] = useState("");
    const [instance, setInstance] = useState("");
    const [loading, setLoading] = useState(false);


    // hooks
    const navigate = useNavigate();


    useEffect(() => {
        if (auth?.token){
            getClientToken();
        }
    }, [auth?.token])

    const getClientToken = async () =>{
        try{
            const { data } = await axios.get("/braintree/token");
            setClientToken(data.clientToken);
        }
        catch(err){
            console.log(err);
        }
    }

    const cartTotal = () =>{
        let total = 0;
        cart.map(item => {
            total = total + item.price;
        });
        total -= balance;
        setCartAmt(total.toLocaleString("en-IN", {
            style: "currency",
            currency: "INR",
        }));
    }

    const handlePay = async () => {
        try{
            setLoading(true);
            const { nonce } = await instance.requestPaymentMethod();
            // console.log("nonce => ", nonce);
            const { data } = await axios.post("/braintree/payment",{
                nonce, 
                cart,
            })
            // console.log("Handle buy response", data);
            setLoading(false);  
            localStorage.removeItem("cart");
            setCart([]);
            navigate("/dashboard/user/orders");
            toast.success("Payment Successful");
        }
        catch(err){
            console.log(err);
            setLoading(false);
        }
    }


    const contractAdd = '0xE1BeeF51e0d3Af6aFDfaD12ea96af12Bd714DdD6';
    // if (typeof web3 !== "undefined") {
    //     var web3 = new Web3(web3.currentProvider);
    // } else {
    //     var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
    // }
    
    useState(() => {
        cartTotal();
        const contractAdd = '0xE1BeeF51e0d3Af6aFDfaD12ea96af12Bd714DdD6';
        var web3 = new Web3(window.ethereum);
        const seller_1 = '0x37A38aF9874151d44B6105ca2418fb80d793d1a7';
        const owner = '0x99364808c4B5598ac319029652A78Ae1279946b4';
        async function getBalance() {
            const accounts = await web3.eth.getAccounts();
            console.log(accounts);
    
            const MainObject = new web3.eth.Contract(
            ContractInfo.abi,
            // CONTACT_ADDRESS.CONTACT_ADDRESS
            contractAdd
    
            );
            // await MainObject.methods.setSellerBalance(seller_1, 4400).send({ from: owner });
            var amt = await MainObject.methods.checkBalance().call({ from: seller_1 });
            console.log(amt)
            // await MainObject.methods.addSeller(seller_1).call({ from: accounts[0] });
            setBalance(amt);
        }

        getBalance();

    }, [])
    async function redeem() {
        const contractAdd = '0xE1BeeF51e0d3Af6aFDfaD12ea96af12Bd714DdD6';
        var web3 = new Web3(window.ethereum);
        const seller_1 = '0x37A38aF9874151d44B6105ca2418fb80d793d1a7';
        const accounts = await web3.eth.getAccounts();
        // console.log(accounts);

        const MainObject = new web3.eth.Contract(
        ContractInfo.abi,
        // CONTACT_ADDRESS.CONTACT_ADDRESS
        contractAdd

        );
        // // await MainObject.methods.setSellerBalance(seller_1, 500).send({ from: owner });
        // var amt = await MainObject.methods.checkBalance().call({ from: seller_1 });
        // console.log(amt)
        // await MainObject.methods.addSeller(seller_1).call({ from: accounts[0] });
        await MainObject.methods.redeemTokens(balance).send({from: seller_1});  
        cartTotal();
        setBalance(0);
    }
    return (
        <div className="col-md-4 mb-5">
            <h4>Your cart summary</h4>
            <h4>Token wallet: {balance}</h4>
            Total/Address/Payment
            <hr/>
            <h6>Total: {cartAmt}</h6>  
            <button className="btn btn-outline-primary" onClick={redeem}>
                Redeem Loyalty Coins
            </button>

            {
                auth?.user?.address ? (
                    <>
                        <div className="mb-3 ">
                            <hr />
                            <h4>Delivery address: </h4>
                            <h5>{auth?.user?.address}</h5>
                        </div>
                        <button className="btn btn-outline-warning" onClick={()=>navigate("/dashboard/user/profile")}> Update Address </button>
                    </>
                ) : (
                    <div className="mb-3">
                        {auth?.token ? (
                            <button className="btn btn-outline-warning" onClick={()=>navigate("/dashboard/user/profile")}>
                                Add Delivery Address
                            </button>
                        ) : (
                            <button
                                className="btn btn-outline-danger mt-3"
                                onClick={() => navigate("/login", 
                                    {state:"/cart",}
                                )}
                            >Login to checkout</button>
                        )}
                    </div>
                )
            }

            <div className="mt-3"> 
                {
                    !clientToken || !cart?.length ? 
                    "" :
                    <>
                        <DropIn 
                        options={{
                            authorization: clientToken,
                            // paypal: {
                            //     flow: "vault",
                            // },
                        }} 
                        onInstance={(instance) => setInstance(instance)}
                        />

                        <button 
                            onClick={handlePay} 
                            className="btn btn-primary col-12 mt-2"
                            disabled = {!auth?.user?.address || !instance || loading}    
                        >
                            {loading ? "Processing..." : "Pay"}
                        </button>

                    </>
                }
            </div>
        </div>
    )
}