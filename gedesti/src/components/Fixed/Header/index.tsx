import "./style.css"
import Language from "../Language"
import { Link } from "react-router-dom";

export default function Header(props: {
    icon: string;
    title: string;
}) {
    return (
        <header className="header">

            <div className="left">
                <Link to="/demands">
                    <img src="../imgs/weg-white.png" alt="" />
                </Link>

                <div className="title">
                    <div className="flex">
                        <span className="material-symbols-outlined">
                            {props.icon}
                        </span>
                        <span>{props.title}</span>
                    </div>

                    <div className="trace" />
                </div>
            </div>

            <div className="right">
                <Language />


                <div className="user">
                    <div className="display-grid">

                        <span className="username">Jair</span>
                    </div>

                    <img className="person" src="https://media-exp1.licdn.com/dms/image/C5603AQGoPhhWyeL2-Q/profile-displayphoto-shrink_200_200/0/1516833080377?e=2147483647&v=beta&t=O_q0eYPuycqoRh8ACadEX5gQhrVbPnomvJKRFQTIycI" alt="" />
                </div>
            </div>

        </header>

    )
}