import jwt from "jsonwebtoken";
import User from "../models/user.js";


export const requireSignin = (req, res, next)=>{
    // console.log("REQ HEADERS => ", req.headers);
    try{
        const decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
        // console.log("Decoded => ", decoded);
        req.user = decoded;
    }
    catch(err){
        return res.status(401).json(err);
    }
    next();
}

export const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);
        if (user.role !== 1){
            return res.status(403).json({error: "Admin resource. Access denied"});
        }
        else {
            next();
        }
    }
    catch(err){
        console.log(err);
    }
}