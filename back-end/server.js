import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import { dirname } from "path";
import { fileURLToPath } from "url";
import router from "./routes/index.js";
import { seedSuperAdmin } from "./seed.js";
import { errorHandler } from "./middleware/error.middleware.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = process.env.PORT || 3010;
const DB_URL = (process.env.DB_URL || process.env[" DB_URL"] || "").trim();

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || true,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.static(__dirname + "/client"));
app.use("/api", router);

app.get("/*", (req, res) => {
  res.sendFile(__dirname + "/client/index.html");
});

app.use(errorHandler);

if (!DB_URL) {
  console.error("DB_URL is not set in .env");
  process.exit(1);
}

mongoose
  .connect(DB_URL)
  .then(async () => {
    console.log("Connected to MongoDB with mongoose");
    await seedSuperAdmin();
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  });

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
