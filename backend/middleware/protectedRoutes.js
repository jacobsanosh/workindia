import jwt from 'jsonwebtoken';
const adminAuthMiddleware = (req, res, next) => {
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
        return res.status(401).json({message:"Unauthorized access"})
    }
    const {role}=decoded;
    if (role !== "admin") {
      return res.status(401).json({ message: "Unauthorized access" });
    }
    
    next();
  } catch (err) {
    console.log("error on admin auth middleware", err);
    return res.status(500).json({ message: "Internal server" });
  }
};
export { adminAuthMiddleware };
