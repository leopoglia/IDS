import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { DataGrid, GridColumns, GridRowsProp } from '@mui/x-data-grid';
import { randomPrice } from '@mui/x-data-grid-generator';
import { useTranslation } from "react-i18next";

const StyledBox = styled(Box)(({ theme }) => ({
    height: 300,
    width: '100%',
    '& .MuiDataGrid-cell--editing': {
        backgroundColor: 'rgb(255,215,115, 0.19)',
        color: '#1a3e72',
        '& .MuiInputBase-root': {
            height: '100%',
        },
    },
    '& .Mui-error': {
        backgroundColor: `rgb(126,10,15, ${theme.palette.mode === 'dark' ? 0 : 0.1})`,
        color: theme.palette.error.main,
    },
}));

const rows: GridRowsProp = [
    {
        id: 1,
        tipoDespesa: 'Light bill',
        perilDespesa: randomPrice(0, 1000),
        periodoExecucao: new Date(2021, 6, 8),
        quantidadeHoras: false,
        valorHora: '',
        valorTotal: '',
    },
    {
        id: 2,
        tipoDespesa: 'Rent',
        perilDespesa: randomPrice(0, 1000),
        periodoExecucao: new Date(2021, 7, 1),
        quantidadeHoras: false,
        valorHora: '',
        valorTotal: '',
    },
    {
        id: 3,
        tipoDespesa: 'Car insurance',
        perilDespesa: randomPrice(0, 1000),
        periodoExecucao: new Date(2021, 7, 4),
        quantidadeHoras: true,
        valorHora: '',
        valorTotal: '',
    },

];

export default function ConditionalValidationGrid() {
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
        <table>
            <div className='hr' />
            <tr>
                <td>{t("expenseType")}</td>
                <td>{t("expenseProfile")}</td>
                <td>{t("periodOfExecution")}</td>
                <td>{t("necessityHours")}</td>
                <td>{t("hoursValue")}</td>
                <td>{t("totalValue")}</td>

            </tr>

            <div className='hr' />


            <tr>
                <td>Interno</td>
                <td>Infraestrutura</td>
                <td>20 meses</td>
                <td>400 horas</td>
                <td>50</td>
                <td>1000</td>

            </tr>

            <div className='hr' />
        </table>


    );
}
