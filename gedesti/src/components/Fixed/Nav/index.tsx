import { Link } from "react-router-dom";
import "./style.css"
import React, { useState } from 'react'

export default function Nav() {

    const [nav, setNav] = useState(1);

    if (nav === 1) {
        return (
            <nav className="nav">
                <ul>
                    <li className="toggle" onClick={() => setNav(2)}>
                        <span className="material-symbols-outlined">
                            menu
                        </span>
                    </li>


                    <Link to="/demands">
                        <li>
                            <span className="material-symbols-outlined">
                                folder_copy
                            </span>


                        </li>
                    </Link>

                    <Link to="/proposal">
                        <li>
                            <span className="material-symbols-outlined">
                                content_paste
                            </span>


                        </li>
                    </Link>

                    <Link to="/agenda">
                        <li>
                            <span className="material-symbols-outlined">
                                file_copy
                            </span>

                        </li>
                    </Link>

                    <Link to="/minute">
                        <li>
                            <span className="material-symbols-outlined">
                                description
                            </span>

                        </li>
                    </Link>

                    <Link to="/messages">
                        <li>
                            <span className="material-symbols-outlined">
                                chat_bubble
                            </span>
                        </li>
                    </Link>

                    <Link to="/notifications">
                        <li>
                            <span className="material-symbols-outlined">
                                notifications
                            </span>
                        </li>
                    </ Link>

                    <Link to="/configuration">
                        <li>
                            <span className="material-symbols-outlined">
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
                        <span>Menu</span>
                    </li>


                    <Link to="/demands">
                        <li>
                            <span className="material-symbols-outlined">
                                folder_copy
                            </span>
                            <span>Demanda</span>


                        </li>
                    </Link>


                    <Link to="/proposal">
                        <li>
                            <span className="material-symbols-outlined">
                                content_paste
                            </span>
                            <span>Proposta</span>

                        </li>
                    </Link>

                    <Link to="/agenda">
                        <li>
                            <span className="material-symbols-outlined">
                                file_copy
                            </span>
                            <span>Pauta</span>

                        </li>
                    </Link>

                    <Link to="/minute">
                        <li>
                            <span className="material-symbols-outlined">
                                description
                            </span>
                            <span>Ata</span>

                        </li>
                    </Link>

                    <Link to="/messages">
                        <li>
                            <span className="material-symbols-outlined">
                                chat_bubble
                            </span>
                            <span>Mensagens</span>
                        </li>
                    </Link>

                    <Link to="/notifications">
                        <li>
                            <span className="material-symbols-outlined">
                                notifications
                            </span>
                            <span>Notificações</span>
                        </li>
                    </ Link>

                    <Link to="/configuration">
                        <li>
                            <span className="material-symbols-outlined">
                                settings
                            </span>
                            <span>Configurações</span>
                        </li>
                    </Link>

                    <Link to="/">
                        <li className="logout">
                            <span className="material-symbols-outlined">
                                logout
                            </span>
                            <span>Sair</span>

                        </li>
                    </Link>

                </ul>

            </nav >
        );
    }
}