import express from "express";
import dotenv from "dotenv";
import connectDB from "./mongodb/db.js";
import cors from "cors";
import ProductRoutes from "./mongodb/routes/ProductRoutes.js";

dotenv.config();

const app = express();

connectDB();

app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send(`product-service is running on PORT ${PORT}!`);
});

app.use("/", ProductRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
