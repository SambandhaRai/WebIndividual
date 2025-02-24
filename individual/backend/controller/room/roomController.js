import { Room } from "../../model/index.js";
import { sequelize } from "../../database/db.js";
import multer from "multer";
import path from "path";
import fs from "fs";

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Store images in the uploads folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage });

// Fetch all rooms
export const getAll = async (req, res) => {
  try {
    const rooms = await Room.findAll();
    res.status(200).json({ data: rooms, message: "Successfully fetched rooms" });
  } catch (error) {
    console.error("Error fetching rooms:", error);
    res.status(500).json({ error: "Failed to fetch rooms" });
  }
};

// Create a new room
export const create = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    let { name, details, features } = req.body;

    console.log("Received features:", features);
    console.log("Type of features:", typeof features);

    if (!name || !details) {
      return res.status(400).json({ error: "Room name and details are required" });
    }

    // Convert features to an object if it's a string
    if (typeof features === "string") {
      try {
        features = JSON.parse(features);
      } catch (err) {
        return res.status(400).json({ error: "Invalid JSON format for features" });
      }
    }

    let imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const room = await Room.create(
      { name, details, features, imageUrl },
      { transaction }
    );

    await transaction.commit();
    res.status(201).json({ message: "Room created successfully", room });
  } catch (error) {
    await transaction.rollback();
    console.error("Error creating room:", error);
    res.status(500).json({ error: "Failed to create room" });
  }
};


// Fetch a room by ID
export const getById = async (req, res) => {
  try {
    const room = await Room.findByPk(req.params.id);
    if (!room) return res.status(404).json({ error: "Room not found" });

    res.status(200).json({ room, message: "Room fetched successfully" });
  } catch (error) {
    console.error("Error fetching room:", error);
    res.status(500).json({ error: "Failed to fetch room" });
  }
};

// Update a room
export const update = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { name, details, features } = req.body;
    const room = await Room.findByPk(req.params.id);
    if (!room) return res.status(404).json({ error: "Room not found" });

    let imageUrl = room.imageUrl;

    if (req.file) {
      if (room.imageUrl) {
        // Delete the old image from the uploads folder
        const oldImagePath = path.join("uploads", path.basename(room.imageUrl));
        if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
      }

      imageUrl = `/uploads/${req.file.filename}`;
    }

    await room.update(
      { name, details, features, imageUrl },  
      { transaction }
    );    

    await transaction.commit();
    res.status(200).json({ message: "Room updated successfully", room });
  } catch (error) {
    await transaction.rollback();
    console.error("Error updating room:", error);
    res.status(500).json({ error: "Failed to update room" });
  }
};

// Delete a room
export const deleteById = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const room = await Room.findByPk(req.params.id);
    if (!room) return res.status(404).json({ error: "Room not found" });

    if (room.imageUrl) {
      // Delete the image from the uploads folder
      const imagePath = path.join("uploads", path.basename(room.imageUrl));
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    }

    await room.destroy({ transaction });
    await transaction.commit();
    res.status(200).json({ message: "Room deleted successfully" });
  } catch (error) {
    await transaction.rollback();
    console.error("Error deleting room:", error);
    res.status(500).json({ error: "Failed to delete room" });
  }
};

export const roomController = { getAll, create, getById, update, deleteById };
export const uploadMiddleware = upload.single("image"); // Multer middleware for image uploads
