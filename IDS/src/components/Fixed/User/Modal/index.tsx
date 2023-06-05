import { t } from "i18next";
import { Link } from "react-router-dom";

export default function Modal(props: any) {

    return (
        <div className="modal">

            {props.type === "notification" ?

                (
                    <>
                    
                        <div className="li li-settings">
                            <span className="material-symbols-outlined">
                                visibility
                            </span>
                            <span>
                                {t("viewSelects")}
                            </span>
                        </div>

                        <div className="li li-settings">
                            <span className="material-symbols-outlined">
                                close
                            </span>
                            <span>
                                {t("removeSelects")}
                            </span>
                        </div>
                    </>
                ) :
                (
                    <>
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
                    </>
                )

            }


        </div>
    )
}