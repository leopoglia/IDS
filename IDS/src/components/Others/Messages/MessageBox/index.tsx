import { Link } from "react-router-dom";
import "./style.css"


export default function Message(props: any) {

    console.log(props)

    return (
        <Link to="message">
            <div className={"message-" + props.bottom }>
                <div className="profile">
                    <img className="user-picture" src="https://media-exp1.licdn.com/dms/image/C5603AQGoPhhWyeL2-Q/profile-displayphoto-shrink_200_200/0/1516833080377?e=2147483647&v=beta&t=O_q0eYPuycqoRh8ACadEX5gQhrVbPnomvJKRFQTIycI" alt="" />
                    <div className="message-name">
                        <p className="username">{props.message.sender.workerName} - demanda {props.message.demandCode}</p>
                        <p className="last-message">{props.message.sender.workerName}: {props.message.message}</p>
                    </div>
                </div>

                <div className="date-horary">
                    <span className="date">{props.message.dateMessage}</span>

                </div>
            </div>
        </Link>
    );
}
