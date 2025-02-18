import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

console.log("JWT_SECRET:", process.env.JWT_SECRET);

const generateToken = (payload) => {
  const options = {
    expiresIn: process.env.JWT_EXPIRATION || '1h', // Default expiration
  };
  return jwt.sign(payload, process.env.JWT_SECRET, options);
};
  
  export {
    generateToken,
  }