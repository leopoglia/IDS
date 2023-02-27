import { Link } from "react-router-dom";
import "./style.css"
import React, { useState, useEffect, useContext } from 'react'
import { useTranslation } from "react-i18next";
import ServicesNotification from "../../../services/notificationService";
import UserContext from "../../../context/userContext";

export default function Nav() {

    const { t } = useTranslation();

    const [nav, setNav] = useState(localStorage.getItem("nav") || "nav");
    const [current, setCurrent] = useState("current");
    const url = window.location.pathname.split("/")[1];
    const worker: any = useContext(UserContext).worker;
    const workerCode = worker.id;
    const office = worker.office;
    const [numNotification, setNumNotification]: any = useState(0);


    function hover(li: string): string {
        if (url === li || url === li.substring(0, li.length - 1)) {
            return "current";
        } else {
            return "";
        }

    }

    function toggleNav(): any {
        if (nav === "nav") {
            setNav("nav-open");
            localStorage.setItem("nav", "nav-open");
        } else {
            setNav("nav");
            localStorage.setItem("nav", "nav");
        }
    }

    useEffect(() => {
        if (localStorage.getItem("nav") === "nav-open") {
            setNav("nav-open");
        } else {
            setNav("nav");
        }


        ServicesNotification.findAll().then((response: any) => {
            let num = 0;

            for (let i = 0; i < response.length; i++) {
                if (response[i].worker.workerCode === workerCode) {
                    if (response[i].visualized === false) {
                        num++;
                    }

                }
            }
            setNumNotification(num);


        }).catch((error: any) => {
            console.log(error);
        });


    }, []);

    return (
        <nav className={nav}>
            <div id={nav} />
            <ul>
                <li className="toggle" onClick={() => toggleNav()}>
                    <span className="material-symbols-outlined">
                        menu
                    </span>
                </li>

                {(office === "analyst" || office === "ti") &&
                    <><Link to="/dashboard">
                        <li id={hover("demands")}>
                            <div>
                                <span className="material-symbols-outlined">
                                    monitoring
                                </span>
                                <span className="title-li">{t("dashboard")}</span>
                            </div>
                        </li>
                    </Link>
                    </>
                }

                <Link to="/demands">
                    <li id={hover("demands")}>
                        <div>
                            <span className="material-symbols-outlined">
                                draft
                            </span>
                            <span className="title-li">{t("demands")}</span>
                        </div>

                    </li>
                </Link>

                {(office === "analyst" || office === "ti") &&
                    (<><Link to="/proposals">
                        <li id={hover("proposals")}>
                            <div>
                                <span className="material-symbols-outlined">
                                    request_quote
                                </span>
                                <span className="title-li">{t("proposals")}</span>
                            </div>
                        </li>
                    </Link>

                        <Link to="/agendas">
                            <li id={hover("agendas")}>
                                <div>
                                    <span className="material-symbols-outlined">
                                        folder
                                    </span>
                                    <span className="title-li">{t("agendas")}</span>
                                </div>
                            </li>
                        </Link>

                        <Link to="/minutes">
                            <li id={hover("minutes")}>
                                <div>
                                    <span className="material-symbols-outlined">
                                        file_present
                                    </span>
                                    <span className="title-li">{t("minutes")}</span>
                                </div>
                            </li>
                        </Link>


                        <Link to="/messages">
                            <li id={hover("messages")}>
                                <div>
                                    <span className="material-symbols-outlined">
                                        chat_bubble
                                    </span>
                                    <span className="title-li">{t("messages")}</span>
                                </div>
                            </li>
                        </Link>
                    </>
                    )
                }

                <Link to="/notifications">
                    <li id={hover("notifications")}>
                        {numNotification > 0 &&
                            <li className="booble">
                                <span>{numNotification}</span>
                            </li>
                        }

                        <div>
                            <span className="material-symbols-outlined">
                                notifications
                            </span>
                            <span className="title-li">{t("notifications")}</span>
                        </div>
                    </li>
                </ Link>

                <Link to="/configuration">
                    <li id={hover("configuration")}>
                        <div>
                            <span className="material-symbols-outlined">
                                settings
                            </span>
                            <span className="title-li">{t("configurations")}</span>
                        </div>
                    </li>
                </Link>

                <Link to="/">
                    <li className="logout">
                        <div>
                            <span className="material-symbols-outlined">
                                logout
                            </span>
                            <span className="title-li">{t("logout")}</span>
                        </div>
                    </li>
                </Link>

            </ul>

        </nav >
    );

}