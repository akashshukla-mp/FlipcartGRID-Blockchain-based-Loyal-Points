import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Menu from "./components/nav/Menu";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/user/Dashboard";
import AdminDashboard from "./pages/admin/Dashboard";
import PrivateRoute from "./components/routes/PrivateRoute";
import AdminRoute from "./components/routes/AdminRoute";
import AdminCategory from "./pages/admin/Category";
import AdminProduct from "./pages/admin/Product";
import AdminProducts from "./pages/admin/Products";
import AdminProductUpdate from "./pages/admin/ProductUpdate";
import UserProfile from "./pages/user/Profile";
import UserOrders from "./pages/user/Orders";
import Wallet from "./pages/user/wallet"
import Shop from "./pages/Shop";
import Search from "./pages/Search";
import ProductView from "./pages/ProductView";
import CategoriesList from "./pages/CategoriesList";
import CategoryView from "./pages/CategoryView";
import Cart from "./pages/Cart";
import PageNotFoundGIF from "./images/pgnf.gif";
import AdminOrders from "./pages/admin/Orders";
import { useEffect, useState } from "react";
import ContractInfo from "./MergedLoyaltyContract.json";
import configData from "./configData.json";
const Web3 = require("web3");

const PageNotFound = () => {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{height: "90vh"}}>
      {/* <h3> Error 404!! Page Not Found </h3> */}
      <img src={PageNotFoundGIF} alt="PageNotFound" style={{height: "100%", width:"80%"}}/>
    </div>
  )
}
export default function App(){
    const contractAdd = configData.contractAddress

  useEffect( () => { 
    if (typeof web3 !== "undefined") {
      var web3 = new Web3(web3.currentProvider);
    } else {
      var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
    }
    async function test() {
      const accounts = await web3.eth.getAccounts();
      // console.log(accounts);
  
      const MainObject = new web3.eth.Contract(
        ContractInfo.abi,
        contractAdd
      );
      // const isSeller = await MainObject.methods.isSeller(accounts[1]).call();
      const isSeller = await MainObject.methods.isSeller(accounts[1]).call();
      if(!isSeller) {
        await MainObject.methods.addSeller(accounts[1]).send({ from: accounts[0] });
        await MainObject.methods.setSellerBalance(accounts[1], 10000).send({ from: accounts[0] });
        await MainObject.methods.grantTokensToUser(accounts[2], 4400).send({from:accounts[1]});
      }
      const balance = await MainObject.methods.userBalances(accounts[2]).call();
      console.log(balance);
    }
    test();
  }, []);



  return (
    <BrowserRouter>
      <Menu />
      <Toaster position="top-right"/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/categories" element={<CategoriesList />} />
        <Route path="/category/:slug" element={<CategoryView />} />
        <Route path="/cart" element={<Cart contractAdd = {contractAdd}/>} />
        <Route path="/search" element={<Search />} /> 
        <Route path="/product/:slug" element={<ProductView />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/profile" element={<UserProfile />} />
          <Route path="user/orders" element={<UserOrders />} />
          <Route path="user/wallet" element={<Wallet contractAdd = {contractAdd} />} />
        </Route>

        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/category" element={<AdminCategory />} />
          <Route path="admin/product" element={<AdminProduct />} />
          <Route path="admin/products" element={<AdminProducts />} />
          <Route path="admin/product/update/:slug" element={<AdminProductUpdate />} />
          <Route path="admin/orders" element={<AdminOrders />} />
        </Route>

        <Route path="*" element={<PageNotFound />} />
       </Routes>
    </BrowserRouter>
  )
} 