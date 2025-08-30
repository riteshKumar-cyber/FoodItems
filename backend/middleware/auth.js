import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id; // ✅ store userId for later
    next();
  } catch (error) {
    console.log("JWT Error:", error.message);
    res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export default authMiddleware;
