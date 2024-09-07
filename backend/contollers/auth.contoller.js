import bcrypt from "bcryptjs";
import User from "../models/auth.models.js";
import generateJWTtoken from "../utils/generateToken.js";
const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    const passwordMathc = await bcrypt.compare(password, user.password);
    if (!passwordMathc) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    generateJWTtoken(user.id,user.role, res);
    res.status(200).json({ message: "Login Success" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
    console.error("In login unable to connect to the database:", err);
  }
};
const register=async(req,res)=>{
    const {username,email,password}=req.body;
    try{
        const user = await User.findOne({ where: { email } });
        if(user){
            return res.status(400).json({message:'User already exists'});
        }
        const salt=await bcrypt.genSalt(10);
        const hashPassword=await bcrypt.hash(password,salt);
        const newuser=await User.create({username,email,password:hashPassword});
        generateJWTtoken(newuser.id,newuser.role,res);
        res.status(201).json({message:'User created successfully',newuser});
    }
    catch(err){
        res.status(500).json({message:'Internal Server Error'});
        console.error('In register unable to connect to the database:',err);
    }
}


export { login,register };
