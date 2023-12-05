import schoolModel from "../models/school.model.js";
import userModel, { Roles } from "../models/user.model";
import { hashPassword, hashPassword } from "./hash.controller.js";
import { getSchoolOfManagerById } from "./utils.controller.js";

// manager requests list of teachers

export const getTeachers = async (req, res) => {
  const school = await getSchoolOfManagerById(req.user.id);
  // find list of users where role is teacher and her/his school is above school
  const teachers = await userModel.find({
    role: Roles.TEACHER,
    "profile.school": school._id,
  });
  res.send(teachers);
};


// manager request one teacher by id

export const getTeacherById = async (req,res) =>{
    const {teacherId} = req.params;
     const school = await getSchoolOfManagerById(req.user.id)
      // find list of users where role is teacher and her/his school is above school
      const teacher = await userModel.findOne({_id:  teacherId,
        "profile.school" : school._id})
}


export const createTeacher = async (req,res) =>{

    const school = await getSchoolOfManagerById ( req.user.id);
    const body = req.body;
 // hash password

 const  hashPassword = await hashPassword (body.hashPassword);

 //create teacher
 
  userModel.create({
email:body.email,
password: hashPassword,
fullName:body.fullName,
role:Roles.TEACHER,
profile:{school:school._id, image:body.image}


  })
res.send(user)
}

 export const deleTeacher = async (req,res)=>{
const school = await getSchoolOfManagerById(req.user.id);
const {teacherId} = req.params;
const user = await userModel.findByIdAndDelete({
    _id:teacherId,
    "profile.school" : school._id.Roles,

});

if(!user) return res.status(400).send({msg:`"teacher not found"`})

res.sendStatus(200);
 }  

 export const updateTeacher = async (req, res) => {
    const school = await getSchoolOfManagerById(req.user.id);
  
    const body = req.body;
  
    if (body.password) body.password = await hashPassword(body.password);
  
    const { teacherId } = req.params;
  
    const user = await userModel.findOneAndUpdate(
      {
        _id: teacherId,
        "profile.school": school._id,
      },
      { $set: body }
    );
    if (!user) return res.status(400).send({ message: "teacher not found" });
  
    res.sendStatus(200);
  };
  