import Title from "../../../Fixed/Search/Title";
import SelectAddExpense from "./SelectAddExpense";
import "./style.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import { useTranslation } from "react-i18next";


export default function AddExpense() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const demandCode = parseInt(window.location.href.split("/")[6]);

    const [expenseType, setExpenseType] = useState('');
    const [expenseProfile, setExpenseProfile] = useState('');
    const [amountOfHours, setAmountOfHours]: any = useState('');
    const [hourValue, setHourValue]: any = useState('');
    const totalValue = amountOfHours * hourValue;

    const expense = { expenseType: expenseType, expenseProfile: expenseProfile, amountOfHours: amountOfHours, hourValue: hourValue, totalValue: totalValue };
    const [expenseList, setExpenseList]: any = useState([]);

    useEffect(() => {
        setExpenseList(JSON.parse(localStorage.getItem('expenseList') || '[]'));


        if (window.location.href.split("?")[1] !== undefined) {
            setExpenseType(window.location.href.split("?")[1])
        }

    }, [expenseType]);

    const nextStep = () => {
        if (expenseType === '' || expenseProfile === '' || amountOfHours === '' || hourValue === '') {
            notify()
        } else {
            expenseList.push(expense);
            localStorage.setItem('expenseList', JSON.stringify(expenseList));

            if (window.location.href.split("?")[1] === undefined) {
                navigate('/proposal/execution-costs/' + demandCode);
            } else {
                navigate('/proposal/edit/' + demandCode + "?" + expenseType);
            }
        }
    }

    return (
        <div className="add-expense">

            <div className="container">

                <div className="background-title">
                    <Title title="Adicionar Despesa" nav="Demands > Custos de Execução > Adicionar Despesa" />
                </div>

                <div className="box">

                    <p>{t("expenseInformation")}</p>

                    <div className="display-flex-grid">
                        <label>{t("expenseType")} *</label>
                        <SelectAddExpense setExpenseType={setExpenseType} value={expenseType} type="expenseType" />
                    </div>

                    <div className="display-flex-grid">
                        <label>{t("expenseProfile")} *</label>
                        <input onChange={(e) => { setExpenseProfile(e.target.value) }} type="expenseProfile" />
                    </div>

                    <div className="display-flex-grid">
                        {expenseType !== "recurrent" ? (
                            <label>{t("necessityHoursQuantity")} *</label>
                        ) : (
                            <label>{t("licenses")} *</label>
                        )}
                        <input type="number" onChange={(e) => { setAmountOfHours(e.target.value) }} />
                    </div>

                    <div className="display-flex-grid">
                        {expenseType !== "recurrent" ? (
                            <label>{t("hourValue")} *</label>
                        ) : (
                            <label>{t("unitValue")} *</label>
                        )}
                        <input type="number" onChange={(e) => { setHourValue(e.target.value) }} />
                    </div>

                    <div className="display-flex-grid">
                        <label>{t("expenseTotalValue")} *</label>
                        <input type="number" value={totalValue} />
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