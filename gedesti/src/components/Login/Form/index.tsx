import './style.css';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { useRef } from 'react';
import Services from '../../../services/workerService';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';


export default function Form() {
    const { t } = useTranslation();
    const navigate = useNavigate();


    const emailRef: any = useRef(null);
    const passwordRef: any = useRef(null);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        login(email, password)
    };

    async function login(emailRef: any, passwordRef: any) {


        if (emailRef.includes("@")) {
            console.log(emailRef, passwordRef);

            const response: any = await Services.login(emailRef, passwordRef);

            if (response.workerOffice !== undefined) {

                const worker = {
                    id: response.workerCode,
                    office: response.workerOffice,
                    name: response.workerName,
                    email: response.corporateEmail,
                }

                localStorage.setItem("worker", JSON.stringify(worker));

                navigate('/demands');
            }

            if (response?.status === 400 || response?.status === 500 || response?.status === undefined) {
                notify();
            }
        } else {
            notify();
        }

    }

    return (
        <form onSubmit={handleSubmit} className="login-form">
            <header>
                <h1>{t("title")}<b>GEDESTI</b></h1>



                <img src="/images/weg-blue.png" alt="" />
            </header>

            <main>
                <div>
                    <span className="material-symbols-outlined">alternate_email</span>
                    <label>{t("email")}</label>
                    <input id="email" type="text" ref={emailRef} required />
                </div>


                <div className='password'>
                    <span className="material-symbols-outlined">key</span>
                    <label>{t("password")}</label>

                    <input id="password" type="password" ref={passwordRef} required />


                </div>

                <section>
                    {/* <div>
                        <input id="checkbox" type="checkbox" />
                        <label>{t("remember-me")}</label>
                    </div> */}

                    <Link to="/forget-password">
                        {t("forgotPassword")}
                    </Link>
                </section>
            </main>


            <footer>
                <button>{t("login")}</button>
            </footer>

            <ToastContainer position="bottom-right" newestOnTop />

        </form>
    )
}

// Notificação de erro ao preencher os campos obrigatórios
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
