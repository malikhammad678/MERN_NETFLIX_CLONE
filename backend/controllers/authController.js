import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'
import { generateToken } from "../utils/generateTokenandsetCookie.js";
export const signup = async(req,res) => {
    try {
        const {email,password,username} = req.body;
        if(!email || !password || !username){
            return res.status(400).json({success:false,message: "Please fill in all fields."});
        }

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({success:false, message: "Email already in use."});
        }

        const existUsername = await User.findOne({username});
        if(existUsername){
            return res.status(400).json({success:false,message: "Username already in use."});
        }

        const hashedPassword = await bcryptjs.hash(password,12);

        if(password.length < 6) {
            return res.status(400).json({success:false, message: "Password must be at least 6 characters"})
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        if(!emailRegex.test(email)){
            return res.status(400).json({success:false,message: "Invalid email address."})
        }
        const PROFILE_IMAGES = ["/avatar1.png","/avatar2.png", "/avatar3.png" ];
        const randomProfileImage = PROFILE_IMAGES[Math.floor(Math.random() * PROFILE_IMAGES.length)];



        const newUser = new User({
            email,
            password:hashedPassword,
            username,
            image:randomProfileImage
        })

        await newUser.save();
 
        await generateToken(newUser._id,res);
        

        res.status(201).json({success:true,message: "User created successfully.",user:{
            ...newUser._doc,
            password:undefined
        }})
        
        
    } catch (error) {
        console.log("Error in signing in!",error)
        res.status(500).json({success:false,message: "Internal server error."})
    }
}

export const login = async(req,res) => {
    try {
        const { email, password } = req.body;
    
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Please enter both email and password" });
        }
    
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid email or password" });
        }
    
        const isValidPassword = await bcryptjs.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(400).json({ success: false, message: "Invalid email or password" });
        }
    
        await generateToken(user._id, res);
    
        res.status(201).json({
            success: true,
            message: "Login successfully.",
            user: {
                ...user._doc,
                password: undefined
            }
        });
    } catch (error) {
        console.log("Error during login!", error);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
}

export const logout = async(req,res) => {
    try {
       res.clearCookie("jwt");
       res.status(200).json({success:true,message: "Logged out successfully."})
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false,message: "Internal server error."})
    }
}

export const authCheck  = async (req,res) => {
    try {
		console.log("req.user:", req.user);
		res.status(200).json({ success: true, user: req.user });
	} catch (error) {
		console.log("Error in authCheck controller", error.message);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
}