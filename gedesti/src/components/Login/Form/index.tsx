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

        if ((email !== "" || password !== "") && email.includes("@")) {
            const response: any = await Services.login(email, password);

            if (response.workerOffice !== undefined) {

                const worker = {
                    id: response.workerCode,
                    office: response.workerOffice,
                    name: response.workerName,
                    email: response.corporateEmail,
                }

                localStorage.setItem("worker", JSON.stringify(worker));

                window.location.href = "/demands";
            }
        }
    }

    return (
        <div className="login-form">
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
                <button onClick={() => { login() }}>{t("login")}</button>
            </footer>
        </div>
    )
}