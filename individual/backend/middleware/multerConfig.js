import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../uploads/cloudinaryConfig.js";

// Cloudinary storage configuration
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "room_images", // Cloudinary folder name
    allowed_formats: ["jpg", "jpeg", "png", "gif"], // Allow specific image types
    public_id: (req, file) => `${Date.now()}-${file.originalname.split(".")[0]}`, // Unique filename
  },
});

// File filter to allow only images
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/jpg"];
  allowedTypes.includes(file.mimetype)
    ? cb(null, true)
    : cb(new Error("Invalid file type. Only JPEG, PNG, JPG, and GIF are allowed!"), false);
};

// Initialize Multer with Cloudinary storage
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
});

export default upload;