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
import Services from '../../../../../services/costCenterService';

export default function CreateDemands1() {

    const { t } = useTranslation();

    const [demandTitle, setDemandTitle] = useState("");
    const [currentProblem, setcurrentProblem] = useState("");
    const [demandObjective, setDemandObjective] = useState("");
    const [costCenter, setCostCenter] = useState("");
    const [costsCenters, setCostsCenters]: any = useState([]);
    const [idCostCenter, setIdCostCenter]: any = useState([]);

    function addCostCenter(costCenterAdd: any) {
        if (costCenterAdd === "" || costCenterAdd === " ") {
            alert("Digite um centro de custo");
        } else {
            createCostCenter();
            costsCenters.push(costCenterAdd);
            setCostsCenters(costsCenters);

            setCostCenter("");
        }
    }

    function deleteCostCenter(costCentere: any) {
        return () => {
            const index = costsCenters.indexOf(costCentere);
            if (index > -1) {
                costsCenters.splice(index, 1);
            }
            setCostsCenters(costsCenters);

            if (costCenter === " ") {
                setCostCenter("");
            } else {
                setCostCenter(" ");
            }

            console.log("costsCenters 2 -> ", costCenter);
        }
    }

    async function createCostCenter() {
        // criar os cost center no banco
        let service: any = await Services.save(costCenter);
        console.log("retorno -> ", service);
        idCostCenter.push(service.costCenterCode);
    }

    const handleChange = (event: any, type: String) => {

        let demand = {
            titleInput: "",
            currentSituation: "",
            objective: "",
            costCenter: ""
        };


        if (localStorage.getItem("demand") !== null) {
            demand = JSON.parse(localStorage.getItem("demand") || "{}");
        }

        switch (type) {
            case "titleInput":
                demand.titleInput = event.target.value;
                break;
            case "currentSituation":
                demand.currentSituation = event.target.value;
                break;
            case "objective":
                demand.objective = event.target.value;
                break;
            case "costCenter":
                setCostCenter("");
                demand.costCenter = costsCenters;
                break;
            default:
                demand.titleInput = event.target.value;
        }


        localStorage.setItem("demand", JSON.stringify(demand));
    }

    const addIDCostCenter = () => {
        localStorage.getItem("demand");
        let demand = JSON.parse(localStorage.getItem("demand") || "{}");
        demand.costCenter = idCostCenter;
        localStorage.setItem("demand", JSON.stringify(demand));
    }
    


    return (
        <div className="create-demands-1">
            <Header icon="folder_copy" title="createDemand" />
            <Nav />

            <div className="container">
                <div className="background-title">
                    <Title nav="demandsCreateDemand" title="createDemand" />

                    <ProgressBar atual="1" />
                </div>



                <div className="box">
                    <p>{t("generalInformation")}</p>

                    <div className="input">
                        <label>{t("titleInput")} *</label>
                        <input onChange={(e) => { handleChange(e, 'titleInput'); }} type="text" />
                    </div>

                    <div className="text-area">
                        <label>{t("currentSituation")} *</label>
                        <textarea onChange={(e) => { handleChange(e, 'currentSituation'); }} />
                    </div>
                    {/* 
                    <TextArea label="currentSituation" required="*" onChange={(e) => { setDemandProblem(e.target.value) }}></TextArea> */}

                    <div className="text-area">
                        <label>{t("objective")} *</label>
                        <textarea onChange={(e) => { handleChange(e, 'objective'); }} />
                    </div>

                    {/* <TextArea label="proposal" required="*" onChange={(e) => { setProposal(e.target.value) }}></TextArea> */}

                    <div className="input">
                        <label>{t("costCenter")} *</label>

                        <div className="display-flex">
                            <input onChange={(e) => { handleChange(e, 'costCenter'); setCostCenter(e.target.value) }} type="text" />

                            <div className="btn-primary w45" onClick={() => { addCostCenter(costCenter); handleChange(costCenter, 'costCenter'); }}>
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
                    <div onClick={ ()=> {addIDCostCenter()}}>
                        <ButtonAction title="Avançar" click="avancar"></ButtonAction>
                    </div>
                </div>

            </div>

        </div>
    );
}