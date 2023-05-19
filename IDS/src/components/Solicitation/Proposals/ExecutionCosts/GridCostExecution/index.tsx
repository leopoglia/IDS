import { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import { useParams } from 'react-router';
import SelectCostCenter from '../SelectCostCenter';
import "./style.css"
import ServicesExpenses from '../../../../../services/expensesService';



export default function ConditionalValidationGrid(props: any) {

    const [expenseList, setExpenseList]: any = useState([]);
    const [deleteNumber, setDeleteNumber] = useState<any>(0);

    const [editExpense, setEditExpense] = useState<any>(false);
    const proposalCode: any = useParams().id;
    const expenseType = window.location.href.split("?")[1];

    useEffect(() => {

        console.log(localStorage.getItem('expenseList'))

        if ((expenseType === "internal" || expenseType === "recurrent" || expenseType === "expenses") && (localStorage.getItem('expenseList') === undefined || localStorage.getItem('expenseList') === null)) {
            setEditExpense(true);

            ServicesExpenses.findByProposal(proposalCode).then((expenses: any) => {

                expenses.forEach((expense: any) => {
                    if (expense.expensesType === expenseType) {
                        setExpenseList(expense.expense);
                        localStorage.setItem('expenseList', JSON.stringify(expense.expense));

                    }
                });
            })


        } else {
            setExpenseList(JSON.parse(localStorage.getItem('expenseList') || '[""]'));
        }

    }, [deleteNumber, localStorage.getItem('expenseList')]);

    const { t } = useTranslation();

    function deleteRow(index: any) {

        let expenseListAux: any = JSON.parse(localStorage.getItem('expenseList') || '[]');
        expenseListAux.splice(index, 1);

        localStorage.setItem('expenseList', JSON.stringify(expenseListAux));

        setDeleteNumber(deleteNumber + 1);
    }

    return (
        <div className='view-demand grid-cost-execution' >
            < div className='classification' >

                <div className="display-block">
                    <p className="title">{t(props.title)}</p>
                    <table>
                        <tr>
                            <td>{t("expenseProfile")}</td>
                            <td>{t("necessityHours")}</td>
                            <td>{t("hoursValue")}</td>
                            <td>{t("totalValue")}</td>
                            <td className='w40'>

                            </td>

                        </tr>

                        {
                            expenseList.map((val: any, index: any) => {

                                if (val.expenseType === props.title) {

                                    return (
                                        <tr>
                                            <td>{val.expenseProfile}</td>
                                            <td>{val.amountOfHours}</td>
                                            <td>R$ {val.hourValue}</td>
                                            <td>R$ {val.totalValue}</td>
                                            <td className='w40' onClick={() => deleteRow(index)}>
                                                <span className="material-symbols-outlined">
                                                    delete
                                                </span>
                                            </td>
                                        </tr>
                                    )
                                }

                            })
                        }
                    </table>
                </div>

            </div >


            <SelectCostCenter type={props.title} />
        </div >

    );
}
