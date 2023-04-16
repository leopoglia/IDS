import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useRef, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import notifyUtil from "../../../utils/notifyUtil";
import UserContext from "../../../context/userContext";
import Services from "../../../services/workerService";
import "react-toastify/dist/ReactToastify.css";

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
          };
          setWorker(worker);
          localStorage.setItem("id", JSON.stringify(worker.id));
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