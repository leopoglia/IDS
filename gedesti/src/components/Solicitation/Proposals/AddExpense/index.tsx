import { t } from "i18next";
import { Link } from "react-router-dom";
import Header from "../../../Fixed/Header";
import Nav from "../../../Fixed/Nav";
import Title from "../../../Fixed/Search/Title";
import SelectAddExpense from "./SelectAddExpense";
import "./style.css";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";;
import { toast, ToastContainer, TypeOptions } from 'react-toastify';
import ButtonAction from "../../Demands/CrateDemand/ButtonAction";

export default function addExpense() {

    // const navigate = useNavigate();

    const nextStep = () => {

        localStorage.getItem("add-expense");
        let addExpense = JSON.parse(localStorage.getItem("add-expense") || "{}");

        if (addExpense.expenseType === "" || addExpense.expenseProfile === "" || addExpense.periodOfExecutionMonth === "" || addExpense.necessityHoursQuantity === "" ||
            addExpense.hourValue === "" || addExpense.expenseTotalValue === "") {
            notify();
        } else {
            // navigate('/proposal/execution-costs');
        }
    }

    return (
        <div className="add-expense">
            <Header title="Adicionar Despesa" icon="add" />

            <Nav />

            <div className="container">


                <div className="background-title">
                    <Title title="Adicionar Despesa" nav="Demands > Custos de Execução > Adicionar Despesa" />
                </div>

                <div className="box">

                    <p>{t("expenseInformation")}</p>


                    <div className="display-flex-grid">
                        <label>{t("expenseType")} *</label>
                        <SelectAddExpense type="typeOfExpense" />
                    </div>

                    <div className="display-flex-grid">
                        <label>{t("expenseProfile")} *</label>
                        <SelectAddExpense type="expenseProfile" />
                    </div>

                    <div className="display-flex-grid">
                        <label>{t("periodOfExecutionMonth")} *</label>
                        <input type="number" />
                    </div>

                    <div className="display-flex-grid">
                        <label>{t("necessityHoursQuantity")} *</label>
                        <input type="number" />
                    </div>

                    <div className="display-flex-grid">
                        <label>{t("hourValue")} *</label>
                        <input type="number" />
                    </div>

                    <div className="display-flex-grid">
                        <label>{t("expenseTotalValue")} *</label>
                        <input type="number" />
                    </div>
                </div>

                <div className="display-flex-end">
                    {/* <Link to="/proposal/execution-costs">
                        <button className="btn-primary">{t("add")}</button>
                    </Link> */}

                    <div onClick={() => { nextStep() }}>
                        <ButtonAction click="add"></ButtonAction>
                    </div>
                </div>
            </div>
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