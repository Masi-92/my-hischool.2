import { Button, Card, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { SchoolsApi } from "../../../api/schoolApi";
import InputImage from "../../../components/inputImage/inputImage";
import style from "./style.module.scss";
import { useTranslation } from "react-i18next";

const SchoolForm = () => {
  const [form, setForm] = useState({
    name: "",
    address: "",
    tel: "",
    email: "",
    managerEmail: "",
    managerPassword: "",
    managerFullName: "",
    managerPhone: "",
    managerImage: "",
  });

  const { t } = useTranslation("translation", { keyPrefix: "schoolForm" });

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      SchoolsApi.getSchoolById(id).then((res) => {
        setForm({
          name: res.data.name,
          address: res.data.address,
          tel: res.data.tel,
          email: res.data.email,
          managerEmail: res.data.admin.email,
          managerFullName: res.data.admin.fullName,
          managerPhone: res.data.admin.phone,
          managerImage: res.data.admin.image,
        });
      });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      SchoolsApi.updateSchool(id, form)
        .then(() => {
          toast.success("school updated");
          navigate(-1);
        })
        .catch((err) => toast.error(err));
    } else {
      SchoolsApi.addSchool(form)
        .then(() => {
          toast.success("school created");
          navigate(-1);
        })
        .catch((err) => toast.error(err));
    }
  };

  const handleChangeImage = (image) => {
    form.managerImage = image;
    setForm({ ...form });
  };

  const handleChangeForm = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    form[name] = value;
    setForm({ ...form });
  };

  return (
    <Card className={style.card}>
      <header>
        <h1>{id ? t("titleEdit") : t("titleCreate")}</h1>
      </header>
      <form>
        <div className={style.form}>
          <h3>{t("schoolDetail")}</h3>
          <TextField
            value={form.name}
            name={"name"}
            onChange={handleChangeForm}
            label={t("inputName")}
            placeholder={t("inputName")}
          ></TextField>
          <TextField
            value={form.tel}
            name={"tel"}
            onChange={handleChangeForm}
            label={t("inputTel")}
            placeholder={t("inputTel")}
          ></TextField>
          <TextField
            value={form.email}
            name="email"
            onChange={handleChangeForm}
            label={t("inputEmail")}
            placeholder={t("inputEmail")}
          ></TextField>
          <TextField
            value={form.address}
            name="address"
            onChange={handleChangeForm}
            label={t("address")}
            multiline
            placeholder={t("address")}
          ></TextField>
        </div>
        <div className={style.form}>
          <h3>{t("managerDetail")}</h3>

          <TextField
            value={form.managerEmail}
            name="managerEmail"
            onChange={handleChangeForm}
            label={t("inputManagerEmail")}
            placeholder={t("inputManagerEmail")}
          ></TextField>
          <TextField
            value={form.managerPassword}
            name="managerPassword"
            onChange={handleChangeForm}
            label={t("inputManagerPassword")}
            placeholder={t("inputManagerPassword")}
            type="password"
          ></TextField>
          <TextField
            value={form.managerFullName}
            name="managerFullName"
            onChange={handleChangeForm}
            label={t("inputManagerFullName")}
            placeholder={t("inputManagerFullName")}
          ></TextField>
          <TextField
            value={form.managerPhone}
            name="managerPhone"
            onChange={handleChangeForm}
            label={t("inputManagerPhone")}
            placeholder={t("inputManagerPhone")}
          ></TextField>
          <InputImage value={form.managerImage} setValue={handleChangeImage} />
        </div>
        <Button
          className={style.submit}
          onClick={handleSubmit}
          type="submit"
          variant="contained"
        >
          {t("submit")}
        </Button>
      </form>
    </Card>
  );
};

export default SchoolForm;
