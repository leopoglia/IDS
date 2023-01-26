import "./style.css"
import Header from "../../../../Fixed/Header"
import Nav from "../../../../Fixed/Nav"
import Title from "../../../../Fixed/Search/Title";
import ProgressBar from "../ProgressBar";
import ButtonAction from "../ButtonAction";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from 'react';
import Services from "../../../../../services/demandService";

export default function CreateDemands3() {

    const { t } = useTranslation();

    const [demandAttachment, setdemandAttachment]: any = useState("");
    const [executionPeriod, setExecutionPeriod]: any = useState("");
    const [demand, setDemand]: any = useState("");
    const [fileAttachment, setFileAttachment]: any = useState();



    useEffect(() => {
        setDemand(JSON.parse(localStorage.getItem("demand") || "{}"));
    }, []);

    async function cadastrarDemanda() {
        let demandTitle: any = demand.titleInput;
        let currentProblem: any = demand.currentSituation
        let demandObjective: any = demand.objective
        let costCenter: any = demand.costCenter

        let realBenefits: any = localStorage.getItem("realBenefits");
        let realBenefitCode = JSON.parse(realBenefits).realBenefitCode;
        let potentialBenefits: any = localStorage.getItem("potentialBenefits");
        let potentialBenefitCode = JSON.parse(potentialBenefits).potentialBenefitCode;
        let qualitativeBenefits: any = localStorage.getItem("qualitativeBenefits");
        let qualitativeBenefitCode = JSON.parse(qualitativeBenefits).qualitativeBenefitCode;

        let worker: any = localStorage.getItem("worker");
        let workerCode = JSON.parse(worker).id;



        let actualDate = new Date().getUTCDate() + "/" + (new Date().getUTCMonth() + 1) + "/" + new Date().getUTCFullYear();

        console.log("demandTitle -> ", demandTitle);
        console.log("currentProblem -> ", currentProblem);
        console.log("demandObjective -> ", demandObjective);
        console.log("costCenter -> ", costCenter);
        console.log("realBenefitCode -> ", realBenefitCode);
        console.log("potentialBenefitCode -> ", potentialBenefitCode);
        console.log("qualitativeBenefitCode -> ", qualitativeBenefitCode);
        console.log("workerCode -> ", workerCode);
        console.log("actualDate -> ", actualDate);
        console.log("demandAttachment -> ", demandAttachment);
        console.log("executionPeriod -> ", executionPeriod);
        console.log("fileAttachment -> ", fileAttachment);


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
            fileAttachment,
            actualDate
        );
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

                    <p>{t("additionals")}</p>

                    <div className="frequency">
                        <label>{t("frequencyUse")}</label>
                        <input type="text" onChange={(e) => { setExecutionPeriod(e.target.value) }} />
                    </div>

                    <label>{t("attachments")}</label>

                    <div className="attachments">
                        <input type="file" id="file" onChange={handleFileSelected} />
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