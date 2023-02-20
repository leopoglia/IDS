import React, { useState } from "react"
import { t } from "i18next"
import Header from "../../../Fixed/Header"
import Nav from "../../../Fixed/Nav"
import Title from "../../../Fixed/Search/Title"
import SelectSizeDemand from "../RankDemand/SelectSizeDemand"
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import './style.css'
import { useNavigate } from "react-router-dom";
import Services from "../../../../services/classificationService"
import ServicesDemand from "../../../../services/demandService"
import ServicesNotification from "../../../../services/notificationService";

export default function ComplementDemand() {

    const navigate = useNavigate();
    const codeDemand = parseInt(window.location.href.split("/")[5])
    const [ppmCode, setPpmCode] = useState("")
    const [linkEpicJira, setLinkEpicJira] = useState("")
    const [deadlineDemand, setDeadlineDemand] = useState("")

    function complementary() {

        if (ppmCode === "" || linkEpicJira === "" || deadlineDemand === "") {
            notifyError();
        } else {
            ServicesDemand.findById(codeDemand).then((response) => {
                let demand:any = response;

                Services.updateComplement(demand.classification.classificationCode, ppmCode, linkEpicJira, deadlineDemand).then((response) => {
                    ServicesDemand.updateStatus(codeDemand, "BacklogComplement").then((response) => {
                        ServicesNotification.save("Um analista complementou a sua demanda de código  " + demand.demandCode, demand.requesterRegistration.workerCode, "done", "demand");

                        localStorage.setItem("route", "complement");
                        navigate("/demand/view/" + codeDemand)
                    })
                })
            })
        }

    }



    return (
        <div className="complement-demand">

            <Header />

            <Nav />


            <div className="container">


                <div className="background-title">

                    <Title nav="Demandas > Visualizar Demanda > Complementar Demanda" title="Complementar Demanda" />

                </div>


                <div className="box">
                    <div className="display-grid-select">
                        <label htmlFor="">{t("deadlineDemand")} *</label>
                        <SelectSizeDemand setDeadlineDemand={setDeadlineDemand} type="deadline" />
                    </div>
                    <div className="display-grid">
                        <label htmlFor="">{t("ppmCode")} *</label>
                        <input onChange={(e) => setPpmCode(e.target.value)} type="text" />
                    </div>
                    <div className="display-grid">
                        <label htmlFor="">{t("linkEpicJira")} *</label>
                        <input onChange={(e) => setLinkEpicJira(e.target.value)} type="text" />
                    </div>




                </div>
                <div className="display-flex-end">

                    <button onClick={() => complementary()} className="btn-primary">{t("complementary")}</button>
                </div>
            </div>

            <ToastContainer position="bottom-right" newestOnTop />

        </div>
    )
}

// Função para notificar o usuário que a classificação foi cadastrada
const notifyError = () => {
    toast.error('Preencha todos os campos!', {
        position: "bottom-right",
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
};