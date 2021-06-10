const express = require("express");
const articleRoutes = require("./routes/article");
const userRoutes = require("./routes/user");
const likeRoutes = require("./routes/like");
const commentRoutes = require("./routes/comment");
const dotenv = require("dotenv").config();
const fs = require("fs");
const path = require("path");
const helmet = require("helmet");
const morgan = require("morgan");
const sanitizeReqBody = require("./config/sanitize");

var accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), {
  flags: "a",
});

const app = express();
app.use(helmet());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
app.use(morgan("combined", { stream: accessLogStream }));
app.use(express.json());
app.use(sanitizeReqBody);
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/articles", articleRoutes);
app.use("/api/user", userRoutes);
app.use("/api/like", likeRoutes);
app.use("/api/comment", commentRoutes);

module.exports = app;
