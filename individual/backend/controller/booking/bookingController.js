import { Room, Booking, User } from "../../model/associations.js";

export const createBooking = async (req, res) => {
    const { roomId, checkInDate, checkOutDate, roomQuantity } = req.body;

    try {
        const userId = req.user.id; // Assumes user ID is available from a middleware (e.g., authentication)

        // Fetch the user details
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Fetch the room details
        const room = await Room.findByPk(roomId);
        if (!room) {
            return res.status(404).json({ error: "Room not found" });
        }

        // Calculate the total price
        const timeDiff = new Date(checkOutDate) - new Date(checkInDate);
        const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));  // Number of days
        const totalPrice = room.price * daysDiff * roomQuantity; // Total price

        // Create the booking
        const booking = await Booking.create({
            userId,
            userName: user.name, 
            userEmail: user.email, 
            userContact: user.contact,
            roomId,
            checkInDate,
            checkOutDate,
            roomQuantity,
            totalPrice, // Store calculated total price
            roomName: room.name, // Store room name directly in booking
            pricePerNight: room.price, // Store price per night in the booking
        });

        res.status(201).json({ message: "Booking created successfully", booking });
    } catch (error) {
        console.error("Error creating booking:", error);
        res.status(500).json({ error: "Failed to create booking" });
    }
};

export const getUserBookings = async (req, res) => {
    let { userId } = req.params;

    try {
        let whereCondition = {};

        if (userId !== "all") {
            const parsedUserId = parseInt(userId, 10);
            if (isNaN(parsedUserId)) {
                return res.status(400).json({ error: "Invalid userId format" });
            }
            whereCondition = { userId: parsedUserId };
        }

        // Fetch bookings with associated User and Room details
        const bookings = await Booking.findAll({
            where: whereCondition,
            include: [
                {
                    model: Room,
                    attributes: ["name", "price"],  // Include room name and price in the response
                },
                {
                    model: User,
                    attributes: ["name", "email", "contact"],  // Include user info in the response
                },
            ],
        });

        res.status(200).json({ bookings });
    } catch (error) {
        console.error("Error fetching user bookings:", error);
        res.status(500).json({ error: "Failed to fetch bookings" });
    }
};

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

export const cancelBooking = async (req, res) => {
    const { bookingId } = req.params;

    try {
        const booking = await Booking.findByPk(bookingId);
        if (!booking) {
            return res.status(404).json({ error: "Booking not found" });
        }

        // Update the booking status to cancelled
        booking.status = "cancelled";
        await booking.save();

        res.status(200).json({ message: "Booking cancelled successfully", booking });
    } catch (error) {
        console.error("Error cancelling booking:", error);
        res.status(500).json({ error: "Failed to cancel booking" });
    }
};

export const deleteBooking = async (req, res) => {
    const { bookingId } = req.params;

    try {
        const booking = await Booking.findByPk(bookingId);
        if (!booking) {
            return res.status(404).json({ error: "Booking not found" });
        }

        // Delete the booking from the database
        await booking.destroy();

        res.status(200).json({ message: "Booking deleted successfully" });
    } catch (error) {
        console.error("Error deleting booking:", error);
        res.status(500).json({ error: "Failed to delete booking" });
    }
};

export const bookingController = { createBooking, updateBooking, getUserBookings, cancelBooking, deleteBooking };
