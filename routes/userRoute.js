const express = require("express");
const router = express.Router();
const {
  registerController,
  loginController,
  createPostController,
} = require("../controllers/userController");

const { authenticate } = require("../middlewares/auth");

//post route for Register Controllers
router.post("/user/register", registerController);

//Post route for login
router.post("/user/login", loginController);

//Post Route for create post
router.post("/new-post", authenticate, createPostController);

module.exports = router;
