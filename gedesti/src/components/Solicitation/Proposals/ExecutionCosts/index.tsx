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



export default function ExecutionCosts() {
    const { t } = useTranslation();
    const navigate = useNavigate();


    const [payingCostCenter, setPayingCostCenter] = useState('');



    const nextStep = () => {

        if (payingCostCenter === '' ) {
            notify()
        } else {
            navigate('/propossals');
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

                            <Link to="add-expense">
                                <button className="btn-secondary">{t("addExpense")}</button>
                            </Link>
                        </div>


                        <div className="display-flex-grid">
                            <div>
                                <label>{t("payingCostCenter")} *</label>

                                <div className="display-flex">
                                    <SelectCostExecution setPayingCostCenter={setPayingCostCenter} type="payingCostCenter"/>

                                    <button className="btn-primary btn-center-cost">
                                        <span className="material-symbols-outlined">
                                            add
                                        </span>
                                    </button>
                                </div>

                                <div className="cost-center">
                                    <span>Centro de Custo Tal</span>

                                    <div>
                                        <input type="number" />
                                        <label htmlFor="">%</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>


                <div className="demands-footer">
                    <Link to="/proposal/informations">
                        <button className="btn-secondary">{t("return")}</button>
                    </Link>

                    <div className="display-flex-center">
                        <div className="costs-execution">
                            <span>{t("totalsCosts")}: R$ 0,00</span>

                            <span>{t("externalCosts")}: R$ 0,00</span>

                            <span>{t("internalsCosts")}: R$ 0,00</span>

                        </div>

                        <Link to="/proposals">
                            <button className="btn-primary">{t("generateProposal")}</button>
                        </Link>
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