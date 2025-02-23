import express from "express";
import { roomController } from "../../controller/room/roomController.js";
import { authGuard, authGuardAdmin } from "../../middleware/token-middleware.js";
import multer from "multer";
import path from "path";

const router = express.Router();

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.post("/create", authGuardAdmin, upload.single("image"), roomController.create);

router.get("/", roomController.getAll);

router.get("/:id", roomController.getById);

router.put("/:id", authGuardAdmin, upload.single("image"), roomController.update);

router.delete("/:id", authGuardAdmin, roomController.deleteById);

export { router as roomRouter };
