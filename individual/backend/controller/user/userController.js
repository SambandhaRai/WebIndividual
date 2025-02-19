import { User } from "../../model/index.js";

/**
 * Fetch all users
 */
const getAll = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).send({ data: users, message: "Successfully fetched data" });
  } catch (e) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

/**
 * Create a new user
 */
const create = async (req, res) => {
  try {
    const body = req.body;

    // Check if all required fields are provided
    if (!body?.name || !body?.email || !body?.gender || !body?.contact || !body?.password) {
      return res.status(400).send({ message: "Invalid payload" });
    }

    // Create user in the database
    const user = await User.create({
      name: body.name,
      email: body.email,
      gender: body.gender,
      contact: body.contact,
      password: body.password,
    });

    res.status(201).send({ data: user, message: "Successfully created user" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Failed to create user" });
  }
};

/**
 * Update existing user
 */
const update = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;

    // Check if user exists
    const oldUser = await User.findOne({ where: { id } });
    if (!oldUser) {
      return res.status(404).send({ message: "User not found" });
    }

    // Update fields
    oldUser.name = body.name || oldUser.name;
    oldUser.email = body.email || oldUser.email;
    oldUser.gender = body.gender || oldUser.gender;
    oldUser.contact = body.contact || oldUser.contact;
    oldUser.password = body.password || oldUser.password;

    await oldUser.save();

    res.status(200).send({ data: oldUser, message: "User updated successfully" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Failed to update user" });
  }
};

/**
 * Delete user by ID
 */
const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const oldUser = await User.findOne({ where: { id } });

    if (!oldUser) {
      return res.status(404).send({ message: "User not found" });
    }

    await oldUser.destroy();
    res.status(200).send({ message: "User deleted successfully" });
  } catch (e) {
    res.status(500).json({ error: "Failed to delete user" });
  }
};

/**
 * Fetch user by ID
 */
const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ where: { id } });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).send({ message: "User fetched successfully", data: user });
  } catch (e) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

export const userController = {
  getAll,
  create,
  getById,
  deleteById,
  update,
};
