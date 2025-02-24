import jwt from "jsonwebtoken";

// Basic Authorization Guard
export const authGuard = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ success: false, message: "Authorization header missing!" });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ success: false, message: "Token missing!" });
    }

    try {
        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedData; // Store the decoded user data in the request object
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: "Invalid token!" });
    }
};

// Admin Authorization Guard
export const authGuardAdmin = (req, res, next) => {
    authGuard(req, res, () => {
        console.log("Decoded user email: ", req.user.email); // Check the decoded email

        if (req.user.email !== "resortadmin@gmail.com") {
            return res.status(403).json({ success: false, message: "Permission denied!" });
        }
        next();
    });
};