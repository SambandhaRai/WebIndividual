import express from "express";
import { 
    createBooking, 
    getUserBookings, 
    updateBooking, 
    cancelBooking 
} from "../../controller/booking/bookingController.js";
import { authGuard } from "../../middleware/token-middleware.js";

const router = express.Router();

router.post("/", authGuard, createBooking);

router.get("/user/:userId", authGuard, getUserBookings);

router.put("/:bookingId", authGuard, updateBooking);

router.delete("/:bookingId", authGuard, cancelBooking);

export { router as bookingRouter};