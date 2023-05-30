import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { useTranslation } from "react-i18next";

import Title from "../../../Fixed/Search/Title";
import SelectAddExpense from "./SelectAddExpense";
import notifyUtil from "../../../../utils/notifyUtil";
import "./style.css";
import Input from "../../Demands/CrateDemand/Others/Input";


export default function AddExpense() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const demandCode = parseInt(window.location.href.split("/")[6]);
    const [minuteEdit, setMinuteEdit] = useState(window.location.href.split("?")[2]);

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
            notifyUtil.error(t("fillAllFields"))
        } else {
            expenseList.push(expense);
            localStorage.setItem('expenseList', JSON.stringify(expenseList));

            if (window.location.href.split("?")[1] === undefined) {
                navigate('/proposal/execution-costs/' + demandCode);
            } else {
                if (minuteEdit === undefined) {
                    navigate('/proposal/edit/' + demandCode + "?" + expenseType);
                } else {
                    navigate('/proposal/edit/' + demandCode + "?" + expenseType + "?" + minuteEdit);
                }
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
          

                        <Input label="expenseProfile" value={expenseProfile} setValue={setExpenseProfile} required="true" />
                    </div>

                    <div className="display-flex-grid">
                        {expenseType !== "recurrent" ? (
                            <label>{t("necessityHoursQuantity")} *</label>
                        ) : (
                            <label>{t("licenses")} *</label>
                        )}

                        <Input type="number" value={amountOfHours} setValue={setAmountOfHours} />

                    </div>

                    <div className="display-flex-grid">
                        {expenseType !== "recurrent" ? (
                            <label>{t("hourValue")} *</label>
                        ) : (
                            <label>{t("unitValue")} *</label>
                        )}

                        <Input type="number" value={hourValue} setValue={setHourValue} />

                    </div>
                    
                    <Input label="expenseTotalValue" type="number" value={totalValue} disabled={true} />


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
