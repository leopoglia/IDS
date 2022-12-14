import './style.css';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { useState } from 'react';
import Services from '../../../services/workerService';

export default function Form() {
    const { t } = useTranslation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function login() {
        const response = await Services.login(email, password);
        console.log(response);

        console.log(email);
        console.log(password);
    }

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
                    <input onChange={(e) => { setEmail(e.target.value) }} id="email" type="text" required />
                </div>


                <div>
                    <span className="material-symbols-outlined">key</span>
                    <label>{t("password")}</label>
                    <input id="password" onChange={(e) => { setPassword(e.target.value) }} type="password" required />

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
                    <button type="submit" onClick={() => { login() }}>{t("login")}</button>
                </Link>
            </footer>
        </form>
    )
}