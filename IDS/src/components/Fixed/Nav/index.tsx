import { Link } from "react-router-dom";
import "./style.css"
import React, { useState, useEffect, useContext } from 'react'
import { useTranslation } from "react-i18next";
import ServicesNotification from "../../../services/notificationService";
import UserContext from "../../../context/userContext";


export default function Nav() {

    const { t } = useTranslation();

    const url = window.location.pathname.split("/")[1]; // Pega a url atual e separa por "/" e pega o primeiro item do array (que é a página atual)
    const worker: any = useContext(UserContext).worker; // Pega o usuário logado
    const [numNotification, setNumNotification]: any = useState(0); // Quantidade de notificações não lidas
    const [nav, setNav] = useState(localStorage.getItem("nav") || "nav");  // Estado do menu

    // Verifica qual página está sendo acessada e retorna a classe "current" para o item do menu
    function hover(li: string): string {
        if (url === li || url === li.substring(0, li.length - 1)) {
            return "current";
        } else {
            return "";
        }
    }

    function toggleNav() {
        const newNav = nav === "nav" ? "nav-open" : "nav"; // Verifica se o menu está aberto ou fechado
        setNav(newNav); // Atualiza o estado do menu
        localStorage.setItem("nav", newNav);
    }

    useEffect(() => {
        const navState = localStorage.getItem("nav") === "nav-open" ? "nav-open" : "nav"; // Verifica se o menu está aberto ou fechado
        setNav(navState); // Atualiza o estado do menu

        // Busca as notificações do usuário
        ServicesNotification.findAll().then((response: any) => {
            let numNotificationVisualized = 0;
            let numberNotification = 0;
            for (let i = 0; i < response.length; i++) {
                if (response[i].worker.workerCode === worker.id) {
                    numberNotification++;
                    if (response[i].visualized === false) {
                        numNotificationVisualized++;
                    }

                }
            }

            if (numberNotification === 0) {
                if (numNotification === 0) {
                    ServicesNotification.save("welcomeNotification", JSON.parse(worker.id), "sentiment_satisfied", "presentation").then((response: any) => { })
                    numberNotification++;
                    numNotificationVisualized++;
                }
            }

            setNumNotification(numNotificationVisualized);
        }).catch((error: any) => {
            console.log(error);
        });
    }, [numNotification]);

    return (
        <nav className={nav}>
            <div id={nav} />
            <ul>
                <li className="toggle" onClick={() => toggleNav()}>
                    <span className="material-symbols-outlined">
                        menu
                    </span>
                </li>



                <Link to="/demands/1">
                    <li id={hover("demands")}>
                        <div>
                            <span className="material-symbols-outlined">
                                draft
                            </span>
                            <span className="title-li">{t("demands")}</span>
                        </div>

                    </li>
                </Link>

                {(worker.office === "analyst" || worker.office === "ti") &&
                    (<><Link to="/proposals/1">
                        <li id={hover("proposals")}>
                            <div>
                                <span className="material-symbols-outlined">
                                    request_quote
                                </span>
                                <span className="title-li">{t("proposals")}</span>
                            </div>
                        </li>
                    </Link>

                        <Link to="/agendas/1">
                            <li id={hover("agendas")}>
                                <div>
                                    <span className="material-symbols-outlined">
                                        folder
                                    </span>
                                    <span className="title-li">{t("agendas")}</span>
                                </div>
                            </li>
                        </Link>

                        <Link to="/minutes/1">
                            <li id={hover("minutes")}>
                                <div>
                                    <span className="material-symbols-outlined">
                                        file_present
                                    </span>
                                    <span className="title-li">{t("minutes")}</span>
                                </div>
                            </li>
                        </Link>

                        <Link to="/dashboard">
                            <li id={hover("dashboard")}>
                                <div>
                                    <span className="material-symbols-outlined">
                                        insert_chart
                                    </span>
                                    <span className="title-li">{t("dashboard")}</span>
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

                {/* <Link to="/configuration">
                    <li id={hover("configuration")}>
                        <div>
                            <span className="material-symbols-outlined">
                                settings
                            </span>
                            <span className="title-li">{t("configurations")}</span>
                        </div>
                    </li>
                </Link> */}

                <Link to="https://manualdeusuarioids.vercel.app/" target="_blank">
                    <li className="help">
                        <div>
                            <span className="material-symbols-outlined">
                                help
                            </span>
                            <span className="title-li">{t("help")}</span>
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