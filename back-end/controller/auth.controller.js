import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js"
import { hashPassword } from "./hash.controller.js";

export async function login(req, res) {
    const { email, password } = req.body;
  
    const user = await UserModel.findOne({ email });
  
    if (!user) {
      return res.status(400).send({ message: "User does not exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ message: "Invalid password" });
    }
    const token = jwt.sign(
      { id: user._id, email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.send({ token, role: user.role, fullName: user.fullName });
  }
