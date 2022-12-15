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

    const [demandAttachment, setdemandAttachment] = useState("");
    const [executionPeriod, setExecutionPeriod]:any = useState("");

    let demandTitle:any = localStorage.getItem("demandTitle");
    let currentProblem:any = localStorage.getItem("demandProblem");
    let proposal = localStorage.getItem("proposal");
    let costCenter:any = localStorage.getItem("costCenter"); 

    let worker:any = localStorage.getItem("worker");
    let workerCode = JSON.parse(worker).id;

    async function cadastrarDemanda(){
        await Services.save(demandTitle, currentProblem, "objetivo", costCenter, "backlog", 20, executionPeriod, workerCode, 1, 1, 1, demandAttachment);
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
                        <input type="file" id="file" onChange={(e) => { setdemandAttachment(e.target.value)}}/>
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