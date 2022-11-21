import { Link } from "react-router-dom";
import "./style.css"
import React, { useState } from 'react'

export default function Nav() {

    const [nav, setNav] = useState(1);
    const [current, setCurrent] = useState("current");
    const url = window.location.pathname.split("/")[1];

    function hover(li: string): string {
        if (url === li) {
            return "current";
        } else if (url === li) {
            return "current";
        } else if (url === li) {
            return "current";
        } else if (url === li) {
            return "current";
        } else if (url === li) {
            return "current";
        } else if (url === li) {
            return "current";
        } else if (url === li) {
            return "current";
        } else {
            return "";
        }

    }


    if (nav === 1) {
        return (
            <nav className="nav">
                <ul>
                    <li className="toggle" onClick={() => setNav(2)}>
                        <span className="material-symbols-outlined" id={hover("toggle")}>
                            menu
                        </span>
                    </li>


                    <Link to="/demands">
                        <li>
                            <span className="material-symbols-outlined" id={hover("demands")}>
                                folder_copy
                            </span>


                        </li>
                    </Link>

                    <Link to="/proposals">
                        <li>
                            <span className="material-symbols-outlined" id={hover("proposals")}>
                                content_paste
                            </span>


                        </li>
                    </Link>

                    <Link to="/agendas">
                        <li>
                            <span className="material-symbols-outlined" id={hover("agendas")}>
                                file_copy
                            </span>

                        </li>
                    </Link>

                    <Link to="/minutes">
                        <li>
                            <span className="material-symbols-outlined" id={hover("minutes")}>
                                description
                            </span>

                        </li>
                    </Link>

                    <Link to="/messages">
                        <li>
                            <span className="material-symbols-outlined" id={hover("messages")}>
                                chat_bubble
                            </span>
                        </li>
                    </Link>

                    <Link to="/notifications">
                        <li>
                            <span className="material-symbols-outlined" id={hover("notifications")}>
                                notifications
                            </span>
                        </li>
                    </ Link>

                    <Link to="/configuration">
                        <li>
                            <span className="material-symbols-outlined" id={hover("configuration")}>
                                settings
                            </span>
                        </li>
                    </Link>

                    <Link to="/">
                        <li className="logout">
                            <span className="material-symbols-outlined">
                                logout
                            </span>
                        </li>
                    </Link>

                </ul>
            </nav >
        );
    } else {
        return (
            <nav className="nav-open">
                <ul>
                    <li className="toggle" onClick={() => setNav(1)}>
                        <span className="material-symbols-outlined">
                            menu
                        </span>
                    </li>


                    <Link to="/demands">
                        <li>
                            <div id={hover("demands")}>
                                <span className="material-symbols-outlined">
                                    folder_copy
                                </span>
                                <span>Demandas</span>
                            </div>

                        </li>
                    </Link>


                    <Link to="/proposals">
                        <li>
                            <div id={hover("proposals")}>
                                <span className="material-symbols-outlined">
                                    content_paste
                                </span>
                                <span>Propostas</span>
                            </div>
                        </li>
                    </Link>

                    <Link to="/agendas">
                        <li>
                            <div id={hover("agendas")}>
                                <span className="material-symbols-outlined">
                                    file_copy
                                </span>
                                <span>Pautas</span>
                            </div>
                        </li>
                    </Link>

                    <Link to="/minutes">
                        <li>
                            <div id={hover("minutes")}>
                                <span className="material-symbols-outlined">
                                    description
                                </span>
                                <span>Atas</span>
                            </div>
                        </li>
                    </Link>

                    <Link to="/messages">
                        <li>
                            <div id={hover("messages")}>
                                <span className="material-symbols-outlined">
                                    chat_bubble
                                </span>
                                <span>Mensagens</span>
                            </div>
                        </li>
                    </Link>

                    <Link to="/notifications">
                        <li>
                            <div id={hover("notifications")}>
                                <span className="material-symbols-outlined">
                                    notifications
                                </span>
                                <span>Notificações</span>
                            </div>
                        </li>
                    </ Link>

                    <Link to="/configuration">
                        <li>
                            <div id={hover("configuration")}>
                                <span className="material-symbols-outlined">
                                    settings
                                </span>
                                <span>Configurações</span>
                            </div>
                        </li>
                    </Link>

                    <Link to="/">
                        <li className="logout">
                            <div>
                                <span className="material-symbols-outlined">
                                    logout
                                </span>
                                <span>Sair</span>
                            </div>
                        </li>
                    </Link>

                </ul>

            </nav >
        );
    }
}