import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../api/api.js";
import { AuthApi } from "../../api/authApi.js";
import { login, Roles } from "../../store/slice/auth.slice.js";
import { loginSchema } from "../../validation/auth.validation.jsx";
import style from "./login.module.scss";
import { useTranslation } from "react-i18next";

const panelByRole = {
  [Roles.MANAGER]: "/manager",
  [Roles.TEACHER]: "/teacher",
  [Roles.PARENT]: "/parent",
  [Roles.SUPER_ADMIN]: "/admin",
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation("translation", { keyPrefix: "login" });

  function handleLogin(e) {
    e.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();
    const { error } = loginSchema.validate({
      email: normalizedEmail,
      password,
    });
    if (error) return toast.warn(error.message);
    AuthApi.login(normalizedEmail, password)
      .then((res) => {
        api.defaults.headers.token = res.data.token;
        dispatch(
          login({
            token: res.data.token,
            role: res.data.role,
            fullName: res.data.fullName,
            userId: res.data.userId,
            image: res.data.image,
          })
        );
        const panel = panelByRole[res.data.role] || "/";
        navigate(panel);
      })
      .catch((err) =>
        toast.error(typeof err === "string" ? err : "Login failed")
      );
  }

  return (
    <div className={style.logo_container}>
      <div className={style.login_box}>
        <iframe
          className={style.frame}
          src="https://lottie.host/embed/46e1efc7-148b-4537-92d0-1054c1188603/dGAswJ2qhq.json"
          title="login animation"
        ></iframe>
        <form className={style.form} onSubmit={handleLogin}>
          <div className={style.user_box}>
            <input
              type="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>{t("email")}</label>
          </div>
          <div className={style.user_box}>
            <input
              type="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>{t("password")}</label>
          </div>
          <button type="submit" className={style.onclick}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            {t("submit")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
