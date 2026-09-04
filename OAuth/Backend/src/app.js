const express = require("express");
const cors = require("cors");
const morgen = require("morgan");
const cookieParser = require("cookie-parser");

const authRouter = require("./routes/auth.router");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use(morgen("dev"));
app.use(cookieParser());

app.use("/api/auth", authRouter);

module.exports = app;
