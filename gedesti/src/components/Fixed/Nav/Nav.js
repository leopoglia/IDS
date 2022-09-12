import "./Nav.css"

export default function Nav() {
    return (
        <nav className="nav">


            <ul>
                <li className="toggle">
                    <span className="material-symbols-outlined">
                        menu
                    </span>
                </li>


                <li>
                    <span className="material-symbols-outlined">
                        folder_copy
                    </span>
                </li>

                <li>
                    <span className="material-symbols-outlined">
                        chat
                    </span>
                </li>

                <li>
                    <span className="material-symbols-outlined">
                        notifications
                    </span>
                </li>

                <li>
                    <span className="material-symbols-outlined">
                        settings
                    </span>
                </li>

                <li className="logout">
                    <span className="material-symbols-outlined">
                        logout
                    </span>
                </li>
            </ul>

        </nav>
    );
}