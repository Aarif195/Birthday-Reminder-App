import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./src/config/db";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});