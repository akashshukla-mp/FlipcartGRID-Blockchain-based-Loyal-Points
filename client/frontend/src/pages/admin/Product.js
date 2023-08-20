import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import Jumbotron from "../../components/cards/Jumbotron";
import { NavLink } from "react-router-dom";
import AdminMenu from "../../components/nav/AdminMenu";
import axios from "axios";
import { Select } from "antd";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

export default function AdminProduct() {
    // context
    const [auth, setAuth] = useAuth();
    //state
    const [categories, setCategories] = useState([]);
    const [photo, setPhoto] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [shipping, setShipping] = useState("");
    const [quantity, setQuantity] = useState("");

    // hooks
    const navigate = useNavigate();

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        try{
            const { data } = await axios.get("/categories");
            setCategories(data);
        }
        catch (err){
            console.log(err);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const productData = new FormData();
            productData.append("photo", photo);
            productData.append("name", name);
            productData.append("description", description);
            productData.append("price", price);
            productData.append("category", category);
            productData.append("shipping", shipping);
            productData.append("quantity", quantity);
        
            const { data } = await axios.post("/product", productData);
            if (data?.error){
                toast.error(data.error);
            }
            else {
                toast.success(`"${data.name}" is created`);
                navigate("/dashboard/admin/products");
            }
        } 
        catch(err){
            console.log(err);   
            toast.error("Create product failed! Try again."); 
        }
    }

    return (
        <>
            <Jumbotron title={`Hello ${auth?.user?.name}`} subTitle="Admin Dashboard" />

            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu /> 
                    </div>
                    <div className="col-md-9">
                        <div className="p-3 mt-2 mb-2 h4 bg-light">
                            Create Product
                        </div>


                        {photo && (
                            <div className="text-center">
                                <img
                                    src={URL.createObjectURL(photo)}
                                    alt="Product Photo"
                                    className="img img-responsive"
                                    height="200px" 
                                />
                            </div>
                        )}

                        <div className="pt-2">
                            <label className="btn btn-outline-secondary col-12 mb-3">
                                {photo ? photo.name : "Upload Photo"}
                                <input
                                    type="file"
                                    name="photo"
                                    accept="image/*"
                                    onChange={(e) => setPhoto(e.target.files[0])} 
                                    hidden
                                />
                            </label>
                        </div>
                        

                        <input 
                            type="text"
                            className="form-control p-2 mb-2"
                            placeholder="Product Name"
                            value={name}
                            onChange = {(e) => setName(e.target.value)}
                        />

                        <textarea 
                            input="text"
                            className="form-control p-2 mb-2"
                            placeholder="Product Description"
                            value={description}
                            onChange = {(e) => setDescription(e.target.value)}
                        />

                        <input 
                            type="number"
                            className="form-control p-2 mb-2"
                            placeholder="Product Price"
                            value={price}
                            onChange = {(e) => setPrice(e.target.value)}
                        />

                        
                        <Select 
                            // showSearch
                            bordered={false}
                            size="large" 
                            className="form-select mb-2"
                            placeholder="Select a category"
                            onChange={(value) => setCategory(value)}
                        >
                            {categories?.map((c) =>  
                                <Option key={c._id} value={c._id}>
                                    {c.name}
                                </Option>
                            )}
                        </Select>

                        <Select 
                            bordered={false}
                            size="large"
                            className="form-select mb-2"
                            placeholder="Select shipping"
                            onChange = {(value) => setShipping(value)}
                        >
                            <Option value="0">No</Option>
                            <Option value="1">Yes</Option>
                        </Select>

                        <input 
                            type="number"
                            min="1"
                            className="form-control p-2 mb-2"
                            placeholder="Product Quantity"
                            value={quantity}
                            onChange = {(e) => setQuantity(e.target.value)}
                        />

                        <button onClick={handleSubmit} className="btn btn-primary mb-5">Submit</button>

                    </div>
                </div>
            </div>
        </>
    )
}