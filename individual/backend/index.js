import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { db } from "./database/db.js";
import { userRouter, authRouter, roomRouter } from "./routes/index.js";
import { createUploadsFolder } from "./security/helper.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// CORS Configuration (consistent with the first version)
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"], // Specify allowed origins
    credentials: true, // Allow credentials (tokens/cookies)
    methods: ["GET", "POST", "PUT", "DELETE"], // Explicitly allow methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow necessary headers
  })
);

// Middleware
app.use(express.json()); // Parses incoming JSON
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded data

// Serve uploaded images
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/rooms", roomRouter);

// Ensure upload folder exists before starting the server
createUploadsFolder();

// Connect to database before starting the server
db()
  .then(() => {
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
    process.exit(1); // Stop server if database connection fails
  });
