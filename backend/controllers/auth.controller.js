import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import generateTokenAndSetCookie from '../utils/generateToken.js';


export const signupUser = async (req, res) => { 
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords don't match" });
        }

        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ error: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
        });
     if(newUser){
        generateTokenAndSetCookie(newUser._id,res);
        await newUser.save(); 

        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName, 
            username: newUser.username,
            profilePic: newUser.profilePic,
        });
    } else{
        res.status(400).json({ error: "Failed to create user" });
    }
    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const logoutUser = async (req, res) => {
    try{
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:"loggout out successfully"});

    }catch (error) {
        res.status(500).json({ error: "Internal server error" });
    };
 };
export const loginUser =  (req, res) => { 
     
    try{
        const {username,password} = req.body;
        const user= await User.findOne({username});
        const isPasswordCorrect = await bcrypt.compare(password,user?.password || "");
        if(!user || !isPasswordCorrect){
            return res.status(400).json({error: "Invalid username/password"});
        }
        generateTokenAndSetCookie(user._id,res);
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic,
        })
    }catch(error){
        console.log("Error in login controller", error.message);
        return res.status(400).json({ error: "Invalid credentials" });
    }
   

 };
