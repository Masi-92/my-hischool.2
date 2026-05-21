import "dotenv/config";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { existsSync } from "fs";
import router from "./routes/index.js";
import { seedSuperAdmin } from "./seed.js";
import { errorHandler } from "./middleware/error.middleware.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = process.env.PORT || 3010;
const DB_URL = (
  process.env.DB_URL ||
  process.env.MONGO_URL ||
  process.env[" DB_URL"] ||
  ""
).trim();

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || true,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const clientDir = __dirname + "/client";
if (existsSync(clientDir + "/index.html")) {
  app.use(express.static(clientDir));
}

app.use("/api", router);

app.use("/api", (req, res) => {
  res.status(404).send({ message: "API route not found" });
});

if (existsSync(clientDir + "/index.html")) {
  app.get("/*", (req, res) => {
    res.sendFile(clientDir + "/index.html");
  });
}

app.use(errorHandler);

if (!DB_URL) {
  console.error("DB_URL or MONGO_URL is not set in .env");
  process.exit(1);
}

mongoose
  .connect(DB_URL)
  .then(async () => {
    console.log("Connected to MongoDB with mongoose");
    await seedSuperAdmin();

    const server = app.listen(PORT, () => {
      console.log(`Server is listening on port: ${PORT}`);
    });

    server.on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        console.error(
          `Port ${PORT} is already in use. Stop the other process or change PORT in .env`
        );
      } else {
        console.error("Server error:", err.message);
      }
      process.exit(1);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  });
