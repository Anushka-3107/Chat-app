const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      console.log("Incoming Token:", token); // 👀 log token
      console.log("JWT_SECRET:", process.env.JWT_SECRET ? "Loaded" : "Missing"); // check env

      //decode token id
      console.log("Verifying token with secret:", process.env.JWT_SECRET); // Add this line
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
       console.log("Decoded:", decoded); // 👀 log decoded payload

       
      req.user = await User.findById(decoded.id).select("-password");

      return next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  else{
    res.status(401);
    throw new Error("Not authorized,no token");
  }
});

module.exports = { protect };
