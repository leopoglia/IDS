import "./style.css"
import Header from "../../../../Fixed/Header"
import Nav from "../../../../Fixed/Nav"
import Title from "../../../../Fixed/Search/Title";
import ProgressBar from "../ProgressBar";
import Input from "../Input";
import TextArea from "../TextArea";
import ButtonAction from "../ButtonAction";
import { useTranslation } from "react-i18next";
import { useState } from 'react';
import Services from '../../../../../services/demandService';


export default function CreateDemands1() {

    const { t } = useTranslation();

    const [demandTitle, setDemandTitle] = useState("");
    const [demandProblem, setDemandProblem] = useState("");
    const [proposal, setProposal] = useState("");
    const [costCenter, setCostCenter] = useState("");

    localStorage.setItem("demandTitle", demandTitle);
    localStorage.setItem("demandProblem", demandProblem);
    localStorage.setItem("proposal", proposal);
    localStorage.setItem("costCenter", costCenter);

    return (
        <div className="create-demands-1">
            <Header icon="folder_copy" title="createDemand" />
            <Nav />

            <div className="container">
                <div className="background-title">
                    <Title nav="Demandas > Criar Demanda" title="createDemand" />

                    <ProgressBar atual="1" />
                </div>



                <div className="box">
                    <p>{t("generalInformation")}</p>

                    <div className="input">
                        <label>{t("titleInput")} *</label>
                        <input onChange={(e) => { setDemandTitle(e.target.value) }} type="text" />
                    </div>

                    <div className="text-area">
                        <label>{t("currentSituation")} *</label>
                        <textarea onChange={(e) => { setDemandProblem(e.target.value) }} />
                    </div>
                    {/* 
                    <TextArea label="currentSituation" required="*" onChange={(e) => { setDemandProblem(e.target.value) }}></TextArea> */}

                    <div className="text-area">
                        <label>{t("proposal")} *</label>
                        <textarea onChange={(e) => { setProposal(e.target.value) }} />
                    </div>

                    {/* <TextArea label="proposal" required="*" onChange={(e) => { setProposal(e.target.value) }}></TextArea> */}

                    <div className="input">
                        <label>{t("costCenter")} *</label>
                        <input onChange={(e) => { setCostCenter(e.target.value) }} type="text" />
                    </div>

                    {/* <Input label="costCenter" required="*" onChange={(e) => { setCostCenter(e.target.value) }}></Input> */}

                </div>

                <div className="demands-footer">
                    <ButtonAction title="Voltar" click="voltar"></ButtonAction>
                    <ButtonAction title="Avançar" click="avancar"></ButtonAction>

                </div>

            </div>

        </div>
    );
}