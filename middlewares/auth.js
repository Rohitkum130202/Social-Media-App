// middleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authenticate = async (req, res, next) => {
  try {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization?.split(" ");
    if (!authorization || !token) {
      return res.status(401).send("Invalid token");
    }

    const verifyToken = jwt.verify(token, "JWT_SECRET");
    const user = await User.findOne({ _id: verifyToken.id, token });
    // console.log(verifyToken, "==", user, "==", authorization, "==", token);
    if (!user) {
      return res.status(404).send("User not found");
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { authenticate };
