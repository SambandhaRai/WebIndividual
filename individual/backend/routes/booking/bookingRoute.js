import express from "express";
import { 
    createBooking, 
    getUserBookings, 
    updateBooking, 
    cancelBooking, 
    deleteBooking 
} from "../../controller/booking/bookingController.js";
import { authGuard } from "../../middleware/token-middleware.js";

const router = express.Router();

// Create a new booking (requires authentication)
router.post("/", authGuard, createBooking);

// Get bookings for a user (requires authentication)
router.get("/user/:userId", authGuard, getUserBookings);

// Update the status of a booking (requires authentication)
router.put("/:bookingId", authGuard, updateBooking);

// Cancel a booking (requires authentication)
router.put("/:bookingId/cancel", authGuard, cancelBooking);

// Delete a booking (requires authentication)
router.delete("/:bookingId", authGuard, deleteBooking); 

export { router as bookingRouter };
