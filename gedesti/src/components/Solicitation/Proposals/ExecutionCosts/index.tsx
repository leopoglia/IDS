import Header from "../../../Fixed/Header";
import Nav from "../../../Fixed/Nav";
import Title from "../../../Fixed/Search/Title";
import GridCostExecution from "./GridCostExecution";
import SelectCostExecution from "./SelectCostExecution";
import { Link } from "react-router-dom";
import "./style.css"
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import ButtonAction from "../../Demands/CrateDemand/ButtonAction";
import { useEffect, useState } from "react";
import Services from "../../../../services/costCenterService";
import ServicesDemand from "../../../../services/demandService";
import ProposalServices from "../../../../services/proposalService";
import DemandService from "../../../../services/demandService";
import ExpenseService from "../../../../services/expenseService";

export default function ExecutionCosts() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [costCenter, setCostCenter] = useState("");
    const [costsCenters, setCostsCenters]: any = useState([]);
    const [ demandCode, setDemandCode ] = useState(parseInt(window.location.href.split("/")[5]));
    let expenseListStorage: any = JSON.parse(localStorage.getItem('expenseList') || '[]');
    const [idCostCenter, setIdCostCenter]: any = useState([]);
    const proposal = JSON.parse(localStorage.getItem('proposal') || '{}');
    const scope: any = localStorage.getItem('proposalScope');
    let actualDate = new Date().getUTCDate() + "/" + (new Date().getUTCMonth() + 1) + "/" + new Date().getUTCFullYear(); // Data atual

    let totalsCosts = 0;
    let externalCosts = 0;
    let internalCosts = 0;
    DemandService.findById(demandCode).then((demand: any) => {
        localStorage.setItem('demand', JSON.stringify(demand));
    });

    const demandData: any = JSON.parse(localStorage.getItem('demand') || '{}');


    // const expenseList:any = [];
    // expenseList.push(JSON.parse(expenseListStorage));

    const [payingCostCenter, setPayingCostCenter] = useState('');

    for (let i = 0; i < expenseListStorage.length; i++) {
        if (expenseListStorage[i].typeOfExpense === "internal") {
            internalCosts += expenseListStorage[i].expenseTotalValue;
        } else {
            externalCosts += expenseListStorage[i].expenseTotalValue;
        }
        totalsCosts += expenseListStorage[i].expenseTotalValue;
    }

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

    const nextStep = () => {

        if (costsCenters.length === 0) {
            notify()
        } else {
            ProposalServices.save(demandData.demandTitle, "Pending", "1 mês", proposal.start, proposal.end, scope, proposal.respnosibleAnalyst, 0, "", totalsCosts, externalCosts, internalCosts, demandCode, actualDate).then((proposal: any) => {
                DemandService.updateStatus(demandCode, "Assesment");
                localStorage.removeItem('proposal');

                for (let i = 0; i < expenseListStorage.length; i++) {
                    ExpenseService.save(expenseListStorage[i].typeOfExpense,
                        expenseListStorage[i].expenseProfile,
                        expenseListStorage[i].periodOfExecutionMonth,
                        expenseListStorage[i].necessityHoursQuantity,
                        expenseListStorage[i].hourValue,
                        expenseListStorage[i].expenseTotalValue,
                        proposal.proposalCode
                        ).then((expense: any) => {   
                        localStorage.removeItem('expenseList');
                    }).catch((error: any) => {
                        console.log(error);
                    });
                }
                navigate('/proposals');

            }).catch((error: any) => {
                console.log(error);
            });
            
        }
    }

    return (
        <div className="execution-costs">

            <Header />

            <Nav />

            <div className="container">


                <div className="background-title">
                    <Title title="executionCosts" nav={t("demandExecutionCosts")} />
                </div>

                <div className="box">


                    <div className="display-flex">
                        <p>{t("executionCostsProject")}</p>
                    </div>

                    <div className="block">
                        <GridCostExecution />

                        <div className="display-flex-space-between">

                            <Link to={"/proposal/execution-costs/add-expense/" + demandCode}>
                                <button className="btn-secondary">{t("addExpense")}</button>
                            </Link>
                        </div>

                        <div className="input">
                            <div className="display-flex-grid">
                                <div>
                                    <label>{t("payingCostCenter")} *</label>

                                    <div className="display-flex">
                                        <SelectCostExecution setCostCenter={setCostCenter} costCenter={costCenter} addCostCenter={addCostCenter} type="payingCostCenter" />

                                        <button className="btn-primary btn-center-cost" onClick={() => { addCostCenter(costCenter) }}>
                                            <span className="material-symbols-outlined">
                                                add
                                            </span>
                                        </button>
                                    </div>


                                    {costsCenters.map((costCenter: any) => {
                                        return <div className="cost-center">
                                            <span>{costCenter}</span>

                                            <div>
                                                <input type="number" />
                                                <label htmlFor="">%</label>
                                            </div>
                                        </div>
                                    })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="demands-footer">
                    <Link to={"/proposal/informations/" + demandCode}>
                        <button className="btn-secondary">{t("return")}</button>
                    </Link>

                    <div className="display-flex-center">
                        <div className="costs-execution">
                            <span>{t("totalsCosts")}: R$ {totalsCosts}</span>

                            <span>{t("externalCosts")}: R$ {externalCosts}</span>

                            <span>{t("internalsCosts")}: R$ {internalCosts}</span>

                        </div>

                        {/* <Link to="/proposals">
                        </Link> */}

                        <div onClick={() => { nextStep() }}>
                            <button className="btn-primary">{t("generateProposal")}</button>
                        </div>
                    </div>
                </div>
            </div>

            <ToastContainer position="bottom-right" newestOnTop />

        </div>
    );
}

// Notificação de erro ao preencher campo obrigatório
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