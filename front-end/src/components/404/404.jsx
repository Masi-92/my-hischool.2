import React from "react";

import "./404.scss";
import { useTranslation } from "react-i18next";

const ErrorPage = () => {
  const { t } = useTranslation("translation", { keyPrefix: "404" });

  return (
    <section className="page_404">
      <div className="container">
        <div className="row">
          <div className="shahab">
            <div className="shahab1">
              <div className="four_zero_four_bg">
                <h1 className="text-center">404</h1>
              </div>

              <div className="contant_box_404">
                <h3 className="h2">{t("title")}</h3>
                <p>{t("description")}</p>
                <a href="/" className="link_404">
                  {t("cta")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
