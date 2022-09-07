import "./Login.css"
import Form from "./Form/Form"
import Language from "./Language/Language";

export default function Login() {
    return (
        <div className="login">
            <header>
                <Language />
            </header>
            
            <Form></Form>
        </div>
    );
}