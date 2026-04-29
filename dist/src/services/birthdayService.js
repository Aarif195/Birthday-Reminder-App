"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAndSendBirthdays = void 0;
const User_1 = require("../models/User");
const mailer_1 = require("../utils/mailer");
const checkAndSendBirthdays = async () => {
    try {
        const today = new Date();
        const month = today.getMonth() + 1;
        const day = today.getDate();
        // Find users whose DOB matches current month and day
        const celebrants = await User_1.User.find({
            $expr: {
                $and: [
                    { $eq: [{ $month: "$dob" }, month] },
                    { $eq: [{ $dayOfMonth: "$dob" }, day] },
                ],
            },
        });
        if (celebrants.length === 0) {
            console.log("No birthdays today.");
            return;
        }
        for (const user of celebrants) {
            const htmlContent = `
        <h1>Happy Birthday, ${user.username}!</h1>
        <p>Wishing you a fantastic day filled with joy and celebration.</p>
      `;
            await (0, mailer_1.sendBirthdayEmail)(user.email, "Happy Birthday!", htmlContent);
            console.log(`Birthday email sent to: ${user.email}`);
        }
    }
    catch (error) {
        console.error("Error in birthday service:", error);
    }
};
exports.checkAndSendBirthdays = checkAndSendBirthdays;
