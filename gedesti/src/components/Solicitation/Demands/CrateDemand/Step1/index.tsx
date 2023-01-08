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
    const [currentProblem, setcurrentProblem] = useState("");
    const [demandObjective, setDemandObjective] = useState("");
    const [costCenter, setCostCenter] = useState("");

    localStorage.setItem("demandTitle", demandTitle);
    localStorage.setItem("currentProblem", currentProblem);
    localStorage.setItem("demandObjective", demandObjective);
    localStorage.setItem("costCenter", costCenter);

    const [costsCenters, setCostsCenters]: any = useState([]);

    function addCostCenter(costCenterAdd: any) {
        costsCenters.push(costCenterAdd);
        setCostsCenters(costsCenters);
        setCostCenter("");
    }

    function deleteCostCenter(costCenter: any) {
        return () => {
            const index = costsCenters.indexOf(costCenter);
            if (index > -1) {
                costsCenters.splice(index, 1);
            }
            setCostsCenters(costsCenters);
            setCostCenter(" ");
        }
    }

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
                        <textarea onChange={(e) => { setcurrentProblem(e.target.value) }} />
                    </div>
                    {/* 
                    <TextArea label="currentSituation" required="*" onChange={(e) => { setDemandProblem(e.target.value) }}></TextArea> */}

                    <div className="text-area">
                        <label>{t("objective")} *</label>
                        <textarea onChange={(e) => { setDemandObjective(e.target.value) }} />
                    </div>

                    {/* <TextArea label="proposal" required="*" onChange={(e) => { setProposal(e.target.value) }}></TextArea> */}

                    <div className="input">
                        <label>{t("costCenter")} *</label>

                        <div className="display-flex">
                            <input onChange={(e) => { setCostCenter(e.target.value); }} type="text" />

                            <div className="btn-primary w45" onClick={() => { addCostCenter(costCenter) }}>
                                <span className="material-symbols-outlined">add</span>
                            </div>
                        </div>
                    </div>

                    {costsCenters.map((costCenter: any) => {
                        return <div className="costCenter">{costCenter}
                            <span className="material-symbols-outlined delete-cost-center" onClick={deleteCostCenter(costCenter)}>
                                delete
                            </span>
                        </div>
                    })
                    }

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