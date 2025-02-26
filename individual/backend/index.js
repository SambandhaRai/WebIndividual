import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { db } from "./database/db.js";
import { userRouter, authRouter, roomRouter, expRouter, bookingRouter } from "./routes/index.js"; 
import { createUploadsFolder } from "./security/helper.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// CORS Configuration
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/rooms", roomRouter); // Ensure this line exists
app.use("/api/experience", expRouter);
app.use("/api/bookings", bookingRouter);

// Ensure upload folder exists before starting the server
createUploadsFolder();

// Connect to database before starting the server
db()
  .then(() => {
    app.listen(port, () => console.log(`Server is running on port ${port}`));
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
    process.exit(1);
  });