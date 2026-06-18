import express from "express";
import dotenv from "dotenv";
import connectDB from "./mongodb/db.js";
import cors from "cors";
import userRoutes from "./mongodb/routes/UserRoutes.js";

dotenv.config();

const app = express();

connectDB();

app.use(express.json());
app.use(cors());

app.use("/api/auth", userRoutes);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
