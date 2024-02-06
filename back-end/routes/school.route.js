import { Router } from "express";
import {
  createSchool,
  deleteSchool,
  getMySchool,
  getSchoolById,
  getSchoolList,
  updateSchool,
} from "../controller/school.controller.js";
import { auth } from "../middleware/auth.js";
import { hasRole } from "../middleware/role.js";
import { validate } from "../middleware/validate.middleware.js";
import { Roles } from "../models/user.model.js";
import { createSchoolSchema, updateSchoolSchema } from "../validation/school.schema.js";

const router = Router();

router.get("/", auth, hasRole(Roles.SUPER_ADMIN), getSchoolList);
router.get("/my", auth, hasRole(Roles.MANAGER,Roles.PARENT,Roles.TEACHER), getMySchool);
router.get("/:schoolId", auth, hasRole(Roles.SUPER_ADMIN), getSchoolById);
router.post(
  "/",
  auth,
  hasRole(Roles.SUPER_ADMIN),
  validate(createSchoolSchema),
  createSchool
);
router.delete("/:schoolId", auth, hasRole(Roles.SUPER_ADMIN), deleteSchool);
router.put(
  "/:schoolId",
  auth,
  hasRole(Roles.SUPER_ADMIN),
  validate(updateSchoolSchema),
  updateSchool
);

export default router;
