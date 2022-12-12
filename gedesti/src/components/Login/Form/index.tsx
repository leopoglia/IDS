import './style.css';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";



export default function Form() {
    const { t } = useTranslation();


    return (
        <form className="login-form">
            <header>
                <h1>{t("title")}<b>GEDESTI</b></h1>



                <img src="/images/weg-blue.png" alt="" />
            </header>

            <main>
                <div>
                    <span className="material-symbols-outlined">alternate_email</span>
                    <label>{t("email")}</label>
                    <input id="email" type="text" required />
                </div>


                <div>
                    <span className="material-symbols-outlined">key</span>
                    <label>{t("password")}</label>
                    <input id="password" type="password" required />
                </div>

                <section>
                    <div>
                        <input id="checkbox" type="checkbox" />
                        <label>{t("remember-me")}</label>
                    </div>

                    <Link to="/forget-password">
                        {t("forgot-password")}
                    </Link>
                </section>
            </main>

            <footer>
                <Link to="/demands">
                    <button type="submit">{t("login")}</button>
                </Link>
            </footer>
        </form>
    )
}