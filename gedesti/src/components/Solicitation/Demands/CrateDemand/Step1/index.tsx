import "./style.css"
import Header from "../../../../Fixed/Header"
import Nav from "../../../../Fixed/Nav"
import Title from "../../../../Fixed/Search/Title";
import ProgressBar from "../ProgressBar";
import Input from "../Input";
import TextArea from "../TextArea";
import ButtonAction from "../ButtonAction";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from 'react';
import Services from '../../../../../services/costCenterService';
import { toast, ToastContainer, TypeOptions } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
import SelectCenterCost from "./SelectCenterCost";

export default function CreateDemands1() {

    const { t } = useTranslation();
    const navigate = useNavigate();
    const [titleDemand, setTitleDemand]: any = useState("")
    const [currentSituation, setCurrentSituation]: any = useState("")
    const [objective, setObjective]: any = useState("")


    useEffect(() => {
        let demand = JSON.parse(localStorage.getItem('demand') || '{}')

        setTitleDemand(demand.titleInput)
        setCurrentSituation(demand.currentSituation)
        setObjective(demand.objective)
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


        if ( demand.titleInput === "" || demand.currentSituation === "" || demand.objective === "" || demand.costCenter.length === 0) {
            notify();
        } else {
            navigate('/demand/create/2');
            addIDCostCenter();
        }
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
                        <input onChange={(e) => { handleChange(e, 'titleInput'); }} type="text" value={titleDemand} />
                    </div>

                    <div className="text-area">
                        <label>{t("currentSituation")} *</label>
                        <textarea onChange={(e) => { handleChange(e, 'currentSituation'); }} value={currentSituation} />
                    </div>
                    {/* 
                    <TextArea label="currentSituation" required="*" onChange={(e) => { setDemandProblem(e.target.value) }}></TextArea> */}

                    <div className="text-area">
                        <label>{t("objective")} *</label>
                        <textarea onChange={(e) => { handleChange(e, 'objective'); }} value={objective} />
                    </div>

                    {/* <TextArea label="proposal" required="*" onChange={(e) => { setProposal(e.target.value) }}></TextArea> */}

                    <div className="input">
                        <label>{t("costCenter")} *</label>

                        <div className="display-flex">
                            <SelectCenterCost setCostCenter={setCostCenter} costCenter={costCenter} addCostCenter={addCostCenter} />

                            <div className="btn-primary w45" onClick={() => { addCostCenter(costCenter); handleChange(costCenter, 'costCenter'); }}>
                                <span className="material-symbols-outlined">add</span>
                            </div>
                        </div>
                    </div>

                    {costsCenters.map((costCenter: any) => {
                        return <div className="costCenter">{costCenter}
                            <span className="material-symbols-outlined delete-cost-center" onClick={deleteCostCenter(costCenter)} >
                                delete
                            </span>
                        </div>
                    })
                    }

                    {/* <Input label="costCenter" required="*" onChange={(e) => { setCostCenter(e.target.value) }}></Input> */}

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

// Notificação de erro ao preencher os campos obrigatórios
const notify = () => {
    toast.error('Preencha todos os campos!', {
        position: "bottom-right",
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
};