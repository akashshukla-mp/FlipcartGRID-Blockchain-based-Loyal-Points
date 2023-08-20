import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LoadingGIF from "../../images/Loading.gif";

export default function Loading( {path = "login"} ) {
    // state 
    const [count, setCount] = useState(3);
    // hooks
    const navigate = useNavigate();
    const location = useLocation();
    // console.log(location);

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((currenCount) => --currenCount);
        }, 1000);

        // redirect when count is equal to 0
        count==0  && navigate(`/${path}`, {
            state: location.pathname, // save the current path in state so that we can redirect to that path after login
        });
        
        // clear interval
        return () => clearInterval(interval);
    }, [count]);

    return <div className="d-flex justify-content-center align-items-center" style={{height: "90vh"}} >
        <img src={LoadingGIF} alt="Loading" style={{width: "450px"}}/>    
    </div>
}