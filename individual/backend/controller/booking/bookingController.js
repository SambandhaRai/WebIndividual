import { Booking } from "../../model/booking/bookingSchema.js";
import { Room } from "../../model/room/roomSchema.js"; 

// Create a new booking
export const createBooking = async (req, res) => {
    const { roomId, checkInDate, checkOutDate, roomQuantity } = req.body;

    try {
        const userId = req.user.id; // Ensure this is set correctly

        // Fetch the room details to calculate the total price
        const room = await Room.findByPk(roomId);
        if (!room) {
            return res.status(404).json({ error: "Room not found" });
        }

        const timeDiff = new Date(checkOutDate) - new Date(checkInDate);
        const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
        const totalPrice = room.price * daysDiff * roomQuantity;

        const booking = await Booking.create({
            userId,
            roomId,
            checkInDate,
            checkOutDate,
            roomQuantity,
            totalPrice,
        });

        res.status(201).json({ message: "Booking created successfully", booking });
    } catch (error) {
        console.error("Error creating booking:", error);
        res.status(500).json({ error: "Failed to create booking" });
    }
};

// Get all bookings for a user
export const getUserBookings = async (req, res) => {
    const { userId } = req.params;

    try {
        const bookings = await Booking.findAll({
            where: { userId },
            include: [{ model: Room, attributes: ["name", "imageUrl"] }], // Include room details
        });

        res.status(200).json({ bookings });
    } catch (error) {
        console.error("Error fetching user bookings:", error);
        res.status(500).json({ error: "Failed to fetch bookings" });
    }
};

// Update a booking (e.g., change status)
export const updateBooking = async (req, res) => {
    const { bookingId } = req.params;
    const { status } = req.body;

    try {
        const booking = await Booking.findByPk(bookingId);
        if (!booking) {
            return res.status(404).json({ error: "Booking not found" });
        }

        booking.status = status;
        await booking.save();

        res.status(200).json({ message: "Booking updated successfully", booking });
    } catch (error) {
        console.error("Error updating booking:", error);
        res.status(500).json({ error: "Failed to update booking" });
    }
};

// Cancel a booking
export const cancelBooking = async (req, res) => {
    const { bookingId } = req.params;

    try {
        const booking = await Booking.findByPk(bookingId);
        if (!booking) {
            return res.status(404).json({ error: "Booking not found" });
        }

        booking.status = "cancelled";
        await booking.save();

        res.status(200).json({ message: "Booking cancelled successfully", booking });
    } catch (error) {
        console.error("Error cancelling booking:", error);
        res.status(500).json({ error: "Failed to cancel booking" });
    }
};

export const bookingController = { createBooking, updateBooking, getUserBookings, cancelBooking };