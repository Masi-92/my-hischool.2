import { Button, Card, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import InputImage from "../../components/inputImage/inputImage";
import style from "./editProfile.module.scss";
import { AuthApi } from "../../api/authApi";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { editProfileStore } from "../../store/slice/auth.slice";
import { useTranslation } from "react-i18next";

const EditProfile = () => {
  const {t} = useTranslation("translation",{keyPrefix : "editProfile"})
  const [formEditProfile, setFormEditProfile] = useState({
    fullName: "",
    phone: "",
    image: "",
  });

  const [formChangePassword, setFormChangePassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    AuthApi.getProfile()
      .then((res) => {
        setFormEditProfile({
          fullName: res.data.fullName,
          phone: res.data.phone,
          image: res.data.image,
        });
      })
      .catch((err) => toast.error(err));
  }, []);

  const handleChangeEditProfileForm = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    formEditProfile[name] = value;
    setFormEditProfile({ ...formEditProfile });
  };
  const handleChangeChangePasswordForm = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    formChangePassword[name] = value;
    setFormChangePassword({ ...formChangePassword });
  };

  const handleChangeImage = (value) => {
    formEditProfile.image = value;
    setFormEditProfile({ ...formEditProfile });
  };

  const handleEditProfile = () => {
    AuthApi.editProfile(formEditProfile)
      .then((res) => {
        toast.success(t("profileUpdated"));
        dispatch(editProfileStore(formEditProfile));
      })
      .catch((err) => toast.error(err));
  };

  const handleSubmitChangePassword = () => {
    if (
      formChangePassword.newPassword !== formChangePassword.confirmNewPassword
    )
      return toast.warn(t("passwordNotMatch"));

    AuthApi.changePassword(
      formChangePassword.oldPassword,
      formChangePassword.newPassword
    )
      .then((res) => {
        toast.success(t("passwordUpdated"));
      })
      .catch((err) => {
        toast.error(err);
      });
  };
  return (
    <div className={style.container}>
      <Card className={style.card}>
        <h3>{t("title")}</h3>
        <TextField
          name="fullName"
          onChange={handleChangeEditProfileForm}
          value={formEditProfile.fullName}
          label={t("fullName")}
        ></TextField>
        <TextField
          name="phone"
          onChange={handleChangeEditProfileForm}
          value={formEditProfile.phone}
          label={t("phone")}
        ></TextField>
        <InputImage
          setValue={handleChangeImage}
          value={formEditProfile.image}
        />
        <Button
          className={style.submit}
          variant="contained"
          onClick={handleEditProfile}
        >
          {t("save")}
        </Button>
      </Card>
      <Card className={style.card}>
        <h3>{t("changePasswordTitle")}</h3>
        <TextField
          name="oldPassword"
          type="password"
          onChange={handleChangeChangePasswordForm}
          value={formChangePassword.oldPassword}
          label={t("oldPassword")}
        ></TextField>
        <TextField
          name="newPassword"
          type="password"
          onChange={handleChangeChangePasswordForm}
          value={formChangePassword.newPassword}
          label={t("newPassword")}
        ></TextField>
        <TextField
          name="confirmNewPassword"
          type="password"
          onChange={handleChangeChangePasswordForm}
          value={formChangePassword.confirmNewPassword}
          label={t("confirmNewPassword")}
        ></TextField>
        <Button
          className={style.submit}
          onClick={handleSubmitChangePassword}
          variant="contained"
        >
          {t("save")}
        </Button>
      </Card>
    </div>
  );
};

export default EditProfile;
