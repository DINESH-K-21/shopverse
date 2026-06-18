import express from "express";
import dotenv from "dotenv";
import connectDB from "./mongodb/db.js";
import cors from "cors";
import userRoutes from "./mongodb/routes/UserRoutes.js";
import ProductRoutes from "./mongodb/routes/ProductRoutes.js";

dotenv.config();

const app = express();

connectDB();

app.use(express.json());
app.use(cors());

app.use("/api/auth", userRoutes);
app.use("/api/products", ProductRoutes);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
