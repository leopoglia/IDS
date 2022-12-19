import { t } from "i18next";
import { Link } from "react-router-dom";
import Header from "../../../Fixed/Header";
import Nav from "../../../Fixed/Nav";
import Title from "../../../Fixed/Search/Title";
import SelectAddExpense from "./SelectAddExpense";
import "./style.css";

export default function addExpense() {
    return (
        <div className="add-expense">
            <Header title="Adicionar Despesa" icon="add" />

            <Nav />

            <div className="container">


                <div className="background-title">
                    <Title title="Adicionar Despesa" nav="Demands > Execution Costs > Adicionar Despesa" />
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
                    <Link to="/proposal/execution-costs">
                        <button className="btn-primary">{t("add")}</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}