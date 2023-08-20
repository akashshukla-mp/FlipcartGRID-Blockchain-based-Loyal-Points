import User from "../models/user.js";
import { hashPassword, comparePassword } from "../helpers/auth.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Order from "../models/order.js";


dotenv.config(); 


export const register = async (req, res)=>{

    try{
        // 1. Destructre name, email, password from the req.body
        const {name, email, seller, password} = req.body;

        // 2. All fields require validation
        if (!name){
            return res.json({error: "Name is required"});
        }
        if (!email){
            return res.json({error: "Email is required"});
        }
        if (!password || password.length < 6){
            return res.json({error: "Password is required and should be at least 6 characters long"});
        }

        // 3. Check if user already exists in the database with the same email
        const existingUser = await User.findOne({ email });
        if (existingUser){
            return res.json({error: "Email is taken"});
        }

        // 4. Hash the password
        const hashedPassword = await hashPassword(password);
        
        const newUserData = {
            name,
            email,
            password: hashedPassword,
        };
        if(req.body.seller == "yes") newUserData.role = 1;
        // 5. Register the user
        const user = await new User(newUserData).save();

        // 6. Create a signed token
       c
        const token = jwt.sign({ _id: user._id }, JWT, { expiresIn: "7d" });

        // 7. Send the response
        res.json({
            user: {
                name: user.name,
                email: user.email, 
                role: user.role,
                address: user.address, 
            },
            token,
        });
    }
    catch(err){
        console.log(err);
    }
}

export const login = async (req, res)=>{
    // console.log(req.body);

    try{
        // 1. Destructre email, password from the req.body
        const { email, password } = req.body;
        
        // 2. All fields require validation
        if (!email){
            return res.json({error: "Email is required"});
        }
        if (!password || password.length < 6){
            return res.json({error: "Password is required and should be at least 6 characters long"});
        }

        // 3. Check if user is present in your database or not
        const user = await User.findOne({ email });
        if (!user){
            return res.json({error: "User not found"});
        }

        // 4. Compare the password
        const match = await comparePassword(password, user.password);
        if (!match){
            return res.json({error: "Invalid Password"});
        }

        // 5. Create a signed token
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        // 6. Send the response
        res.json({
            user: {
                name: user.name,
                email: user.email, 
                role: user.role,
                address: user.address, 
            },
            token,
        });
    }
    catch(err){
        console.log(err);
    }
}

export const secret = async (req, res)=>{
    res.json({
        currentUser : req.user,
    });
}

export const updateProfile = async (req, res) => {
    try{
        const { name, password, address } = req.body;
        const user = await User.findById(req.user._id);
        // check password length
        if (password && password.length < 6){
            return res.json({error: "Password should be at least 6 characters long"});
        } 
        // hash the password
        const hashedPassword = password ? await hashPassword(password) : undefined;
        const updated = await User.findByIdAndUpdate(req.user._id, {
            name: name || user.name,
            password: hashedPassword || user.password,
            address: address || user.address,
        }, {new: true});

        updated.password = undefined;
        res.json(updated);
    }
    catch(err){
        console.log(err);
    }
}

export const getOrders = async (req, res) => {
    try{
        const orders = await Order.find({buyer: req.user._id}).populate("products", "-photo")
        .populate("buyer", "name");
        res.json(orders);
    }
    catch(err){
        console.log(err);
    }
}

export const allOrders = async (req, res) => {
    try{
        const orders = await Order.find({}).populate("products", "-photo").populate("buyer", "name"); 
        res.json(orders);
    }  
    catch(err){
        console.log(err);
    }
}