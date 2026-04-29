import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./src/config/db";
dotenv.config();
import { initCronJobs } from "./src/config/cron";
import userRoutes from "./src/routes/userRoutes";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "http://localhost:5173/",
            process.env.FRONTEND_URL
        ].filter(Boolean) as string[],
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