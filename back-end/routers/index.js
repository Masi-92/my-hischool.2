import { Router } from "express";
import authRoutes from "./auth.route.js";
// import multer from "multer";
// import { uploadFile } from "../controller/file.controller.js";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
// import { cloudinary } from "../config/cloudinaryCongig.js";
import manageTeacherRoutes from "./managerTeacher.router.js"
import fileRoute from "./"


const router = Router();


router.use("/auth" ,authRoutes);
router.use("/auth",authRoutes);
router.use("manageTeacher",manageTeacherRouter)











export default router