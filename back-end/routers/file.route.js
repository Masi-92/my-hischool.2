import multer from "multer";
import { Router } from "express";
import { uploadFile } from "../controller/file.controller.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { cloudinary } from "../config/cloudinaryCongig.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "hiSchoolImage",
    format: async (req, file) => {
      return file.originalname.substring(
        file.originalname.lastIndexOf(".") + 1
      );
    },
    public_id: (req, file) => {
      const uniqueSuffix = Data.now() + "-" + Math.round(Math.random() * 1e9);
      return (
        uniqueSuffix +
        "-" +
        file.originalname.substring(0, file.originalname.lastIndexOf("."))
      );
    },
  },
});

const upload = multer({ storage });
const router = Router();

router.post("/upload", upload.single("image"), uploadFile);

export default router;
