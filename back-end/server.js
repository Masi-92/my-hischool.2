import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import router from "./routes/index.js";
import { seedSuperAdmin } from "./seed.js";


dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;
const app = express();

app.use(cors());
app.use(express.static(__dirname + "/client"))

app.use(express.json());
app.use(cors());
app.use("/api", router);

app.get("/*", (req, res) => {
  res.sendFile(__dirname + "/client/index.html");
});


mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("Connected to MongoDB with mongoose");

   //seedFirstSchool()

   //console.log(seedFirstSchool)
    // seedClass()
    // seedSuperAdmin()
  })
  .catch((error) => {
    console.log(error);
    
    console.log("Connection failed");
  });

  
app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
