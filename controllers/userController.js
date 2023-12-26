const User = require("../models/userModel");
const Post = require("../models/postModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const isuserexist = await User.findOne({ email });

    const salt = await bcrypt.genSalt(10);
    const Hashp = await bcrypt.hash(password, salt);
    if (isuserexist) {
      return res.status(500).json({
        success: false,
        message: "User already exist",
      });
    }
    const user = new User({
      username,
      email,
      password: Hashp,
    });
    user.save();
    res.status(200).json({
      success: true,
      message: "Successfully registered",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: true,
      message: "Error while doing registration",
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(500).json({
        success: false,
        message: "User not found",
      });
    }

    const passwordCheck = await bcrypt.compare(password, user.password);

    if (!passwordCheck) {
      return res.status(500).json({
        success: false,
        message: "Invalid password",
      });
    }

    // Generate a new token
    const payload = {
      id: user._id,
      username: user.username,
      email: user.email,
    };
    const token = await jwt.sign(payload, "JWT_SECRET", { expiresIn: 86400 });

    // Save the token to the user document
    user.token = token;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Login Successfully",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error while doing login",
    });
  }
};

const createPostController = async (req, res) => {
  try {
    const { desc, url, caption } = req.body;
    const { user } = req;
    if (!desc || !url || !caption) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }

    const createPost = new Post({
      caption: caption,
      description: desc,
      image: url,
      user: user,
    });

    // Save the post and handle any potential errors
    await createPost.save();

    res.status(200).json({
      success: true,
      message: "Post created successfully",
      createPost,
    });
  } catch (error) {
    console.error("Error in createPostController:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = { registerController, loginController, createPostController };
