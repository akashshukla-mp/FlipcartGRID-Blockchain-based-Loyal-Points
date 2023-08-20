import { useState } from "react";
import Jumbotron from "../../components/cards/Jumbotron";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import "./register.css";

export default function Register() {
  // state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [seller, setSeller] = useState("no");

  // hooks
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`/register`, {
        name,
        email,
        seller,
        password,
      });
      if (data?.error) {
        toast.error(data.error);
      } else {
        // save user and token to localstorage
        localStorage.setItem("auth", JSON.stringify(data));
        setAuth({ ...auth, token: data.token, user: data.user });
        toast.success("Registration successful.");
        navigate("/dashboard");
      }
    } catch (err) {
      console.log(err);
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div>
      <Jumbotron title="Register" />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="form-control mb-4 p-2"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
              />
              <input
                type="email"
                className="form-control mb-4 p-2"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {/* <input 
                                type="text" 
                                className="form-control mb-4 p-2" 
                                placeholder="Are You Seller? (yes/no)"
                                value={seller}
                                onChange={(e) => setSeller(e.target.value)}
                                autoFocus  
                            /> */}
              <div className="seller_ask">
                <p>Are you a seller?</p>
                <label htmlFor="yes">
                  <input
                    type="radio"
                    id="yes"
                    name="seller"
                    value="yes"
                    onChange={(e) => setSeller(e.target.value)}
                    />
                    Yes
                </label>
                <label htmlFor="no">
                  <input
                    type="radio"
                    id="no"
                    name="seller"
                    value="no"
                    onChange={(e) => setSeller(e.target.value)}
                    />
                    No
                </label>
              </div>
              <input
                type="password"
                className="form-control mb-4 p-2"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="btn btn-primary" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
