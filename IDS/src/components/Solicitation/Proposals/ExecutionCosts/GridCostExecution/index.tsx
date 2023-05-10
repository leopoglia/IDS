import { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import SelectCostCenter from '../SelectCostCenter';
import "./style.css"



export default function ConditionalValidationGrid(props: any) {

    const [expenseList, setExpenseList]: any = useState(JSON.parse(localStorage.getItem('expenseList') || '[]'));
    const [deleteNumber, setDeleteNumber] = useState<any>(0);

    useEffect(() => {
        setExpenseList(JSON.parse(localStorage.getItem('expenseList') || '[""]'));

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
                                if (val.typeOfExpense === props.title) {
                                    return (
                                        <tr>
                                            <td>{val.expenseProfile}</td>
                                            <td>{val.necessityHoursQuantity}</td>
                                            <td>R$ {val.hourValue}</td>
                                            <td>R$ {val.expenseTotalValue}</td>
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

            {props.title !== "internal" ?
                <div className="hr mtwo30"></div>
                : null
            }

        </div >

    );
}
