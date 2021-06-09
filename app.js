const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/authRoutes");

const app = express();

const db = require("./db/dbConnect");

app.use(cors());

dotenv.config({ path: "./config.env" });

app.use(express.json());

app.use("/api/user", authRoutes);

const port = process.env.PORT || 4004;

app.listen(port, () => {
  console.log("Process start in 4004");
});
