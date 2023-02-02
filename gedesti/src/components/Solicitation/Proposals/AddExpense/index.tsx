import { t } from "i18next";
import { Link } from "react-router-dom";
import Header from "../../../Fixed/Header";
import Nav from "../../../Fixed/Nav";
import Title from "../../../Fixed/Search/Title";
import SelectAddExpense from "./SelectAddExpense";
import "./style.css";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import Services from "../../../../services/expenseService";

export default function AddExpense() {
    const { t } = useTranslation();

    const [typeOfExpense, setTypeOfExpense] = useState('');
    const [expenseProfile, setExpenseProfile] = useState('');
    const [periodOfExecutionMonth, setPeriodOfExecutionMonth]:any = useState('');
    const [necessityHoursQuantity, setNecessityHoursQuantity]:any = useState('');
    const [hourValue, setHourValue]:any = useState('');
    const expenseTotalValue = necessityHoursQuantity * hourValue;

    async function createExpense(){
        await Services.save("typeOfExpense", "expenseProfile", periodOfExecutionMonth, necessityHoursQuantity, hourValue, expenseTotalValue, 1);
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
                        <input type="number" onChange={(e) => {setPeriodOfExecutionMonth(e.target.value)}} />
                    </div>

                    <div className="display-flex-grid">
                        <label>{t("necessityHoursQuantity")} *</label>
                        <input type="number" onChange={(e) => {setNecessityHoursQuantity(e.target.value)}}/>
                    </div>

                    <div className="display-flex-grid">
                        <label>{t("hourValue")} *</label>
                        <input type="number" onChange={(e) => {setHourValue(e.target.value)}}/>
                    </div>

                    <div className="display-flex-grid">
                        <label>{t("expenseTotalValue")} *</label>
                        <input type="number" value={expenseTotalValue} />
                    </div>
                </div>

                <div className="display-flex-end">
                    <Link to="/proposal/execution-costs">
                        <button className="btn-primary" onClick={() => createExpense()}>{t("add")}</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}