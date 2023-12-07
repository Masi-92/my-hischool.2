import { Router } from "express";
import authRoutes from "./auth.route.js";
import manageTeacherRoutes from "./managerTeacher.router.js";
import fileRoute from "./";

const router = Router();

router.use("/auth", authRoutes);
router.use("/auth", authRoutes);
router.use("manageTeacher", manageTeacherRoutes);
router.use("/class", classRouter);
router.use("/student", studentRouter);
router.use("/file", fileRoute);

export default router;
