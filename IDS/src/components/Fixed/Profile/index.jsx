import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { WebSocketContext } from "../../../services/webSocketService";
import UserContext from "../../../context/userContext";
import ServicesWorker from "../../../services/workerService";
import "./style.css";


export default function Profile(props) {

    const [isUserOnline, setIsUserOnline] = useState(false);
    const { worker } = useContext(UserContext);
    const { send, subscribe, stompClient } = useContext(WebSocketContext);


    useEffect(() => {
        if (stompClient) {
            if (props.workerCode !== worker.id) {
                ServicesWorker.isUserOnline(props.workerCode).then((response) => {
                    setIsUserOnline(response);
                });
            } else {
                ServicesWorker.isUserOnline(props.workerCode).then((response) => {
                    setIsUserOnline(response);
                });
            }
        }
    }, [stompClient, props]);


    return (
        <Link className="profile-view" to={"/profile/" + props.workerCode}>
            <div className='person'>
                <span className="user-picture">
                    {props.image}
                </span>
            </div>

            <div className="message-name">
                <span className="username">{props.workerName}</span>
                {isUserOnline ? (
                    <div className="online">
                        <span>online</span>
                    </div>
                ) : (
                    <div className="offline">
                        <span>offline</span>
                    </div>
                )
                }

            </div>
        </Link>
    )
}