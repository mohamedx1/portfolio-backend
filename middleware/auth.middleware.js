const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

exports.authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // 2. فك التوكن
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. جلب بيانات المستخدم بدون الباسورد
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }

    // 4. السماح بالمرور للـ route
    next();
  } catch (err) {
    return res.status(403).json({ message: "Token invalid or expired" });
  }
};
