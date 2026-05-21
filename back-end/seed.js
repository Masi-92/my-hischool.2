import { hashPassword } from "./controller/hash.controller.js";
import schoolModel from "./models/school.model.js";
import userModel, { Roles } from "./models/user.model.js";
import classModel from "./models/class.model.js";

function getSuperAdminCredentials() {
  return {
    email: (process.env.SUPER_ADMIN_EMAIL || "admin@renovaplan.com")
      .trim()
      .toLowerCase(),
    password: process.env.SUPER_ADMIN_PASSWORD || "Admin123456!",
  };
}

export async function seedFirstSchool() {
  const hashedPassword = await hashPassword("123456");
  const admin = await userModel.create({
    email: "admin1@gmail.com",
    password: hashedPassword,
    fullName: "admin admini",
    role: Roles.MANAGER,
  });
  await schoolModel.create({
    name: "some school",
    address: "some address",
    tel: "+5465985265",
    email: "school.merkel@gmail.com",
    admin: admin._id,
  });
}

export async function seedClass() {
  const school = "6561b766e86ef4b81604cc8d";
  const teacher = "6561c13953dd4bcf2bcd0042";
  await classModel.create({ name: "Class A", school, teacher });
}

export async function seedSuperAdmin() {
  const { email, password } = getSuperAdminCredentials();

  const existing = await userModel.findOne({
    $or: [{ email, role: Roles.SUPER_ADMIN }, { role: Roles.SUPER_ADMIN }],
  });

  if (existing) {
    console.log("Super Admin already exists");
    return;
  }

  const hashedPassword = await hashPassword(password);

  await userModel.create({
    email,
    password: hashedPassword,
    fullName: "Super Admin",
    role: Roles.SUPER_ADMIN,
    active: true,
  });

  console.log("Super Admin created successfully");
}
