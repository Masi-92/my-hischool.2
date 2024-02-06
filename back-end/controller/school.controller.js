import schoolModel from "../models/school.model.js";
import userModel, { Roles } from "../models/user.model.js";
import {
  getSchoolIdOfTeacherById,
  getSchoolOfManagerById,
} from "./utils.controller.js";
import { hashPassword } from "./hash.controller.js";

// manager requests list of schools
export const getSchoolList = async (req, res) => {
  const schoolList = await schoolModel
    .find({ deleted: { $ne: true } })
    .populate("admin");
  res.send(schoolList);
};

export const getMySchool = async (req, res) => {
  const { role, id } = req.user;

  if (role === Roles.MANAGER) {
    const school = await getSchoolOfManagerById(id);
    res.send(school);
  } else if (role === Roles.TEACHER) {
    const schoolId = await getSchoolIdOfTeacherById(id);
    const school = await schoolModel.findById(schoolId);
    res.send(school);
  } else if (role === Roles.PARENT) {
    const user = await userModel.findById(id);
    const school = await schoolModel.findById(user.school);
    res.send(school);
  } else {
    res.status(400).send({ message: "school not found" });
  }
};

export const getSchoolById = async (req, res) => {
  const { schoolId } = req.params;
  const school = await schoolModel.findById(schoolId).populate("admin");
  res.send(school);
};

export const createSchool = async (req, res) => {
  const body = req.body;
  const user = await userModel.findOne({ email: body.managerEmail });
  if (user)
    return res.status(400).send({ message: "manager email already token" });

  const school = await schoolModel.findOne({ email: body.email });
  if (school)
    return res.status(400).send({ message: "school email already token" });

  const password = await hashPassword(body.managerPassword);
  const managerBody = {
    email: body.managerEmail,
    password: password,
    fullName: body.managerFullName,
    phone: body.managerPhone,
    image: body.managerImage,
    role : Roles.MANAGER
  };
  const manager = await userModel.create(managerBody);
  const schoolBody = {
    name: body.name,
    address: body.address,
    tel: body.tel,
    email: body.email,
    admin: manager._id,
  };
  const schoolItem = await schoolModel.create(schoolBody);
  res.send(schoolItem);
};

export const deleteSchool = async (req, res) => {
  const { schoolId } = req.params;
  const school = await schoolModel.findByIdAndUpdate(schoolId, {
    deleted: true,
  });

  if (!school) return res.status(400).send({ message: "school not found" });

  res.sendStatus(200);
};

export const updateSchool = async (req, res) => {
  const { schoolId } = req.params;

  const body = req.body;
  const schoolBody = {};
  if (body.name) schoolBody.name = body.name;
  if (body.address) schoolBody.address = body.address;
  if (body.tel) schoolBody.tel = body.tel;
  if (body.email) schoolBody.email = body.email;

  const managerBody = {};
  if (body.managerEmail) managerBody.email = body.managerEmail;
  if (body.managerPassword) {
    const password = await hashPassword(body.managerPassword);
    managerBody.password = password;
  }
  if (body.managerFullName) managerBody.fullName = body.managerFullName;
  if (body.managerPhone) managerBody.phone = body.managerPhone;
  if (body.managerImage) managerBody.image = body.managerImage;


  const school = await schoolModel.findByIdAndUpdate(schoolId, {
    $set: schoolBody,
  });
  if (!school) return res.status(400).send({ message: "school not found" });
  
  const manager = await userModel.findByIdAndUpdate(school.admin, {
    $set: managerBody,
  });
  if (!manager) return res.status(400).send({ message: "manager not found" });

  res.sendStatus(200);
};
