import { useEffect } from "react";

import Form from "./Form"
import Language from "../../Fixed/Language";
import Footer from "../../Fixed/Footer";
import "./style.css"

export default function Login() {

    useEffect(() => {
        localStorage.clear();
        localStorage.setItem('i18nextLng', 'pt');
    }, []);

    return (
        <div className="login">
            <header className="header-login">
                <Language />
            </header>

            <div className="form">
                <Form />
            </div>

            <Footer />

        </div>
    );
}