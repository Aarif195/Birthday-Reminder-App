"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendBirthdayEmail = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const sendBirthdayEmail = async (to, subject, html, senderName = "Birthday Bot") => {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "api-key": `${process.env.BREVO_API_KEY}`.trim()
        },
        body: JSON.stringify({
            sender: {
                name: senderName,
                email: "adebayoabdulazeez195@gmail.com"
            },
            to: [{ email: to }],
            subject: subject,
            htmlContent: html
        })
    });
    const data = await response.json();
    if (!response.ok) {
        console.error("Brevo API Error Details:", data);
        throw new Error(`Email failed: ${data.message || response.statusText}`);
    }
    return data;
};
exports.sendBirthdayEmail = sendBirthdayEmail;
