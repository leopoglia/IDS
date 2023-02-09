import Header from "../../../Fixed/Header";
import Nav from "../../../Fixed/Nav";
import Footer from "../../../Fixed/Footer";
import Title from "../../../Fixed/Search/Title";
import GridCostExecution from "./GridCostExecution";
import SelectCostExecution from "./SelectCostExecution";
import { Link } from "react-router-dom";
import "./style.css"
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer, TypeOptions } from 'react-toastify';
import ButtonAction from "../../Demands/CrateDemand/ButtonAction";
import { useState } from "react";
import Services from "../../../../services/costCenterService";


export default function ExecutionCosts() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [costCenter, setCostCenter] = useState("");
    const [costsCenters, setCostsCenters]: any = useState([]);
    const demandCode = parseInt(window.location.href.split("/")[5]);
    let expenseListStorage: any = JSON.parse(localStorage.getItem('expenseList') || '[]');
    const [idCostCenter, setIdCostCenter]: any = useState([]);

    // const expenseList:any = [];
    // expenseList.push(JSON.parse(expenseListStorage));

    const [payingCostCenter, setPayingCostCenter] = useState('');

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

        if (payingCostCenter === '') {
            notify()
        } else {
            navigate('/proposals');
        }
    }

    return (
        <div className="execution-costs">

            <Header title={t("executionCosts")} icon="payments" />

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
                            <span>{t("totalsCosts")}: R$ 0,00</span>

                            <span>{t("externalCosts")}: R$ 0,00</span>

                            <span>{t("internalsCosts")}: R$ 0,00</span>

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