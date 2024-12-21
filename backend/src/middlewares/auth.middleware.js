import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute=async (req,res,next)=>{
    try {
        const token=req.cookies.token;

        if(!token){
            return res.status(401).json({message:"Unauthorized user"});
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY)

        if(!decoded){
            return res.status(401).json({message:"Unauthorized user"});
        }
        const user=await User.findById(decoded.userId).select("-password");


        if(!user){
            return res.status(401).json({message:"Unauthorized user"});
        }

        req.user=user;

        next();

    } catch (error) {
        console.log("Error in protectRoute middleware",error.message);
        res.status(500).json({ message: "Internal Server Error" })
        
    }
}