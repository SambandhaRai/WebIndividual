import { User } from "../../model/index.js";
import bcrypt from "bcryptjs";
import { body, validationResult } from "express-validator";
/**
 * Fetch all users
 */
const getAll = async (req, res) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ["password"] } });
    res.status(200).json({ data: users, message: "Successfully fetched users" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

/**
 * Create a new user
 */

const create = async (req, res) => {
  // Validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, email, gender, contact, password } = req.body;
    console.log("Received data:", req.body);  // Add this log to inspect the data coming in
  
    // Check if email is already in use
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }
  
    const existingContact = await User.findOne({ where: { contact } });
    if (existingContact) {
      return res.status(400).json({ message: "Contact already in use" });
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      gender: req.body.gender,
      contact: req.body.contact,
      password: hashedPassword,
    });
  
    res.status(201).send({ data: user, message: "Successfully created user" });
  } catch (e) {
    console.log("Error creating user:", e);  // Add more specific error logging
    res.status(500).json({ error: "Failed to create user", details: e.message });
  }  
};

/**
 * Update user details
 */
const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, gender, contact, password } = req.body;

    const user = await User.findOne({ where: { id } });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (gender) user.gender = gender;
    if (contact) user.contact = contact;
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();
    res.status(200).send({ data: user, message: "User updated successfully" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Failed to update user" });
  }
};


/**
 * Delete user
 */
const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ where: { id } });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    await user.destroy();
    res.status(200).send({ message: "User deleted successfully" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Failed to delete user" });
  }
};


/**
 * Fetch user by ID
 */
const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, { attributes: { exclude: ["password"] } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ data: user, message: "User fetched successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

export const userController = { getAll, create, getById, deleteById, update };