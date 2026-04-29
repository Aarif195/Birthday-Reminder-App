import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./src/config/db";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.json({ message: "Birthday Reminder App Backend" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});