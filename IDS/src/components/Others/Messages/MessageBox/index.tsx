import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./style.css"
import ServicesDemand from "../../../../services/demandService";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import UserContext from "../../../../context/userContext";
import ServicesMessage from "../../../../services/messageService";


export default function Message(props: any) {

    const { t } = useTranslation();
    const [requester, setRequester]: any = useState({});
    const [demandTitle, setDemandTitle]: any = useState("")
    const [imageRequester, setImageRequester]: any = useState("");
    const [sender, setSender]: any = useState({});
    let senderName = "";
    const worker: any = useContext(UserContext).worker;

    useEffect(() => {

        ServicesDemand.findById(props.message?.demandCode).then((response: any) => {
            setRequester(response.requesterRegistration);
            setImageRequester(response.requesterRegistration.workerName.substring(0, 1));
            setDemandTitle(response.demandTitle);
        })

        ServicesMessage.findSender(worker.id, props.message?.demandCode).then((response: any) => {
            setSender(response);
        })

    }, [props.message]);

    return (
        <Link to={"message/" + props.message?.demandCode}>
            <div className={"message-" + props.bottom}>
                <div className="profile">
                    <div className="user-picture">{imageRequester}</div>
                    {
                        props.message.sender !== requester && requester.workerCode !== worker.id ? (
                            <div className="message-name">
                                <p className="username">
                                    {requester.workerName} - {demandTitle}</p>
                                {
                                    props.message?.sender.workerCode === worker.id ? (
                                        <p className="last-message">Você: {props.message?.message}</p>
                                    ) : (
                                        <p className="last-message">{sender.workerName}: {props.message?.message}</p>
                                    )
                                }

                            </div>
                        ) : (
                            <div className="message-name">
                                <p className="username">
                                    {sender.workerName} - {demandTitle}</p>
                                {
                                    props.message?.sender.workerCode === worker.id ? (
                                        <p className="last-message">Você: {props.message?.message}</p>
                                    ) : (
                                        <p className="last-message">{sender.workerName}: {props.message?.message}</p>
                                    )
                                }
                            </div>
                        )
                    }
                </div>

                <div className="date-horary">
                    <span className="date">{props.message?.dateMessage}</span>

                </div>
            </div>
        </Link>
    );
}
