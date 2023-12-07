import { Router } from "express";
import authRoutes from "./auth.route.js";
import manageTeacherRoutes from "./managerTeacher.router.js";
import fileRoute from "./file.route.js";
import classRoute from "./class.route.js"
import studentRoute from "./student.router.js"

const router = Router();

router.use("/auth", authRoutes);
router.use("/auth", authRoutes);
router.use("manageTeacher", manageTeacherRoutes);
router.use("/class", classRoute);
router.use("/student", studentRoute);
router.use("/file", fileRoute);

export default router;
