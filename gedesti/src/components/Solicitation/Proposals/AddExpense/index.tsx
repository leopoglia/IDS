import { Link } from "react-router-dom";
import Header from "../../../Fixed/Header";
import Nav from "../../../Fixed/Nav";
import Title from "../../../Fixed/Search/Title";
import SelectAddExpense from "./SelectAddExpense";
import "./style.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import { useTranslation } from "react-i18next";
import Services from "../../../../services/expenseService";


export default function AddExpense() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const demandCode = parseInt(window.location.href.split("/")[6]);

    const [typeOfExpense, setTypeOfExpense] = useState('');
    const [expenseProfile, setExpenseProfile] = useState('');
    const [periodOfExecutionMonth, setPeriodOfExecutionMonth]: any = useState('');
    const [necessityHoursQuantity, setNecessityHoursQuantity]: any = useState('');
    const [hourValue, setHourValue]: any = useState('');
    const expenseTotalValue = necessityHoursQuantity * hourValue;

    const expense = { typeOfExpense: typeOfExpense, expenseProfile: expenseProfile, periodOfExecutionMonth: periodOfExecutionMonth, necessityHoursQuantity: necessityHoursQuantity, hourValue: hourValue, expenseTotalValue: expenseTotalValue };
    const [expenseList, setExpenseList]:any = useState([]);

    useEffect(() => {
        setExpenseList(JSON.parse(localStorage.getItem('expenseList') || '[]'));
    }, []);

    async function createExpense() {
        await Services.save(typeOfExpense, expenseProfile, periodOfExecutionMonth, necessityHoursQuantity, hourValue, expenseTotalValue, 1);
    }

    const nextStep = () => {
        if (typeOfExpense === '' || expenseProfile === '' || periodOfExecutionMonth === '' || necessityHoursQuantity === '' || hourValue === '') {
            notify()
        } else {
            expenseList.push(expense);
            localStorage.setItem('expenseList', JSON.stringify(expenseList));
            navigate('/proposal/execution-costs/' + demandCode);
        }
    }

    return (
        <div className="add-expense">
            <Header />

            <Nav />

            <div className="container">


                <div className="background-title">
                    <Title title="Adicionar Despesa" nav="Demands > Custos de Execução > Adicionar Despesa" />
                </div>

                <div className="box">

                    <p>{t("expenseInformation")}</p>


                    <div className="display-flex-grid">
                        <label>{t("expenseType")} *</label>
                        <SelectAddExpense setTypeOfExpense={setTypeOfExpense} type="typeOfExpense" />
                    </div>

                    <div className="display-flex-grid">
                        <label>{t("expenseProfile")} *</label>
                        <input onChange={ (e) => { setExpenseProfile(e.target.value)}} type="expenseProfile" />
                    </div>

                    <div className="display-flex-grid">
                        <label>{t("periodOfExecutionMonth")} *</label>
                        <input type="number" onChange={(e) => { setPeriodOfExecutionMonth(e.target.value) }} />
                    </div>

                    <div className="display-flex-grid">
                        <label>{t("necessityHoursQuantity")} *</label>
                        <input type="number" onChange={(e) => { setNecessityHoursQuantity(e.target.value) }} />
                    </div>

                    <div className="display-flex-grid">
                        <label>{t("hourValue")} *</label>
                        <input type="number" onChange={(e) => { setHourValue(e.target.value) }} />
                    </div>

                    <div className="display-flex-grid">
                        <label>{t("expenseTotalValue")} *</label>
                        <input type="number" value={expenseTotalValue} />
                    </div>
                </div>

                <div className="display-flex-end">

                    <div onClick={() => { nextStep() }}>
                        <button className="btn-primary">{t("add")}</button>
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