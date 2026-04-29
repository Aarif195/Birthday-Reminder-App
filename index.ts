import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./src/config/db";
import { initCronJobs } from "./src/config/cron";
import userRoutes from "./src/routes/userRoutes";
import cors from "cors";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(
    cors({
        origin: process.env.FRONTEND_URL || "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
    })
);

connectDB();
initCronJobs();

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
    res.json({ message: "Birthday Reminder App Backend" });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});