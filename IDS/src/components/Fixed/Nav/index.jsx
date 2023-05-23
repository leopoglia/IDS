import { Link, useNavigate } from "react-router-dom";
import "./style.css"
import { useState, useEffect, useContext } from 'react'
import { useTranslation } from "react-i18next";
import ServicesNotification from "../../../services/notificationService";
import { WebSocketContext } from '../../../services/webSocketService';
import ServicesMessages from "../../../services/messageService";
import UserContext from "../../../context/userContext";
import { Tooltip } from "@mui/material";


export default function Nav() {

    const { t } = useTranslation();
    const navigate = useNavigate();

    const url = window.location.pathname.split("/")[1]; // Pega a url atual e separa por "/" e pega o primeiro item do array (que é a página atual)
    const worker = useContext(UserContext).worker; // Pega o usuário logado
    const [numNotification, setNumNotification] = useState(0); // Quantidade de notificações não lidas
    let [notification, setNotification] = useState([]); // Notificações do usuário
    const [nav, setNav] = useState(localStorage.getItem("nav") || "nav");  // Estado do menu
    const [messagesOn, setMessagesOn] = useState(false); // Se tiver true, mostra as mensagens para o solicitante
    const [subscribeId, setSubscribeId] = useState(null);

    const { send, subscribe, stompClient } = useContext(WebSocketContext);

    // Verifica qual página está sendo acessada e retorna a classe "current" para o item do menu
    function hover(li) {
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
        const navState = localStorage.getItem("nav") === "nav-open" ? "nav-open" : "nav";
        setNav(navState);

        ServicesNotification.findAll()
            .then((response) => {
                let numNotificationVisualized = 0;
                let numberNotification = 0;
                const newNotifications = [];

                for (let i = 0; i < response.length; i++) {
                    if (response[i].worker.workerCode === worker.id) {
                        numberNotification++;
                        if (response[i].visualized === false) {
                            numNotificationVisualized++;
                        }
                        newNotifications.push(response[i]);
                    }
                }

                setNotification(newNotifications);

                if (stompClient && !subscribeId) {
                    setSubscribeId(subscribe("/notifications/" + worker.id, newNotifications));
                }

                if (numberNotification === 0) {
                    if (numNotification === 0) {
                        send("/api/worker/" + worker.id, newNotifications);
                        setDefaultNotification();
                        numberNotification++;
                        numNotificationVisualized++;
                    }
                }

                setNumNotification(numNotificationVisualized);
            })
            .catch((error) => {
                console.log(error);
            });

    }, [notification, stompClient]);

    function createNotification(event) {
        event.preventDefault();
        send("/api/worker/" + worker.id, notification);
        setDefaultNotification();
    }

    const setDefaultNotification = () => {
        setNotification({
            date: new Date(),
            description: "welcomeNotification",
            worker: { workerCode: JSON.parse(worker.id) },
            icon: "sentiment_satisfied",
            type: "presentation",
        })
    }

    useEffect(() => {
        if (worker.office === "requester") {
            ServicesMessages.findAllByDemandRequester(worker.id).then((response) => {
                if (response === true) {

                    console.log(response)
                    setMessagesOn(response)
                }
            }).catch((error) => {
                console.log(error);
            });
        }
    }, [worker.office]);


    function logout() {

        localStorage.clear();
        navigate("/");

        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i];
            const nomeCookie = cookie.split('=')[0];
            document.cookie = nomeCookie + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'; // Define a data de expiração do cookie para uma data passada
        }
    }

    return (
        <nav className={nav}>
            <div id={nav} />
            <ul>
                <li className="toggle" onClick={() => toggleNav()}>
                    <span className="material-symbols-outlined">
                        menu
                    </span>
                </li>


                <Tooltip title={nav !== "nav-open" ? t("demands") : ""} placement="right">
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
                </Tooltip>

                {(worker.office === "analyst" || worker.office === "ti") &&
                    (
                        <>
                            <Tooltip title={nav !== "nav-open" ? t("proposals") : ""} placement="right">
                                <Link to="/proposals/1">
                                    <li id={hover("proposals")}>
                                        <div>
                                            <span className="material-symbols-outlined">
                                                request_quote
                                            </span>
                                            <span className="title-li">{t("proposals")}</span>
                                        </div>
                                    </li>
                                </Link>
                            </Tooltip>

                            <Tooltip title={nav !== "nav-open" ? t("agendas") : ""} placement="right">
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
                            </Tooltip>

                            <Tooltip title={nav !== "nav-open" ? t("minutes") : ""} placement="right">
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
                            </Tooltip>

                            <Tooltip title={nav !== "nav-open" ? t("dashboard") : ""} placement="right">
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
                            </Tooltip>
                        </>
                    )
                }

                {(worker.office === "analyst" || worker.office === "ti" || messagesOn) &&
                    (
                        <Tooltip title={nav !== "nav-open" ? t("messages") : ""} placement="right">
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
                        </Tooltip>
                    )
                }




                <Tooltip title={nav !== "nav-open" ? t("notifications") : ""} placement="right">

                    <Link to={"/notifications/" + worker.id}>
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
                </Tooltip>


                <Link to="https://manualdeusuarioids.vercel.app/" target="_blank">
                    <Tooltip title={nav !== "nav-open" ? t("help") : ""} placement="right">

                        <li className="help">
                            <div>
                                <span className="material-symbols-outlined">
                                    help
                                </span>
                                <span className="title-li">{t("help")}</span>
                            </div>
                        </li>
                    </Tooltip>
                </Link>

                {/* <Link to="/"> */}
                <Tooltip onClick={() => { logout() }} title={nav !== "nav-open" ? t("logout") : ""} placement="right">
                    <li className="logout">
                        <div>
                            <span className="material-symbols-outlined">
                                logout
                            </span>
                            <span className="title-li">{t("logout")}</span>
                        </div>
                    </li>
                </Tooltip>
                {/* </Link> */}

            </ul>

        </nav >
    );

}