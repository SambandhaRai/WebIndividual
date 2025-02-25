import { User } from "../../model/index.js";
import { generateToken } from "../../security/jwt-utils.js";
import bcrypt from "bcryptjs";

/**
 * User Login
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Hardcoded admin credentials
    if (email === "resortadmin@gmail.com" && password === "Admin@123") {
      const token = generateToken({ id: "admin", email: "resortadmin@gmail.com" });
      return res.status(200).json({
        access_token: token, // Make sure this is sent correctly
        user: { id: "admin", name: "Admin", email: "resortadmin@gmail.com" },
        message: "Admin login successful",
    });    
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // Generate JWT Token
    const token = generateToken({ id: user.id, email: user.email });

    console.log("🔑 Token Generated:", token); // Debugging: Check if the token is generated

    return res.status(200).json({
      access_token: token, // Ensure token is sent properly
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      message: "Successfully logged in",
    });
  } catch (error) {
    console.error("❌ Login Error:", error);
    res.status(500).json({ error: "Failed to login" });
  }
};

/**
 * Fetch Current User
 */
const init = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { password, ...userData } = req.user; // Exclude password before sending

    return res.status(200).json({ 
      user: userData, 
      message: "Successfully fetched current user" 
    });
  } catch (error) {
    console.error("Fetch User Error:", error);
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

export const authController = { login, init };