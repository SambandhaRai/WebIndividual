import { Room } from "../../model/index.js";
import { sequelize } from "../../database/db.js";
import cloudinary from "../../uploads/cloudinaryConfig.js";

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
    let { name, details, bedType, bathroom, adultOccupants, childOccupants } = req.body;

    if (!name || !details || !bedType || !bathroom || !adultOccupants || !childOccupants) {
      return res.status(400).json({ error: "Room name, details, bed type, bathroom, and occupant details are required" });
    }

    let imageUrl = null;
    let publicId = null;

    // Upload image to Cloudinary if file is provided
    if (req.file) {
      try {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "room_images",
        });
        imageUrl = result.secure_url;
        publicId = result.public_id;
      } catch (uploadError) {
        console.error("Cloudinary upload error:", uploadError);
        return res.status(500).json({ error: "Failed to upload image" });
      }
    }

    // Save room data with string values for occupants
    const room = await Room.create(
      { 
        name, 
        details, 
        bedType, 
        bathroom, 
        adultOccupants: String(adultOccupants), // Ensure it's a string
        childOccupants: String(childOccupants), // Ensure it's a string
        imageUrl, 
        publicId 
      },
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
    const { name, details, bedType, bathroom, adultOccupants, childOccupants } = req.body;
    const room = await Room.findByPk(req.params.id);
    if (!room) return res.status(404).json({ error: "Room not found" });

    let imageUrl = room.imageUrl;
    let publicId = room.publicId;

    // If a new image is provided, replace the old one in Cloudinary
    if (req.file) {
      try {
        if (publicId) await cloudinary.uploader.destroy(publicId);

        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "room_images",
        });
        imageUrl = result.secure_url;
        publicId = result.public_id;
      } catch (uploadError) {
        console.error("Cloudinary upload error:", uploadError);
        return res.status(500).json({ error: "Failed to upload image" });
      }
    }

    await room.update(
      { 
        name, 
        details, 
        bedType, 
        bathroom, 
        adultOccupants: String(adultOccupants),
        childOccupants: String(childOccupants), 
        imageUrl, 
        publicId 
      },
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

    // Delete image from Cloudinary
    if (room.publicId) {
      try {
        await cloudinary.uploader.destroy(room.publicId);
      } catch (deleteError) {
        console.error("Cloudinary delete error:", deleteError);
      }
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
