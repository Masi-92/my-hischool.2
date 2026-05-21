import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import style from "./landing.module.scss";
import landingImage from "../../image/Mathematics-rafiki.png";
import { useTranslation } from "react-i18next";
import { Roles } from "../../store/slice/auth.slice";

const panelByRole = {
  [Roles.MANAGER]: "/manager",
  [Roles.TEACHER]: "/teacher",
  [Roles.PARENT]: "/parent",
  [Roles.SUPER_ADMIN]: "/admin",
};

const Landing = () => {
  const navigate = useNavigate();
  const { isAuthenticated, role } = useSelector((store) => store.auth);
  const { t } = useTranslation("translation", { keyPrefix: "landing" });

  function handleLogin() {
    navigate("/login");
  }

  function handleContact() {
    navigate("/FormContact");
  }

  function handleDashboard() {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    navigate(panelByRole[role] || "/login");
  }

  function handleRegister() {
    navigate("/preRegister");
  }

  return (
    <div className={style.landing_page}>
      <header>
        <div className={style.container}>
          <iframe
            className={style.logo}
            src="https://lottie.host/embed/46e1efc7-148b-4537-92d0-1054c1188603/dGAswJ2qhq.json"
            title="logo animation"
          ></iframe>
          <ul className={style.links}>
            <li>{t("home")}</li>
            <li>{t("aboutUs")}</li>
            <li>{t("work")}</li>
            <li onClick={handleContact} role="button" tabIndex={0}>
              {t("contact")}
            </li>
            <li onClick={handleLogin} role="button" tabIndex={0}>
              {t("login")}
            </li>
          </ul>
        </div>
      </header>
      <div className={style.content}>
        <div className={style.container}>
          <div className={style.info}>
            <h1>{t("looking")}</h1>
            <p>{t("description")}</p>
            <div className={style.actions}>
              <button type="button" onClick={handleLogin}>
                {t("login")}
              </button>
              <button type="button" onClick={handleDashboard}>
                {t("dashboard")}
              </button>
              <button type="button" onClick={handleRegister}>
                {t("register")}
              </button>
            </div>
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
