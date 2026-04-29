import { Schema, model, Document } from "mongoose";

interface IUser extends Document {
  username: string;
  email: string;
  dob: Date;
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  dob: { type: Date, required: true },
});

export const User = model<IUser>("User", userSchema);