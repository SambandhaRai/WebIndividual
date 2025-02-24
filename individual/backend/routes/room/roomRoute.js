import express from "express";
import {
  create,
  getAll,
  getById,
  update,
  deleteById,
} from "../../controller/room/roomController.js";
import { authGuard, authGuardAdmin } from "../../middleware/token-middleware.js";
import upload from "../../middleware/multerConfig.js";

const router = express.Router();

// Routes
router.post("/create", authGuard, authGuardAdmin, upload.single("image"), create);
router.get("/", getAll);
router.get("/:id", getById);
router.put("/:id", authGuard, authGuardAdmin, upload.single("image"), update);
router.delete("/:id", authGuard, authGuardAdmin, deleteById);

export { router as roomRouter };
