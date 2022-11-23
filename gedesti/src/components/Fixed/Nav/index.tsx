import { Link } from "react-router-dom";
import "./style.css"
import React, { useState, useEffect } from 'react'

export default function Nav() {

    const [nav, setNav] = useState("nav");
    const [current, setCurrent] = useState("current");
    const url = window.location.pathname.split("/")[1];

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
        } else {
            setNav("nav");
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


                <Link to="/demands">
                    <li>
                        <div id={hover("demands")}>
                            <span className="material-symbols-outlined">
                                draft
                            </span>
                            <span className="title-li">Demandas</span>
                        </div>

                    </li>
                </Link>


                <Link to="/proposals">
                    <li>
                        <div id={hover("proposals")}>
                            <span className="material-symbols-outlined">
                                edit_document
                            </span>
                            <span className="title-li">Propostas</span>
                        </div>
                    </li>
                </Link>

                <Link to="/agendas">
                    <li>
                        <div id={hover("agendas")}>
                            <span className="material-symbols-outlined">
                                folder
                            </span>
                            <span className="title-li">Pautas</span>
                        </div>
                    </li>
                </Link>

                <Link to="/minutes">
                    <li>
                        <div id={hover("minutes")}>
                            <span className="material-symbols-outlined">
                                file_present
                            </span>
                            <span className="title-li">Atas</span>
                        </div>
                    </li>
                </Link>

                <Link to="/messages">
                    <li>
                        <div id={hover("messages")}>
                            <span className="material-symbols-outlined">
                                chat_bubble
                            </span>
                            <span className="title-li">Mensagens</span>
                        </div>
                    </li>
                </Link>

                <Link to="/notifications">
                    <li>
                        <div id={hover("notifications")}>
                            <span className="material-symbols-outlined">
                                notifications
                            </span>
                            <span className="title-li">Notificações</span>
                        </div>
                    </li>
                </ Link>

                <Link to="/configuration">
                    <li>
                        <div id={hover("configuration")}>
                            <span className="material-symbols-outlined">
                                settings
                            </span>
                            <span className="title-li">Configurações</span>
                        </div>
                    </li>
                </Link>

                <Link to="/">
                    <li className="logout">
                        <div>
                            <span className="material-symbols-outlined">
                                logout
                            </span>
                            <span className="title-li">Sair</span>
                        </div>
                    </li>
                </Link>

            </ul>

        </nav >
    );

}