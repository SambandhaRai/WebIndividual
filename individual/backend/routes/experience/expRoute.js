import express from "express";
import {
  create,
  getAll,
  getExperienceById,
  updateExperience,
  deleteById,
} from "../../controller/experience/expController.js";
import { authGuard, authGuardAdmin } from "../../middleware/token-middleware.js";
import upload from "../../middleware/multerConfig.js";

const router = express.Router();

// Routes for managing experiences
router.post("/create", authGuard, authGuardAdmin, upload.single("image"), create);
router.get("/", getAll);
router.get("/:id", getExperienceById);
router.put("/:id", authGuard, authGuardAdmin, upload.single("image"), updateExperience);
router.delete("/:id", authGuard, authGuardAdmin, deleteById);

export { router as expRouter };
