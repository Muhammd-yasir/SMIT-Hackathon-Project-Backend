
const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(401).json({ message: "Please login again" });
  }

  const token = authorization.startsWith("Bearer ")
    ? authorization.split(" ")[1]
    : authorization;

  try {
    req.user = jwt.verify(token, process.env.SECRET_KEY);
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

module.exports = authMiddleware;
