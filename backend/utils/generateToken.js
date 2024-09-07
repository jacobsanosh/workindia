import jwt from 'jsonwebtoken'

const generateJWTtoken = (id,role,res) => {
    const token=jwt.sign({id,role},process.env.JWT_SECRET_KEY,{expiresIn:'7d'});
    res.cookie('jwt',token,{
        maxAge:7*24*60*60*1000,
        httpOnly:true,
        sameSite:"strict",
        secure:process.env.NODE_ENV!== 'development'
    });
}
export default generateJWTtoken;
