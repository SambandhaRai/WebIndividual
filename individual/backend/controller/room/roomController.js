import { Room } from "../../model/index.js";
import multer from "multer";
import path from "path";

/**
 * Fetch all rooms
 */
const getAll = async (req, res) => {
  try {
    const rooms = await Room.findAll();
    res.status(200).json({ data: rooms, message: "Successfully fetched rooms" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch rooms" });
  }
};

/**
 * Create a new room
 */
const create = async (req, res) => {
  try {
    const { name, details, features } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    if (!name || !details) {
      return res.status(400).json({ message: "Room name and details are required" });
    }

    // Parse the features from the incoming request (features will be an array of selected features)
    const featuresArray = JSON.parse(features);

    // Map the selected features to true, and unselected ones will remain false
    const allFeatures = {
      doubleBed: featuresArray.includes("doubleBed"),
      twinBed: featuresArray.includes("twinBed"),
      bathroom: featuresArray.includes("bathroom"),
    };

    const room = await Room.create({ name, details, features: allFeatures, imageUrl });
    res.status(201).json({ data: room, message: "Room created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create room" });
  }
};


/**
 * Fetch a room by ID
 */
const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const room = await Room.findByPk(id);

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    res.status(200).json({ data: room, message: "Room fetched successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch room" });
  }
};

/**
 * Update a room
 */
const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, details, features } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const room = await Room.findByPk(id);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    if (name) room.name = name;
    if (details) room.details = details;
    if (features) {
      const featuresArray = JSON.parse(features);

      // Map the selected features to true, and unselected ones will remain false
      const allFeatures = {
        doubleBed: featuresArray.includes("doubleBed"),
        twinBed: featuresArray.includes("twinBed"),
        bathroom: featuresArray.includes("bathroom"),
      };

      room.features = allFeatures;
    }
    if (imageUrl) room.imageUrl = imageUrl;

    await room.save();
    res.status(200).json({ data: room, message: "Room updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update room" });
  }
};

/**
 * Delete a room
 */
const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const room = await Room.findByPk(id);

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    await room.destroy();
    res.status(200).json({ message: "Room deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete room" });
  }
};

export const roomController = { getAll, create, getById, update, deleteById };
