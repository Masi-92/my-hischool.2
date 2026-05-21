import { Router } from "express";
import {
  login,
  register,
  getUserDetail,
  editProfile,
  getProfile,
  changePassword
} from "../controller/auth.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import { changePasswordSchema, editProfileSchema, loginSchema, registerSchema } from "../validation/auth.schema.js";
import { auth } from "../middleware/auth.js";
import { hasRole } from "../middleware/role.js";
import { Roles } from "../models/user.model.js";
import { asyncHandler } from "../middleware/error.middleware.js";


const router = Router();

router.post("/login", validate(loginSchema), asyncHandler(login));
router.post("/studentRegister", validate(registerSchema), asyncHandler(register));
router.post("/getUserDetail/:id", auth, asyncHandler(getUserDetail));
router.put("/editProfile", auth,hasRole(Roles.MANAGER,Roles.PARENT,Roles.TEACHER),validate(editProfileSchema), asyncHandler(editProfile));
router.get("/profile", auth,hasRole(Roles.MANAGER,Roles.PARENT,Roles.TEACHER), asyncHandler(getProfile));
router.put("/changePassword", auth,hasRole(Roles.MANAGER,Roles.PARENT,Roles.TEACHER),validate(changePasswordSchema), asyncHandler(changePassword));

export default router;
