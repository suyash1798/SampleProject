const jwt = require("jsonwebtoken");
const HttpStatus = require("http-status-codes");

const verifyToken = (req, res, next) => {
  if (!req.headers.authorization) {
    return res
      .status(HttpStatus.StatusCodes.UNAUTHORIZED)
      .json({ message: "No Authorization" });
  }
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res
      .status(HttpStatus.StatusCodes.FORBIDDEN)
      .json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, "10000");
    req.user = decoded.data;
    next();
  } catch (err) {
    if (err.expiredAt < new Date()) {
      return res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Token has expired. Please login again",
        token: null,
      });
    }
    next();
  }
};
module.exports = { verifyToken };
