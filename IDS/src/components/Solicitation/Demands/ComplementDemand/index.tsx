import { useState } from "react"
import { t } from "i18next"
import { ToastContainer } from 'react-toastify';
import { useParams } from "react-router-dom";

import Title from "../../../Fixed/Search/Title"
import Services from "../../../../services/classificationService"
import ServicesDemand from "../../../../services/demandService"
import notifyUtil from "../../../../utils/notifyUtil";
import './style.css'
import Input from "../CrateDemand/Others/Input";


export default function ComplementDemand() {

    const codeDemand:any = useParams().id;
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
                
                        <Input label="ppmCode" setValue={setPpmCode} value={ppmCode} type="text" required={true} />
                    </div>
                    <div className="display-grid">

                        <Input label="linkEpicJira" setValue={setLinkEpicJira} value={linkEpicJira} type="text" required={true} />
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
