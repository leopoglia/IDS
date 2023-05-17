import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./style.css"
import ServicesDemand from "../../../../services/demandService";
import { useTranslation } from "react-i18next";


export default function Message(props: any) {

    const { t } = useTranslation();
    const [requester, setRequester]: any = useState("");
    const [demandTitle, setDemandTitle]: any = useState("")
    const [imageRequester, setImageRequester]: any = useState("");


    useEffect(() => {

        ServicesDemand.findById(props.message?.demandCode).then((response: any) => {
            setRequester(response.requesterRegistration.workerName);
            setImageRequester(response.requesterRegistration.workerName.substring(0, 1));
            setDemandTitle(response.demandTitle);
        })

    }, [props.message]);

    return (
        <Link to={"message/" + props.message?.demandCode}>
            <div className={"message-" + props.bottom}>
                <div className="profile">
                    <div className="user-picture">{imageRequester}</div>
                    <div className="message-name">
                        <p className="username">{requester} - {demandTitle}</p>
                        <p className="last-message">{props.message?.sender.workerName}: {props.message?.message}</p>
                    </div>
                </div>

                <div className="date-horary">
                    <span className="date">{props.message?.dateMessage}</span>

                </div>
            </div>
        </Link>
    );
}
