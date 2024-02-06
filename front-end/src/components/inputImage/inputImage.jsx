<<<<<<< HEAD
import React, { useState } from "react";
import { UploadApi } from "../../api/uploadApi";
import { CircularProgress } from "@mui/material";

const InputImage = ({ value, setValue }) => {
  const [loading, setLoading] = useState(false);
=======
import React, { useRef, useState } from "react";
import { UploadApi } from "../../api/uploadApi";
import { CircularProgress, TextField } from "@mui/material";
import { toast } from "react-toastify";
import style from './inputImage.module.scss'

const InputImage = ({ value, setValue }) => {
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();
  const [fileName,setFileName]=useState("")
>>>>>>> masi

  const handleChangeFile = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setLoading(true);
    UploadApi.upload(formData)
      .then((res) => {
        setValue(res.data.link);
<<<<<<< HEAD
=======
        setFileName(file.name);
>>>>>>> masi
      })
      .catch((err) => toast.error(err))
      .finally(() => {
        setLoading(false);
      });
  };

<<<<<<< HEAD
  return (
    <div>
      <input type="file" onChange={handleChangeFile} />
=======


  return (
    <div className={style.input}>
      <input type="file" ref={inputRef} style={{display : "none"}} accept="image/* , .pdf" onChange={handleChangeFile} />
      <TextField  label="Image" onClick={()=>inputRef.current.click()} value={fileName}></TextField>
>>>>>>> masi
      {loading && <CircularProgress></CircularProgress>}
      {value && <img src={value} width={100} />}
    </div>
  );
};

export default InputImage;
