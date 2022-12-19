import './style.css';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { useState, useEffect } from 'react';
import Services from '../../../services/workerService';
import React from 'react';
import { toast, ToastContainer, TypeOptions } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function Form() {
    const { t } = useTranslation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const types = ["success", "info", "warning", "error"];

    const notify = () => {
        toast.error('E-mail ou senha incorretos!', {
            position: "bottom-right",
            autoClose: 4000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    };

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

            if (response?.status === 400 || response?.status === 500) {
                notify();
            }

        } else {
            notify();
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
                    <input className={error} onChange={(e) => { setEmail(e.target.value) }} id="email" type="text" required />
                </div>


                <div>
                    <span className="material-symbols-outlined">key</span>
                    <label>{t("password")}</label>
                    <input className={error} id="password" onChange={(e) => { setPassword(e.target.value) }} type="password" required />

                </div>

                <section>
                    <div>
                        <input id="checkbox" type="checkbox" />
                        <label>{t("remember-me")}</label>
                    </div>

                    <Link to="/forget-password">
                        {t("forgotPassword")}
                    </Link>
                </section>
            </main>


            <footer>
                <button onClick={login}>{t("login")}</button>
            </footer>

            <ToastContainer position="bottom-right" newestOnTop />

        </div>
    )
}