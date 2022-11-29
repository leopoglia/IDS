import './style.css';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";



export default function Form() {
    const { t, i18n } = useTranslation();


    return (
        <form className="login-form">
            <header>
                <h1>{t("title")}<b>GEDESTI</b></h1>



                <img src="../imgs/weg-blue.png" alt="" />
            </header>

            <main>
                <div>
                    <label>Email</label>
                    <span className="material-symbols-outlined">alternate_email</span>
                    <input id="email" type="text" required />
                </div>


                <div>
                    <label>Senha</label>
                    <span className="material-symbols-outlined">key</span>
                    <input id="password" type="password" required />
                </div>

                <section>
                    <div>
                        <input id="checkbox" type="checkbox" />
                        <label>Lembrar-me</label>
                    </div>

                    <a href='/'>Esqueceu a senha?</a>
                </section>
            </main>

            <footer>
                <Link to="/demands">
                    <input type="submit" value={"Acessar"} />
                </Link>
            </footer>
        </form>
    )
}