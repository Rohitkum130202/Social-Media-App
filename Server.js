const express = require("express");
const cookieParser = require("cookie-parser");
require("dotenv").config();

// import Database connection
const DbConnect = require("./config/db");
//importing route
const userRoute = require("./routes/userRoute");
const cors = require("cors");

// Call the function
DbConnect();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

//Using the route for user
app.use("/api/v1", userRoute);
