import { Room, Booking } from "../../model/associations.js";
import { Op } from "sequelize"; 
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

export const create = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    let { roomType, name, details, bedType, bathroom, area, adultOccupants, childOccupants, price } = req.body;

    if (!name || !details || !bedType || !bathroom || !adultOccupants || !childOccupants || !roomType || !price) {
      return res.status(400).json({ error: "All fields are required except area (only for Suite)" });
    }

    if (roomType === "Suite" && !area) {
      return res.status(400).json({ error: "Area is required for Suite rooms" });
    }

    if (isNaN(price) || price <= 0) {
      return res.status(400).json({ error: "Price must be a positive number" });
    }

    let imageUrl = null;
    let publicId = null;

    if (req.file) {
      try {
        const result = await cloudinary.uploader.upload(req.file.path, { folder: "room_images" });
        imageUrl = result.secure_url;
        publicId = result.public_id;
      } catch (uploadError) {
        console.error("Cloudinary upload error:", uploadError);
        return res.status(500).json({ error: "Failed to upload image" });
      }
    }

    const room = await Room.create(
      { 
        roomType,
        name, 
        details, 
        bedType, 
        bathroom, 
        area: roomType === "Suite" ? area : null, 
        adultOccupants: String(adultOccupants),
        childOccupants: String(childOccupants),
        price: parseFloat(price), 
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
    if (error.stack) {
      console.error("Stack trace:", error.stack);
    }
    if(error.errors){
        console.error("sequelize errors", error.errors);
    }

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
    const { roomType, name, details, bedType, bathroom, area, adultOccupants, childOccupants, price } = req.body;
    const room = await Room.findByPk(req.params.id);
    if (!room) return res.status(404).json({ error: "Room not found" });

    if (roomType === "Suite" && !area) {
      return res.status(400).json({ error: "Area is required for Suite rooms" });
    }

    if (isNaN(price) || price <= 0) {
      return res.status(400).json({ error: "Price must be a positive number" });
    }

    let imageUrl = room.imageUrl;
    let publicId = room.publicId;

    if (req.file) {
      try {
        if (publicId) await cloudinary.uploader.destroy(publicId);

        const result = await cloudinary.uploader.upload(req.file.path, { folder: "room_images" });
        imageUrl = result.secure_url;
        publicId = result.public_id;
      } catch (uploadError) {
        console.error("Cloudinary upload error:", uploadError);
        return res.status(500).json({ error: "Failed to upload image" });
      }
    }

    await room.update(
      { 
        roomType,
        name, 
        details, 
        bedType, 
        bathroom, 
        area: roomType === "Suite" ? area : null,
        adultOccupants: String(adultOccupants),
        childOccupants: String(childOccupants), 
        price: parseFloat(price),
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

// Fetch available rooms based on search criteria
export const getAvailableRooms = async (req, res) => {
  const { roomId, checkInDate, checkOutDate, roomQuantity } = req.body;

  try {
    // Validate inputs
    if (!roomId || !checkInDate || !checkOutDate || !roomQuantity) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Convert dates to JavaScript Date objects
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    // Fetch all bookings that overlap with the selected dates
    const overlappingBookings = await Booking.findAll({
      where: {
        roomId,
        [Op.or]: [
          {
            checkInDate: { [Op.between]: [checkIn, checkOut] },
          },
          {
            checkOutDate: { [Op.between]: [checkIn, checkOut] },
          },
          {
            [Op.and]: [
              { checkInDate: { [Op.lte]: checkIn } },
              { checkOutDate: { [Op.gte]: checkOut } },
            ],
          },
        ],
      },
    });

    // Fetch the selected room
    const room = await Room.findByPk(roomId);

    // Calculate available rooms
    const totalRooms = roomQuantity; // Total rooms requested
    const bookedRooms = overlappingBookings.reduce((sum, booking) => sum + booking.roomQuantity, 0);
    const availableRooms = totalRooms - bookedRooms;

    if (availableRooms > 0) {
      res.status(200).json({ data: [room], message: "Rooms are available" });
    } else {
      res.status(200).json({ data: [], message: "No rooms available for the selected dates" });
    }
  } catch (error) {
    console.error("Error fetching available rooms:", error);
    res.status(500).json({ error: "Failed to fetch available rooms" });
  }
};

export const roomController = { getAll, create, getById, update, deleteById, getAvailableRooms };
