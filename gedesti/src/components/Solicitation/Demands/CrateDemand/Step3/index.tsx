import "./style.css"
import Header from "../../../../Fixed/Header"
import Nav from "../../../../Fixed/Nav"
import Title from "../../../../Fixed/Search/Title";
import ProgressBar from "../ProgressBar";
import ButtonAction from "../ButtonAction";
import { useTranslation } from "react-i18next";
import { useState } from 'react';
import Services from "../../../../../services/demandService";

export default function CreateDemands3() {

    const { t } = useTranslation();

    const [demandAttachment, setdemandAttachment]: any = useState("");
    const [executionPeriod, setExecutionPeriod]: any = useState("");

    let demandTitle: any = localStorage.getItem("demandTitle");
    let currentProblem: any = localStorage.getItem("currentProblem");
    let demandObjective: any = localStorage.getItem("demandObjective");
    let costCenter: any = localStorage.getItem("costCenter");

    let realBenefits: any = localStorage.getItem("realBenefits");
    let realBenefitCode = JSON.parse(realBenefits).realBenefitCode;
    let potentialBenefits: any = localStorage.getItem("potentialBenefits");
    let potentialBenefitCode = JSON.parse(potentialBenefits).potentialBenefitCode;
    let qualitativeBenefits: any = localStorage.getItem("qualitativeBenefits");
    let qualitativeBenefitCode = JSON.parse(qualitativeBenefits).qualitativeBenefitCode;

    let worker:any = localStorage.getItem("worker");
    let workerCode = JSON.parse(worker).id;
    const [fileAttachment, setFileAttachment]:any = useState();

    async function cadastrarDemanda(){
        await Services.save(demandTitle,
            currentProblem,
            demandObjective,
            costCenter,
            "Backlog",
            20,
            executionPeriod,
            workerCode,
            realBenefitCode,
            potentialBenefitCode,
            qualitativeBenefitCode,
            fileAttachment);
            console.log(realBenefits.realBenefitCode, potentialBenefits.potentialBenefitCode, qualitativeBenefits.qualitativeBenefitCode)
    }

    const handleFileSelected = (e: any): void => {
        const files = Array.from(e.target.files)
        setFileAttachment(files[0])
      }

    return (
        <div className="create-demands-3">
            <Header icon="folder_copy" title="createDemand" />
            <Nav />

            <div className="container">
                <div className="background-title">
                    <Title nav="Demandas > Criar Demanda" title="createDemand" />

                    <ProgressBar atual="3" />
                </div>

                <div className="box">

                    <p>{t("extras")}</p>

                    <div className="frequency">
                        <label>{t("frequencyUse")}</label>
                        <input type="text" onChange={(e) => { setExecutionPeriod(e.target.value)}}/>
                    </div>

                    <label>{t("attachments")}</label>

                    <div className="attachments">
                        <input type="file" id="file" onChange={handleFileSelected}/>
                        <label htmlFor="file">
                            <span className="material-symbols-outlined">
                                upload_file
                            </span>{t("sendAttachment")}</label>
                    </div>

                </div>

                <div className="demands-footer">
                    <ButtonAction title="Voltar" click="voltar"></ButtonAction>
                    <div onClick={() => { cadastrarDemanda() }}>
                    <ButtonAction title="Avançar" click="avancar"></ButtonAction>
                    </div>
                </div>
            </div>

        </div>
    );
}