import "./style.css"
import Language from "../Language"
import { Link } from "react-router-dom";
import User from "../User";

export default function Header() {

    return (
        <header className="header">
            <div className="left">
                <Link to="/demands/1">
                    <img src="/images/weg-white.png" alt="logo" />
                </Link>
            </div>

            <div className="right">
                <Language />
                <User />
            </div>
        </header>
    )
}