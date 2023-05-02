import { t } from "i18next";
import Footer from "../../../Fixed/Footer";
import Title from "../../../Fixed/Search/Title";
import "./style.css"
import { Link } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import ButtonAction from "../CrateDemand/ButtonAction";
import DemandService from "../../../../services/demandService";
import Services from "../../../../services/reproachService";


export default function DisapproveDemand() {

    const navigate = useNavigate();
    const [disapprovalReason, setDisapprovalReason]: any = useState(""); // Motivo de reprovação
    const demandCode = parseInt(window.location.href.split("/")[5]);

    // Função para reprovar demanda
    function disapproveDemand() {
        Services.save(disapprovalReason, demandCode).then((response) => {
        }).catch((error) => {
            console.log(error);
        }
        );
        DemandService.updateStatus(demandCode, "Cancelled").then((response) => {
        }).catch((error) => {
            console.log(error);
        });
    }

    const nextStep = () => {
        // Função para verificar se o motivo de reprovação foi preenchido
        if (disapprovalReason === undefined || disapprovalReason === "") {
            notify();
        } else {
            disapproveDemand();
            localStorage.setItem('route', 'reprove')
            navigate('/demand/view/' + demandCode);
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

                    <Link to={"/demand/view/" + demandCode}>
                        <button className="btn-secondary">{t("return")}</button>
                    </Link>


                    <div onClick={() => { nextStep() }}>
                        <ButtonAction click="fail"></ButtonAction>
                    </div>

                </div>

                <Footer />

            </div>
            <ToastContainer position="bottom-right" newestOnTop />

        </div>
    );
}

// Notificação de erro ao tentar cadastrar sem preencher todos os campos
const notify = () => {
    toast.error('Preencha todos os campos!', {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
};