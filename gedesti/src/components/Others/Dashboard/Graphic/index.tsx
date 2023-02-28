import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import ServicesDemand from '../../../../services/demandService';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            display: false
        },
        title: {
            display: false,
            text: 'Chart.js Line Chart',
        },
    },
};









export default function Graphic(props: any) {

    const monthNames = [
        "Jan", 
        "Feb", 
        "Mar", 
        "Apr", 
        "May", 
        "Jun", 
        "Jul", 
        "Aug", 
        "Sep", 
        "Oct", 
        "Nov", 
        "Dec"
      ];

    // Obtém a data atual
    const currenDate = new Date();

    // Array com os nomes dos últimos sete meses
    const monthNames7 = [];
    for (let i = 7; i >= 1; i--) {
        const date = new Date(currenDate.getFullYear(), currenDate.getMonth() - i, 1);
        const monthName = monthNames[date.getMonth()];
        monthNames7.push(monthName);
    }

    // Adiciona o nome do mês atual ao array
    const nameCurrentMonth = monthNames[currenDate.getMonth()];
    monthNames7.push(nameCurrentMonth);

    const labels = monthNames7;

    const data = {
        labels,
        datasets: [
            {
                fill: true,
                label: 'Dataset 2',
                data: labels.map((val) => props.number),
                borderColor: '#00579D',
                backgroundColor: '#1976d2d1',
            },
        ],
    };


    return (
        <div className='chart'>
            <Line options={options} data={data} />
        </div>
    );
}
