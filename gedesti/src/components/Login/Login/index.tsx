import "./style.css"
import Form from "../Form"
import Language from "../../Fixed/Language";
import Footer from "../../Fixed/Footer";

export default function Login() {
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