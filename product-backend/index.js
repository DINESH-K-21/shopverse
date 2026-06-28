import express from "express";
import dotenv from "dotenv";
import connectDB from "./mongodb/db.js";
import cors from "cors";
import ProductRoutes from "../product-backend/mongodb/routes/ProductRoutes.js";

dotenv.config();

const app = express();

connectDB();

app.use(express.json());
app.use(cors());


app.use("/api/products", ProductRoutes);
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
