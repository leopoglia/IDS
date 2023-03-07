import { t } from "i18next";
import { Link } from "react-router-dom";


export default function Modal() {



    return (
        <div className="modal">

            <Link to="/configuration">
                <div className="li li-settings">
                    <span className="material-symbols-outlined">
                        settings
                    </span>
                    <span>
                        {t("configurations")}
                    </span>
                </div>
            </Link>

            <Link to="/">
                <div className="li">
                    <span className="material-symbols-outlined">
                        logout
                    </span>
                    <span>
                        {t("logout")}
                    </span>
                </div>
            </Link>

        </div>
    )
}