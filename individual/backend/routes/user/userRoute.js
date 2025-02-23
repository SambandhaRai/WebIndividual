import express from "express";
import { userController } from "../../controller/user/userController.js";
import { authGuard, authGuardAdmin } from "../../middleware/token-middleware.js";

const router = express.Router();

// Create a new user (Consider adding validation)
router.post("/create", userController.create);

// Get all users (Only Admins)
router.get("/", authGuard, authGuardAdmin, userController.getAll);

// Get a user by ID (Only Admins)
router.get("/:id", authGuard, authGuardAdmin, userController.getById);

// Update a user (User must be authenticated)
router.put("/:id", authGuard, userController.update);

// Delete a user (Only Admins)
router.delete("/:id", authGuard, authGuardAdmin, userController.deleteById);

export { router as userRouter };