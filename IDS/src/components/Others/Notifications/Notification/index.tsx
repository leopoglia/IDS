import "./style.css"
import Services from "../../../../services/notificationService"
import { useNavigate } from "react-router"
import { t } from "i18next"
import { useEffect, useState } from "react";


export default function Notification(props: any) {

    const navigate = useNavigate();
    const [borderBottom, setBorderBottom] = useState("");

    function arrumarData() {

        let data = props.date.split("T")
        let dataArrumada = data[0].split("-")
        let dataFinal = dataArrumada[2] + "/" + dataArrumada[1] + "/" + dataArrumada[0]


        if (localStorage.getItem("i18nextLng") == "en") {
            dataFinal = dataArrumada[1] + "/" + dataArrumada[2] + "/" + dataArrumada[0]
        } else if (localStorage.getItem("i18nextLng") == "es") {
            dataFinal = dataArrumada[2] + "/" + dataArrumada[1] + "/" + dataArrumada[0]
        } else if (localStorage.getItem("i18nextLng") == "pt") {
            dataFinal = dataArrumada[2] + "/" + dataArrumada[1] + "/" + dataArrumada[0]
        } else if (localStorage.getItem("i18nextLng") == "cn") {
            dataFinal = dataArrumada[2] + "/" + dataArrumada[1] + "/" + dataArrumada[0]
        }


        if (data[1] != undefined) {
            let horario = data[1].split(":")
            dataFinal = dataFinal + " " + horario[0] + ":" + horario[1]
        }

        if (data[1] == undefined) {
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


    function viewNotification() {
        Services.updateNotificationVisualized(props.id).then((response: any) => {
            if (props.type !== "presentation") {
                navigate('/' + props.type + '/view/' + props.description[props.description.length - 1], { replace: true });
            } else {
                navigate('/demands/1')
                localStorage.setItem("presentation", "true")
            }
        }).catch((error: any) => {
            console.log(error)
        })
    }

    return (
        <div onClick={() => viewNotification()} className={"notification-" + props.view}>

            <div className="informations">
                <span className="material-symbols-outlined">
                    {props.icon}
                </span>
                <span>{t(props.description)}</span>
            </div>

            <div className="date-horary">
                <span className="date">{arrumarData()}</span>

            </div>
        </div>
    );
}