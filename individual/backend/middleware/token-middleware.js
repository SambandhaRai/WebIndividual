export function authenticateToken(req, res, next) {
  console.log("Request Path:", req.path); // Debugging line

  const publicRoutes = ["/api/users/create", "/api/auth/login"];

  if (publicRoutes.includes(req.originalUrl)) {
    return next();
  }

  if (publicRoutes.includes(req.path)) {
    
    console.log("Skipping authentication for:", req.path);
    return next(); // Skip authentication for public routes
  }

  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).send({ message: "Access denied. No token provided." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).send("Invalid or expired token.");
    }
    req.user = decoded;
    next();
  });
}