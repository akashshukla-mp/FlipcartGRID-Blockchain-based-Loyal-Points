import { useEffect, useState } from "react";
import {useAuth} from "../../context/auth";
import {useCart} from "../../context/cart";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DropIn from "braintree-web-drop-in-react";
import { toast } from "react-hot-toast";

export default function UserCartSidebar(){
    // context
    const [auth, setAuth] = useAuth();
    const [cart, setCart] = useCart();

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
        return total.toLocaleString("en-IN", {
            style: "currency",
            currency: "INR",
        });
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
    
    return (
        <div className="col-md-4 mb-5">
            <h4>Your cart summary</h4>
            Total/Address/Payment
            <hr/>
            <h6>Total: {cartTotal()}</h6>    
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