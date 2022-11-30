import './style.css';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import Language from '../../Fixed/Language';
import Footer from '../../Fixed/Footer';

export default function Form() {
    const { t, i18n } = useTranslation();


    return (

        <div className="login">
            <header className="header-login">
                <Language />
            </header>

            <div className="form">
                <form className="login-form">
                    <header>
                        <h1>Esqueceu a senha</h1>



                        <img src="../imgs/weg-blue.png" alt="" />
                    </header>

                    <main>
                        <div>
                            <span className="material-symbols-outlined">alternate_email</span>
                            <label>{t("email")}</label>
                            <input id="email" type="text" required />
                        </div>
                    </main>

                    <footer>
                        <Link to="/demands">
                            <button type="submit">Enviar</button>
                        </Link>
                    </footer>
                </form>        </div>

            <Footer />

        </div>

    )
}