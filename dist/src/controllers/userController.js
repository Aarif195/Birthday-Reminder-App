"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = void 0;
const User_1 = require("../models/User");
const registerUser = async (req, res) => {
    try {
        const { username, email, dob } = req.body;
        const newUser = new User_1.User({
            username,
            email,
            dob: new Date(dob),
        });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.registerUser = registerUser;
