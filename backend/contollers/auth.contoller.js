import bcrypt from "bcryptjs";
import User from "../models/auth.models.js";
import generateJWTtoken from "../utils/generateToken.js";
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    const passwordMathc = await bcrypt.compare(password, user.password);
    if (!passwordMathc) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    generateJWTtoken(user.id, res);
    res.status(200).json({ message: "Login Success" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
    console.error("Unable to connect to the database:", err);
  }
};

export { login };
