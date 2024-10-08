import {
  Button,
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ClassesApi } from "../../../api/classesApi";
import { TeachersApi } from "../../../api/teachersApi";
import style from "./style.module.scss";

const ClassForm = () => {
  const [name, setName] = useState("");
  const [teacher, setTeacher] = useState("");
  const navigate = useNavigate();
  const [teachers, setTeachers] = useState([]);
  const { t } = useTranslation("translation", { keyPrefix: "classForm" });

  useEffect(() => {
    TeachersApi.getTeachers()
      .then((res) => {
        setTeachers(res.data);
      })
      .catch((err) => toast.error(err));
  }, []);

  // read more : https://reactrouter.com/en/main/hooks/use-params
  const { classId } = useParams();

  useEffect(() => {
    if (classId)
      ClassesApi.getClassById(classId).then((res) => {
        setName(res.data.name);
        setTeacher(res.data.teacher);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (classId) {
      const body = {
        name,
        teacher,
      };
      ClassesApi.updateClass(classId, body)
        .then(() => {
          toast.success(t("classUpdated"));
          navigate(-1);
        })
        .catch((err) => toast.error(err));
    } else {
      ClassesApi.addClass({
        name,
        teacher,
      })
        .then(() => {
          toast.success(t("classAdded"));
          navigate(-1);
        })
        .catch((err) => toast.error(err));
    }
  };

  return (
    <Card className={style.card}>
      <header>
        <h1>{classId ? t("titleEdit") : t("titleCreate")}</h1>
      </header>
      <form>
        <TextField
          value={name}
          onChange={(e) => setName(e.target.value)}
          label={t("name")}
          placeholder={t("name")}
        ></TextField>
        <FormControl fullWidth>
          <InputLabel>Teacher</InputLabel>
          <Select
            value={teacher}
            label={t("teacher")}
            onChange={(e) => setTeacher(e.target.value)}
          >
            {teachers.map((item) => (
              <MenuItem value={item._id}>{item.fullName}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button onClick={handleSubmit} type="submit" variant="contained">
          {t("submit")}
        </Button>
      </form>
    </Card>
  );
};

export default ClassForm;
