import "./style.css"
import Language from "../Language"
import { Link } from "react-router-dom";
import User from "../User";
import { useTranslation } from "react-i18next";

export default function Header() {

    const { t } = useTranslation();

    return (
        <header className="header">


            <div className="left">
                <Link to="/demands/1">
                    <img src="/images/weg-white.png" alt="logo" />
                </Link>

                {/* <div className="title">
                    <div className="flex">
                        <span className="material-symbols-outlined">
                            {props.icon}
                        </span>
                        <span>{t(props.title)}</span>
                    </div>

                    <div className="trace" />
                </div> */}
            </div>

            <div className="right">
                <Language />

                <User />


            </div>

        </header>

    )
}