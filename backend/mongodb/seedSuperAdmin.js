import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "../mongodb/modules/UserSchema.js";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

const connect = await mongoose.connect(process.env.MONGODB_URI);


const exists = await User.findOne({ email: "ronaldo@gmail.com" });

if (!exists) {

  await User.create({
    name: "Ronaldo",
    email: "ronaldo@gmail.com",
    password: "Password@123",
    role: "superadmin",
  });

  console.log("Super Admin Created");
} else {
  exists.password = "Password@123";
  await exists.save();
  console.log("Super Admin password reset");
}

await mongoose.connection.close();
process.exit(0);