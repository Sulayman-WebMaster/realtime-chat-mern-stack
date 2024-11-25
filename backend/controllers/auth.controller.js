// auth.controller.js
export const signupUser = async(req, res) => { 
    try{
        const {fullName,username,password,confirmPassword,gender} = req.body;
    }catch(error){
        
    }
   

};
export const logoutUser = (req, res) => { res.send("log out") };
export const loginUser = (req, res) => { res.send("Log in") };
