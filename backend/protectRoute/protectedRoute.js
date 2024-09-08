import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import User from '../models/user.model.js';

dotenv.config();

export const protectedRoute = async (req,res,next) => {
    try {
        const token = req.cookies["jwt"];
        if (!token) {
            return res.status(401).json({success:false, message: "Unauthorized" });
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(401).json({success:false, message: "Unauthorized" });
        }
        req.user = user;
        next();
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Server Error" });
    }
}

