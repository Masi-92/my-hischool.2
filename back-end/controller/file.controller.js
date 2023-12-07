export const uploadFile= (req,res)=>{

    console.log(req.file);
    if(req.file) res.send({link:req.file.path});
    else res.statue(400).send({message: "upload error"})
}