import "./style.css"
import Header from "../../../../Fixed/Header"
import Nav from "../../../../Fixed/Nav"
import Title from "../../../../Fixed/Search/Title";
import ProgressBar from "../ProgressBar";
import ButtonAction from "../ButtonAction";
import { useTranslation } from "react-i18next";
import { useState } from 'react';

export default function CreateDemands3() {

    const { t } = useTranslation();

    const [demandAttachment, setdemandAttachment] = useState("");
    const [executionPeriod, setExecutionPeriod] = useState("");

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
                    <ButtonAction title="Avançar" click="avancar"></ButtonAction>
                </div>
            </div>

        </div>
    );
}