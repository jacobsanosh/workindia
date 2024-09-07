import jwt from 'jsonwebtoken';
import User from '../models/auth.models.js'
const adminAuthMiddleware = async(req, res, next) => {
  try {
    const token=req.cookies.jwt;
    const apiKey = req.headers['api'];
    console.log("api key",apiKey)
    if(apiKey!==process.env.ADMIN_KEY){
        return res.status(401).json({message:"Unauthorized access for admin"})
    }
    if(!token){
      return res.status(401).json({message:"Unauthorized access"})
    }
    console.log("in protected routes",token)
    const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);
    if(!decoded){
        return res.status(401).json({message:"Unauthorized access -invalid token"})
    }
    const {id,role}=decoded;
    const user = await User.findByPk(id);
    // console.log("user",user)
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (role !== "admin") {
      return res.status(401).json({ message: "Unauthorized access" });
    }
    
    next();
  } catch (err) {
    console.log("error on admin auth middleware", err);
    return res.status(500).json({ message: "Internal server" });
  }
};
const usermiddleware=async(req,res,next)=>{
  try{
      const token=req.cookies.jwt;
      if(!token){
          return res.status(401).json({error:"unautherizer -no token is provided"});
      }
      const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);
      if(!decoded){
          return res.status(401).json({error:"unautherized-invalid token"})
      }
      const {id,role}=decoded;
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      if (role !== "user") {
        return res.status(401).json({ message: "Unauthorized access" });
      }
      req.user=user;
      console.log("user test passed");
      next();
  }
  catch(error){
      res.status(401).json({error:"Internal server error"});
      console.log("error in user middleware",error);
  }
  
}

export { adminAuthMiddleware,usermiddleware };
