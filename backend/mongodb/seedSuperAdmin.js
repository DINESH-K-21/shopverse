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


const exists = await User.findOne({
  email: "ronaldo@gmail.com",
});

if (!exists) {
  const hashedPassword = await bcrypt.hash("Password@123", 10);

  await User.create({
    name: "Ronaldo",
    email: "ronaldo@gmail.com",
    password: hashedPassword,
    role: "superadmin",
  });

  console.log("Super Admin Created");
} else {
  console.log("Already Exists");
}

await mongoose.connection.close();
process.exit(0);