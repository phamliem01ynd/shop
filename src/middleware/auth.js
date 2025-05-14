const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = async (req, res, next) => {
  const white_list = ["/", "/login", "/register"];
  if (white_list.find((item) => "/api/user" + item === req.originalUrl)) {
    return next();
  }
  if (req?.headers?.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      console.log("Check token >>>:", req.user);
      next();
    } catch (error) {
      return res.status(401).json({
        message: "unauthorized",
      }); 
    }
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = auth;
