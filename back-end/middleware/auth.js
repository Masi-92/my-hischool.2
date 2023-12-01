import Jwt, { decode } from "jsonwebtoken";

export const auth = (req,res,next)=>{

    try {
        const token = req.headers.token;
Jwt.verify(token,process.env.JWT_SECRET);
req.user=decode;
next();

    } catch (error) {
res.status(401).send({msg:`access denied`})        
    }
}