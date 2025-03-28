import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import router from "./routes.js";
import cors from "cors";


dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

app.use(cors());

app.use(express.json());
app.use(router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
