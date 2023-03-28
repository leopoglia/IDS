import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { DataGrid, GridColumns, GridRowsProp } from '@mui/x-data-grid';
import { randomPrice } from '@mui/x-data-grid-generator';
import { useTranslation } from "react-i18next";
import "./style.css"



export default function ConditionalValidationGrid(props: any) {

    const [expenseList, setExpenseList] = useState<any>(JSON.parse(localStorage.getItem('expenseList') || '[""]'));

    useEffect(() => {
        setExpenseList(JSON.parse(localStorage.getItem('expenseList') || '[""]'))
    }, []);


    const { t } = useTranslation();

    const columns: GridColumns = [
        {
            field: 'tipoDespesa',
            headerName: 'Tipo de despesa',
            type: 'singleSelect',
            width: 170,
            editable: true,
            valueOptions: ['Credit card', 'Wire transfer', 'Cash'],

        },
        {
            field: 'perilDespesa',
            headerName: 'Perfil da despesa ',
            type: 'singleSelect',
            width: 200,
            editable: true,
            valueOptions: ['Credit card', 'Wire transfer', 'Cash'],
        },
        {
            field: 'periodoExecucao',
            headerName: 'Período de execução',
            type: 'date',
            width: 170,
            editable: true,
        },

        {
            field: 'quantidadeHoras',
            headerName: 'Quantidade de horas',
            type: 'number',
            width: 200,
            editable: true,
        },
        {
            field: 'valorHora',
            headerName: 'Valor da hora',
            type: 'number',
            width: 160,
            editable: true,
        },
        {
            field: 'valorTotal',
            headerName: 'Valor total',
            type: 'number',
            width: 200,
            editable: true,
        },
    ];

    return (
        <div className='view-demand grid-cost-execution'>


            <div className='classification'>
                <div className="display-block">

                    <p className="title">{t(props.title)}</p>
                    <table>
                        <tr>
                            <td>{t("expenseProfile")}</td>
                            <td>{t("periodOfExecution")}</td>
                            <td>{t("necessityHours")}</td>
                            <td>{t("hoursValue")}</td>
                            <td>{t("totalValue")}</td>
                            <td className='w40'>
                                <span className="material-symbols-outlined">
                                    delete
                                </span>
                            </td>

                        </tr>

                        {
                            expenseList.map((val: any) => {
                                if (val.typeOfExpense === props.title) {

                                    return (
                                        <tr>
                                            <td>{val.expenseProfile}</td>
                                            <td>{val.periodOfExecutionMonth}</td>
                                            <td>{val.necessityHoursQuantity}</td>
                                            <td>R$ {val.hourValue}</td>
                                            <td>R$ {val.expenseTotalValue}</td>
                                            <td className='w40'>
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
            </div>


        </div>
    );
}
