import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useRef, useContext } from "react";
import { ToastContainer } from "react-toastify";

import notifyUtil from "../../../../utils/notifyUtil";
import UserContext from "../../../../context/userContext";
import Services from "../../../../services/workerService";
import "./style.css";

export default function LoginForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { setWorker } = useContext(UserContext);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email: string | undefined = emailRef.current?.value;
    const password: string | undefined = passwordRef.current?.value;
    login(email, password);
  };

  async function login(email: string | undefined, password: string | undefined) {

    if (email?.includes("@")) {
      try {
        const response: any = await Services.login(email, password);
        if (response.workerOffice !== undefined) {
          const worker = {
            id: response.workerCode,
            office: response.workerOffice,
            name: response.workerName,
            email: response.corporateEmail,
            language: response.language,
            voiceCommand: response.voiceCommand,
            pounds: response.pounds,
            screenReader: response.screenReader,
            darkmode: response.darkmode,
            square: response.square,
            fontSize: response.fontSize
          };

          if (response.darkmode === true) {
              document.body.classList.toggle('darkmode');
          }

          if (response.square === false) {
              document.documentElement.style.setProperty('--r', ".375rem");
              document.documentElement.style.setProperty('--rr', "50px");
          } else {
              document.documentElement.style.setProperty('--r', "2px");
              document.documentElement.style.setProperty('--rr', "2px");
          }

          setWorker(worker);
          navigate("/demands/1");
        } else {
          notifyUtil.error(t("wrongEmailOrPassword"));
        }
      } catch (error) {
        notifyUtil.error(t("wrongEmailOrPassword"));
      }
    } else {
      notifyUtil.error(t("wrongEmailOrPassword"));
    }
  }

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <header>
        <h1>
          {t("title")}
          <b>WEG IDS</b>
        </h1>
        <img src="/images/weg-blue.png" alt="" />
      </header>

      <main>
        <div>
          <span className="material-symbols-outlined">alternate_email</span>
          <label htmlFor="email">{t("email")}</label>
          <input id="email" type="text" ref={emailRef} required />
        </div>

        <div className="password">
          <span className="material-symbols-outlined">key</span>
          <label htmlFor="password">{t("password")}</label>
          <input id="password" type="password" ref={passwordRef} required />
        </div>

        <section>
          <Link to="/forget-password">{t("forgotPassword")}</Link>
        </section>
      </main>

      <footer>
        <button>{t("login")}</button>
      </footer>

      <ToastContainer position="bottom-right" newestOnTop />
    </form>
  );
}