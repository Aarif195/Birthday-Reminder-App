"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./src/config/db");
const cron_1 = require("./src/config/cron");
const userRoutes_1 = __importDefault(require("./src/routes/userRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(express_1.default.json());
(0, db_1.connectDB)();
(0, cron_1.initCronJobs)();
app.use("/api/users", userRoutes_1.default);
app.get("/", (req, res) => {
    res.json({ message: "Birthday Reminder App Backend" });
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
