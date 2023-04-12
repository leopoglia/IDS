import { Link } from "react-router-dom";
import "./style.css"


export default function Message(props: any) {
    return (
        <Link to="message">
            <div className={"message-" + props.bottom }>
                <div className="profile">
                    <img className="user-picture" src="https://media-exp1.licdn.com/dms/image/C5603AQGoPhhWyeL2-Q/profile-displayphoto-shrink_200_200/0/1516833080377?e=2147483647&v=beta&t=O_q0eYPuycqoRh8ACadEX5gQhrVbPnomvJKRFQTIycI" alt="" />
                    <div className="message-name">
                        <p className="username">Jair - Analista da demanda 01</p>
                        <p className="last-message">Eduarda: Demanda ok!</p>
                    </div>
                </div>

                <div className="date-horary">
                    <span className="date">11/05/2022</span>
                    <span className="horary">19:30</span>

                </div>
            </div>
        </Link>
    );
}
