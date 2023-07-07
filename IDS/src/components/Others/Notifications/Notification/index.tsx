import { useNavigate } from "react-router"
import { t } from "i18next"
import Services from "../../../../services/notificationService"
import DemandServices from "../../../../services/demandService"
import "./style.css"
import { useEffect, useState, useContext } from "react";
import { WebSocketContext } from '../../../../services/webSocketService';
import UserContext from "../../../../context/userContext";

export default function Notification(props: any) {

    const { send, subscribe, stompClient }: any = useContext(WebSocketContext);
    const navigate = useNavigate();
    const [checked, setChecked] = useState(false)
    const { worker, setWorker } = useContext(UserContext);
    const [subscribeId, setSubscribeId] = useState(null);
    const [notifications, setNotifications]: any = useState([]); // Notificações do usuário

    useEffect(() => {
        setChecked(props?.checked)

        const newNotification = (response: any) => {
            const notificationReceived = JSON.parse(response.body);
            setNotifications((previousNotifications: any) => [...previousNotifications, notificationReceived]);
        }
        if (stompClient && !subscribeId) {
            setSubscribeId(subscribe("/notifications/" + worker.id, newNotification));
        }
    }, [props.checked, stompClient, notifications])

    // Arruma a data para o formato dd/mm/yyyy hh:mm
    function arrangeDate() {
        let data = props.date.split("T")
        let dataArrumada = data[0].split("-")
        let dataFinal = dataArrumada[2] + "/" + dataArrumada[1] + "/" + dataArrumada[0]

        if (localStorage.getItem("i18nextLng") === "en") {
            dataFinal = dataArrumada[1] + "/" + dataArrumada[2] + "/" + dataArrumada[0]
        } else if (localStorage.getItem("i18nextLng") === "es") {
            dataFinal = dataArrumada[2] + "/" + dataArrumada[1] + "/" + dataArrumada[0]
        } else if (localStorage.getItem("i18nextLng") === "pt") {
            dataFinal = dataArrumada[2] + "/" + dataArrumada[1] + "/" + dataArrumada[0]
        } else if (localStorage.getItem("i18nextLng") === "cn") {
            dataFinal = dataArrumada[2] + "/" + dataArrumada[1] + "/" + dataArrumada[0]
        }


        if (data[1] !== undefined) {
            let horario = data[1].split(":")
            dataFinal = dataFinal + " " + horario[0] + ":" + horario[1]
        }

        if (data[1] === undefined) {
            dataFinal = dataFinal + " " + "00:00"
        }

        if (data[1].split(":") < 10) {
            let horario = data[1].split(":")
            dataFinal = dataFinal + " " + "0" + horario[0] + ":" + horario[1]
        }

        if (data[1].split(":") < 2) {
            let horario = data[1].split(":")
            dataFinal = dataFinal + " " + "0" + horario[0] + ":" + "0" + horario[1]
        }


        return dataFinal
    }

    // Quando o usuário clica na notificação, ela é marcada como visualizada e ele é redirecionado para a página da notificação
    function viewNotification() {

        send("/api/notification/" + worker.id, props.id);


        if(props.view === false){
            setWorker({ ...worker, notification: worker.notification - 1 })
        }


        if (props.type !== "presentation" && props.type !== "chat") {
            if (props.type === "demand") {
                DemandServices.findById(props.description[props.description.length - 1]).then((demand: any) => {
                    navigate('/' + props.type + '/view/' + props.description[props.description.length - 1] + "?" + demand.demandVersion, { replace: true });
                })
            } else {
                navigate('/' + props.type + '/view/' + props.description[props.description.length - 1], { replace: true });
            }

        } else if (props.type === "chat") {
            navigate('/messages/message/' + props.description[props.description.length - 1], { replace: true });
        }
        else {
            navigate('/demands/1')
            localStorage.setItem("presentation", "true")
        }
    }

    return (
        <div className={"display-flex-center notification-background-" + props.view}>
            <div className="notification-checkbox">
                <label className="checkbox checkbox-message">
                    <input type="checkbox" onClick={() => { props.onClick(); setChecked(!checked) }} checked={checked} />
                    <span className="checkmark"></span>
                </label>
            </div>


            <div className={"notification-" + props.view} onClick={() => viewNotification()}>
                <div className="display-flex-center">

                    <div className="informations"  >
                        <span className="material-symbols-outlined">
                            {props.icon}
                        </span>
                        {
                            props.description.split(" ")[1] !== undefined && props.description.split(" ").length !== 3 ? (
                                <span>{t(props.description.split(" ", 1)) + props.description.split(" ")[1]}</span>
                            ) : props.description.split(" ").length === 3 ? (
                                <span>{props.description.split(" ")[0] + t(props.description.split(" ")[1]) + props.description.split(" ")[2]}</span>
                            ) : (
                                <span>{t(props.description)}</span>
                            )
                        }
                    </div>
                </div>

                <div className="date-horary" >
                    <span className="date">{arrangeDate()}</span>

                </div>

            </div>
        </div >
    );
}