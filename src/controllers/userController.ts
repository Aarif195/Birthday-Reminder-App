import { Request, Response } from "express";
import { User } from "../models/User";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, email, dob } = req.body;

    const newUser = new User({
      username,
      email,
      dob: new Date(dob),
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};