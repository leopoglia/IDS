import { useState } from "react"
import { t } from "i18next"


import Title from "../../../Fixed/Search/Title"
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import './style.css'
import { useNavigate } from "react-router-dom";
import Services from "../../../../services/classificationService"
import ServicesDemand from "../../../../services/demandService"
import ServicesNotification from "../../../../services/notificationService";
import notifyUtil from "../../../../utils/notifyUtil";


export default function ComplementDemand() {

    const navigate = useNavigate();
    const codeDemand = parseInt(window.location.href.split("/")[5])
    const [ppmCode, setPpmCode] = useState("")
    const [linkEpicJira, setLinkEpicJira] = useState("")

    function complementary() {

        if (ppmCode === "" || linkEpicJira === "") {
            notifyUtil.error(t("fillAllFields"))

        } else {
            ServicesDemand.findById(codeDemand).then((response) => {
                let demand: any = response;

                Services.updateComplement(demand.classification.classificationCode, ppmCode, linkEpicJira).then((response) => {
                    ServicesDemand.updateStatus(codeDemand, "BacklogComplement").then((response) => {
                        // ServicesNotification.save("Um analista complementou a sua demanda de código  " + demand.demandCode, demand.requesterRegistration.workerCode, "done", "demand");

                        localStorage.setItem("route", "complement");
                        window.history.back();
                    })
                })
            })
        }

    }



    return (
        <div className="complement-demand">

         


            <div className="container">


                <div className="background-title">

                    <Title nav="Demandas > Visualizar Demanda > Complementar Demanda" title="Complementar Demanda" />

                </div>


                <div className="box">
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
