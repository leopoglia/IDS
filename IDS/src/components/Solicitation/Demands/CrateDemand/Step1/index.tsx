import "./style.css"
import Title from "../../../../Fixed/Search/Title";
import ProgressBar from "../ProgressBar";
import ButtonAction from "../ButtonAction";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from 'react';
import Services from '../../../../../services/costCenterService';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
import SelectCenterCost from "./SelectCenterCost";
import Editor from "../../../Proposals/EditProposalScope/Editor";
import notifyUtil from "../../../../../utils/notifyUtil";
import Label from "../Label/label";

export default function CreateDemands1() {

    const { t } = useTranslation();
    const navigate = useNavigate();

    const [titleDemand, setTitleDemand]: any = useState(""); // Titulo da demanda
    const [currentSituation, setCurrentSituation]: any = useState(""); // Situação atual
    const [objective, setObjective]: any = useState(""); // Objetivo

    useEffect(() => {
        let demand = JSON.parse(localStorage.getItem('demand') || '{}')

        if (demand?.titleInput !== undefined) {
            setTitleDemand(demand?.titleInput)
            setCurrentSituation(demand?.currentSituation)
            setObjective(demand?.objective)
            setCostsCenters(demand?.costCenter)
        }
    }, [])

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
        }
    }

    async function createCostCenter() {

        let costsCenterBd: any = await Services.findAll();

        let igual = 0;
        let id = 0;
        for (let i = 0; i < costsCenterBd.length; i++) {
            if (costsCenterBd[i].costCenter === costCenter) {
                igual++;
            }
        }

        if (igual === 0) {
            let service: any = await Services.save(costCenter);

            idCostCenter.push(service.costCenterCode);
        } else {
            for (let i = 0; i < costsCenterBd.length; i++) {
                if (costsCenterBd[i].costCenter === costCenter) {
                    id = costsCenterBd[i].costCenterCode;
                }
            }
            idCostCenter.push(id);
        }

    }

    const handleChange = (event: any, type: String) => {

        if (titleDemand === undefined) {
            localStorage.setItem("demand", JSON.stringify({ titleInput: '', currentSituation: '', objective: '' }))
        }

        let demand = {
            titleInput: "",
            currentSituation: "",
            objective: "",
            costCenter: []
        }

        switch (type) {
            case "titleInput":
                setTitleDemand(event.target.value);
                break;
            case "currentSituation":
                setCurrentSituation(event.target.value);
                break;
            case "objective":
                setObjective(event.target.value);
                break;
            case "costCenter":
                setCostCenter("");
                demand.costCenter = costsCenters;
                break;
            default:
                setTitleDemand(event.target.value);
        }

        demand = {
            titleInput: titleDemand,
            currentSituation: currentSituation,
            objective: objective,
            costCenter: costsCenters
        }


        localStorage.setItem("demand", JSON.stringify(demand));
    }

    const addIDCostCenter = () => {
        localStorage.getItem("demand");
        let demand = JSON.parse(localStorage.getItem("demand") || "{}");
        demand.costCenter = idCostCenter;
        localStorage.setItem("demand", JSON.stringify(demand));
    }

    const nextStep = () => {

        localStorage.getItem("demand");
        let demand = JSON.parse(localStorage.getItem("demand") || "{}");


        if (demand.titleInput === "" || demand.currentSituation === "" || demand.objective === "" || (demand.costCenter === undefined || demand.costCenter.length === 0)) {
            notifyUtil.error(t("fillAllFields"))
        } else {
            navigate('/demand/create/2');
            addIDCostCenter();
        }
    }


    return (
        <div className="create-demands-1">

            <div className="container">
                <div className="background-title">
                    <Title nav="demandsCreateDemand" title="createDemand" />

                    <ProgressBar atual="1" />
                </div>



                <div className="box">
                    <p>{t("generalInformation")}</p>

                    <div className="input">

                        <Label title="titleInput" required="true" textInfo="Digite um texto para a sua demanda" />

                        <input onChange={(e) => { handleChange(e, 'titleInput'); }} type="text" value={titleDemand} />
                    </div>

                    <div className="text-area">
                        <Label title="objective" required="true" textInfo="Digite o objetivo que você deseja realizando a demanda" />

                        <Editor handleChange={handleChange} type={"objective"} content={objective} />
                    </div>

                    <div className="text-area">
                        <Label title="currentSituation" required="true" textInfo="Digite o situação atual" />

                        <Editor handleChange={handleChange} type={"currentSituation"} content={currentSituation} />
                    </div>
           
                    <div className="input">
                        <Label title="costCenter" required="true" textInfo="Digite o centro de custo que ira pagar" />


                        <div className="display-flex">
                            <SelectCenterCost setCostCenter={setCostCenter} costCenter={costCenter} addCostCenter={addCostCenter} />

                            <div className="btn-primary w45" onClick={() => { addCostCenter(costCenter); handleChange(costCenter, 'costCenter'); }}>
                                <span className="material-symbols-outlined">add</span>
                            </div>
                        </div>
                    </div>

                    {costsCenters.map((costCenter: any, index: any) => {
                        return <div className="costCenter" key={index}>
                            <span>{costCenter}</span>

                            <span className="material-symbols-outlined delete-cost-center" onClick={deleteCostCenter(costCenter)} >
                                delete
                            </span>
                        </div>
                    })
                    }

                </div>

                <div className="demands-footer">
                    <ButtonAction page="0" click="voltar"></ButtonAction>
                    <div onClick={() => { nextStep() }}>
                        <ButtonAction click="avancar"></ButtonAction>
                    </div>
                </div>

            </div>

            <ToastContainer position="bottom-right" newestOnTop />

        </div>
    );
}

