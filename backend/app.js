const express = require("express");
const mongoose = require("mongoose");
const saucesRoutes = require("./routes/sauces");
const userRoutes = require("./routes/user");
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
app.use("/api/articles", saucesRoutes);
app.use("/api/user", userRoutes);

module.exports = app;
