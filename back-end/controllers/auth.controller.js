import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js"

export async function login(req,res){
    const {email, password}=req.body;

const user = await UserModel.findOne({email});

if(!user){
    return res.statue(400).send({msg:`User does not exist`})
}

const isMatch =await bcrypt.compare(password,user.password);
if(!isMatch){
    return res.statue(400).send({ message: "Invalid password" })
}
// Geheimer Schlüssel, der zum Signieren
const token =jwt.sing(
    {id: user._id, email, role: user.role},
    process.env.JWT_SECRET,
    {expiresIn:"1d"}
);
res.send({token, role: user.role, fullName: user.fullName})

}
