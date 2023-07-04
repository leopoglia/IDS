import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./style.css"
import ServicesDemand from "../../../../services/demandService";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import UserContext from "../../../../context/userContext";
import ServicesMessage from "../../../../services/messageService";
import { WebSocketContext } from '../../../../services/webSocketService';


export default function Message(props: any) {

    const { t } = useTranslation();
    const [requester, setRequester]: any = useState({});
    const [demandTitle, setDemandTitle]: any = useState("")
    const [imageRequester, setImageRequester]: any = useState("");
    const [demandCode, setDemandCode]: any = useState(0);
    const [sender, setSender]: any = useState({});
    const [numViewed, setNumViewed]: any = useState();
    const worker: any = useContext(UserContext).worker;

    useEffect(() => {
        ServicesDemand.findById(props.message?.demandCode).then((response: any) => {
            setRequester(response?.requesterRegistration);
            setImageRequester(response?.requesterRegistration?.workerName.substring(0, 1));
            setDemandTitle(response.demandTitle);
            setDemandCode(response.demandCode);
        })

        ServicesMessage.findSender(worker.id, props.message?.demandCode).then((response: any) => {
            setSender(response);
        })
    }, [props, numViewed]);

    useEffect(() => {

        ServicesMessage.notViewed(worker.id, demandCode).then((response: any) => {
            setNumViewed(response.length);
        })
    }, [props, demandCode]);

    return (
        <Link to={"message/" + props.message?.demandCode}>
            <div className={"message-" + props.bottom}>
                <div className="profile">
                    <div className="user-picture">{imageRequester}</div>
                    {
                        props.message.sender !== requester && requester?.workerCode !== worker.id ? (
                            <div className="message-name">
                                <p className="username">
                                    {requester?.workerName} - {demandTitle}</p>
                                {
                                    props.message?.sender?.workerCode === worker.id ? (
                                        props.message?.message === "" || props.message?.message === null ? (
                                            <p className="last-message">Você: {props.message?.attachment?.name}</p>
                                        ) : (
                                            <p className="last-message">Você: {props.message?.message}</p>
                                        )
                                    ) : (
                                        props.message?.message === "" || props.message?.message === null ? (
                                            <p className="last-message">{sender?.workerName}: {props.message?.attachment?.name}</p>
                                        ) : (
                                            <p className="last-message">{sender?.workerName}: {props.message?.message}</p>
                                        )
                                    )
                                }

                            </div>
                        ) : (
                            <div className="message-name">
                                <p className="username">
                                    {sender?.workerName} - {demandTitle}</p>
                                {
                                    props.message?.sender?.workerCode === worker.id ? (
                                        props.message?.message === "" || props.message?.message === null ? (
                                            <p className="last-message">Você: {props.message?.attachment?.name}</p>
                                        ) : (
                                            <p className="last-message">Você: {props.message?.message}</p>
                                        )
                                    ) : (
                                        props.message?.message === "" || props.message?.message === null ? (
                                            <p className="last-message">{sender?.workerName}: {props.message?.attachment?.name}</p>
                                        ) : (
                                            <p className="last-message">{sender?.workerName}: {props.message?.message}</p>
                                        )
                                    )
                                }
                            </div>
                        )
                    }
                </div>

                <div className="date-horary">
                    {
                        props.message?.viewed === null && props.message.sender.workerCode !== worker.id ? (
                            <div className="new-message-info">
                                <div className="new-message">{numViewed}</div>
                                <span className="date">{props.message?.dateMessage}</span>
                            </div>
                        ) : (
                            <span className="date">{props.message?.dateMessage}</span>

                        )
                    }

                </div>
            </div>
        </Link>
    );
}
