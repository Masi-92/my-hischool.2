import React, { useState } from "react";
import contactFormStyle from "./contactForm.module.scss";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";

const FormContact = () => {
  const [formData, setFormData] = useState({
    to_name: "",
    from_name: "",
    message: "",
  });

  const { t } = useTranslation("translation", {
    keyPrefix: "contact",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmail = (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.to_name.trim() ||
      !formData.from_name.trim() ||
      !formData.message.trim()
    ) {
      toast.error("Please fill in all the fields");
      return;
    }

    // Form submission logic
    console.log("Sending email:", formData);

    // Clear form after successful submission
    setFormData({ to_name: "", from_name: "", message: "" });

    toast.success("👍 Message sent successfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  return (
    <section className={contactFormStyle.divcontainer}>
      <form onSubmit={sendEmail} className={contactFormStyle.form_container}>
        <div className={contactFormStyle.form}>
          <span className={contactFormStyle.heading}>{t(title)}</span>
          <input
            type="text"
            name="to_name"
            placeholder={t("inputName")}
            value={formData.to_name}
            onChange={handleChange}
            className={contactFormStyle.input}
          />
          <input
            type="email"
            name="from_name"
            placeholder={t("inputEmail")}
            value={formData.from_name}
            onChange={handleChange}
            className={contactFormStyle.input}
          />
          <textarea
            name="message"
            placeholder={t("inputMessage")}
            rows="10"
            cols="30"
            value={formData.message}
            onChange={handleChange}
            className={contactFormStyle.textarea}
          ></textarea>
          <div className={contactFormStyle.button_container}>
            <button type="submit" className={contactFormStyle.send_button}>
              {t("send")}
            </button>
            <div className={contactFormStyle.reset_button_container}>
              <div
                id="reset-btn"
                className={contactFormStyle.reset_button}
                onClick={() =>
                  setFormData({ to_name: "", from_name: "", message: "" })
                }
              >
               {t("resend")}
              </div>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};

export default FormContact;
