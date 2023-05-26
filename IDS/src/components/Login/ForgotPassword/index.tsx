import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";

import Language from '../../Fixed/Language';
import Footer from '../../Fixed/Footer';
import './style.css';

export default function Form() {
    const { t } = useTranslation();

    return (

        <div className="login">
            <header className="header-login">
                <Language />
            </header>

            <div className="form">
                <form className="login-form">
                    <header>
                        <h1>{t("forgotPassword")}</h1>



                        <img src="/images/weg-blue.png" alt="" />
                    </header>

                    <main>
                        <div>
                            <span className="material-symbols-outlined">alternate_email</span>
                            <label>{t("email")}</label>
                            <input id="email" type="text" required />
                        </div>
                    </main>

                    <footer>
                        <Link to="/demands/1">
                            <button type="submit">{t("send")}</button>
                        </Link>
                    </footer>
                </form>
            </div>

            <Footer />

        </div>

    )
}