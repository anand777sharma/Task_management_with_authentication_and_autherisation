import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import router from "./routes.js";
import cors from "cors";

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Enable CORS with default settings (allows all origins)
app.use(cors());

// If you want to restrict origins, use:
// app.use(cors({ origin: "http://your-frontend-domain.com", credentials: true }));

app.use(express.json());
app.use(router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
