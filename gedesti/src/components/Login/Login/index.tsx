import "./style.css"
import Form from "../Form"
import Language from "../../Fixed/Language";
import Footer from "../../Fixed/Footer";
import { useEffect } from "react";

export default function Login() {

    useEffect(() => {
        localStorage.clear();
    }, []);


    return (
        <div className="login">
            <header className="header-login">
                <Language />
            </header>

            <div className="form">
                <Form></Form>
            </div>

            <Footer />

        </div>
    );
}