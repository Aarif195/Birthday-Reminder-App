import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./src/config/db";
import { initCronJobs } from "./src/config/cron";
import userRoutes from "./src/routes/userRoutes";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// app.use(
//     cors({
//         origin: process.env.FRONTEND_URL || "http://localhost:5173",
//         methods: ["GET", "POST", "PUT", "DELETE"],
//         credentials: true
//     })
// );


const allowedOrigins = [
  "https://birthday-reminder-app-ui.onrender.com",
  "http://localhost:5173"
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());


connectDB();
initCronJobs();

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
    res.json({ message: "Birthday Reminder App Backend" });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});