import classModel from "../models/class.model"; 
import userModel from "../models/user.model";


// manager requests list of classs
export const getClassList = async (req,res)=>{

    const school  = await getSchoolOfManagerById(req.user.id);
      // find list of classes where school is above school
      classModel.find({
        school:school._id,

      }),
      populate('teacher')
    
}