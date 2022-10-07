import { Link } from "react-router-dom";
import "./style.css"

export default function Nav() {
    return (
        <nav className="nav">


            <ul>
                <li className="toggle">
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

                <Link to="/messages">
                    <li>
                        <span className="material-symbols-outlined">
                            chat
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
}