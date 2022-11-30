import "./style.css"
import Language from "../Language"
import { Link } from "react-router-dom";
import User from "../User";
import { useTranslation } from "react-i18next";

export default function Header(props: {
    icon: string;
    title: string;
}) {

    const { t, i18n } = useTranslation();

    const title = () => {
        if (props.title === "Demandas") {
            return t("demands")
        }
    }

    return (
        <header className="header">

            <div className="left">
                <Link to="/demands">
                    <img src="../imgs/weg-white.png" alt="" />
                </Link>

                <div className="title">
                    <div className="flex">
                        <span className="material-symbols-outlined">
                            {props.icon}
                        </span>
                        <span>{title()}</span>
                    </div>

                    <div className="trace" />
                </div>
            </div>

            <div className="right">
                <Language />

                <User />


            </div>

        </header>

    )
}