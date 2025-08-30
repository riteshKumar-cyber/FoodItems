import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator";


// login user
const loginUser = async (req, res) => {
 
  const {email,password} = req.body;
  console.log("Request body:", req.body); 

  try {
   const user = await userModel.findOne ({email});
    console.log("User from DB:", user);

   if(!user){
    return res.json({success:false,message:"User doesn't exist"});
   }



    const isMatch = await bcrypt.compare(password,user.password);

    if(!isMatch){
      return res.json({success:false,message:"Invalid credentials "});
    }

    const token = createToken(user._id);
    res.json({success:true,token});

  }catch(error){
  console.log("Login error:", error);
    res.status(500).json({ success: false, message: "Error", error: error.message });

  }
}


const createToken = (id) =>{
console.log("JWT_SECRET:", process.env.JWT_SECRET); 
return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"10d"});
};

// register user
const registerUser = async (req,res) =>{
    const {name,password,email} = req.body;
    try {
      // checking is user already exists
     const exists = await userModel.findOne({email});

     if(exists){
      return res.json({success:false,message:"User already exists"});
     }

     // validating  email format and strong password
    
    if (!validator.isEmail(email)){
      return res.json({success:false,message:"Please enter a valid email"})
    }

    if(password.length<8){
      return res.json({success:false,message:"Please enter a strong password"})
    }
    
    // hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);

    const newUser = new userModel({
      name,
      email,
      password:hashedPassword
    })

  const user =   await newUser.save();
  
 const token = createToken(newUser._id);
console.log("Generated Token:", token);
 res.json({success:true,token});

  }
   catch (error) {
  console.error("Register error:", error);
  res.status(500).json({ success: false, message: "Error", error: error.message });
}
};



export {loginUser,registerUser}