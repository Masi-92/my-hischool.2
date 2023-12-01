import schoolModel from "../models/school.model.js"
import userModel,{Roles} from "../models/user.model"
import { hashPassword } from "./hash.controller.js"
import { getSchoolOfManagerById } from "./utils.controller.js";

// manager requests list of teachers

export const getTeachers = async (req,res)=>{
    const school = await getSchoolOfManagerById(req.user.id);
    // find list of users where role is teacher and her/his school is above school
const teachers = await userModel.find({
    role: Roles.TEACHER,
    "profile.school":school._id
})
res.send(teachers)
}

