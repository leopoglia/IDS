import { useEffect, useState, useContext } from "react";
import { t } from "i18next";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { WebSocketContext } from '../../../../services/webSocketService';

import Footer from "../../../Fixed/Footer";
import Title from "../../../Fixed/Search/Title";
import ButtonAction from "../CrateDemand/Others/ButtonAction";
import DemandService from "../../../../services/demandService";
import Services from "../../../../services/reproachService";
import UserContext from "../../../../context/userContext";
import notifyUtil from "../../../../utils/notifyUtil";
import "./style.css"


export default function DisapproveDemand() {

    const navigate = useNavigate();
    const [disapprovalReason, setDisapprovalReason]: any = useState(""); // Motivo de reprovação
    const demandCode: any = parseInt(window.location.href.split("/")[5]);

    let demandVersion: any;
    let notification = {}; // Notificações do usuário
    const { send, subscribe, stompClient }: any = useContext(WebSocketContext);
    const [subscribeId, setSubscribeId] = useState(null);
    const [demand, setDemand]: any = useState({});
    const workerOffice: any = useContext(UserContext).worker.office;
    const worker:any = useContext(UserContext).worker;

    useEffect(() => {
        DemandService.findById(demandCode).then((response: any) => {
            setDemand(response);
        });

        if (stompClient && !subscribeId) {
            setSubscribeId(subscribe("/notifications/" + demand?.requesterRegistration?.workerCode, notification));
        }
    }, [stompClient]);

    // Função para reprovar demanda
    async function disapproveDemand() {
        await Services.save(disapprovalReason, demandCode, demandVersion, worker.id).then((response) => {
            send("/api/worker/" + demand.requesterRegistration.workerCode, setReproveNotification());
        }).catch((error) => {
            console.log(error);
        }
        );

        await DemandService.updateStatus(demandCode, "Cancelled").then((response) => {
        }).catch((error) => {
            console.log(error);
        });

        localStorage.setItem('route', 'reprove')
        navigate('/demand/view/' + demandCode + "?" + demandVersion);
    }

    const setReproveNotification = () => {
        if (workerOffice === "Analyst") {
            return notification = {
                date: new Date(),
                description: "AnalystReproveDemand " + demand.demandCode,
                worker: { workerCode: JSON.parse(demand.requesterRegistration.workerCode) },
                icon: "info",
                type: "demand",
            };
        } else if (workerOffice == "business") {
            return notification = {
                date: new Date(),
                description: "BusinessManagerReproveDemand " + demand.demandCode,
                worker: { workerCode: JSON.parse(demand.requesterRegistration.workerCode) },
                icon: "info",
                type: "demand",
            };
        } else {
            return notification = {
                date: new Date(),
                description: "ITReproveDemand " + demand.demandCode,
                worker: { workerCode: JSON.parse(demand.requesterRegistration.workerCode) },
                icon: "info",
                type: "demand",
            };
        }
    }

    DemandService.findById(demandCode).then((response: any) => {
        demandVersion = response.demandVersion;
    });

    const nextStep = () => {
        // Função para verificar se o motivo de reprovação foi preenchido
        if (disapprovalReason === undefined || disapprovalReason === "") {
            notifyUtil.error(t("fillAllFields"))
        } else {
            disapproveDemand();
        }
    }

    return (
        <div className="disapprove-demand">


            <div className="container">

                <div className="background-title">

                    <Title nav={t("demandViewDisapprove")} title={t("disapproveDemand")} />

                </div>

                <div className="box">

                    <div className="disapprove-demand">

                        <div className="display-grid">
                            <label htmlFor="">{t("reasonForDisapproval")} *</label>

                            <textarea onChange={(e) => { setDisapprovalReason(e.target.value) }} />
                        </div>
                    </div>

                </div>

                <div className="demands-footer">

                    <Link to={"/demand/view/" + demandCode + "?" + demandVersion}>
                        <button className="btn-secondary">{t("return")}</button>
                    </Link>


                    <div onClick={() => { nextStep() }}>
                        <ButtonAction click="fail"></ButtonAction>
                    </div>

                </div>

                <Footer />

            </div>

        </div>
    );
}
