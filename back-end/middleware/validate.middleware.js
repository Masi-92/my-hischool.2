import { Schema } from "mongoose";

export const validate = (Schema)=>(req,res,next)=>{
    const {error} = schema.validate(req.body)
    if(error)
    return res.status(400).send({message:error.message})
 next();
}