import React from "react";
import { useNavigate } from "react-router-dom";
import style from "./landing.module.scss";
import landingImage from "../../image/Mathematics-rafiki.png";
import { useTranslation } from "react-i18next";

const Landing = () => {
  const navigate = useNavigate();
  const { t } = useTranslation("translation", { keyPrefix: "landing" });

  function handleLogin() {
    navigate("/login");
  }
  function handleContact() {
    navigate("/FormContact");
  }
  return (
    <div className={style.landing_page}>
      <header>
        <div className={style.container}>
          <iframe
            className={style.logo}
            src="https://lottie.host/embed/46e1efc7-148b-4537-92d0-1054c1188603/dGAswJ2qhq.json"
          ></iframe>
          <ul className={style.links}>
            <li>{t("home")}</li>
            <li>{t("aboutUs")}</li>
            <li>{t("work")}</li>
            <li onClick={handleContact}>{t("contact")}</li>
            <li onClick={handleLogin}>{t("getStarted")}</li>
          </ul>
        </div>
      </header>
      <div className={style.content}>
        <div className={style.container}>
          <div className={style.info}>
            <h1>{t("looking")}</h1>
            <p>{t("description")}</p>
            <button>{t("button")}</button>
          </div>
          <div className={style.image_landing}>
            <img src={landingImage} alt="Landing" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
