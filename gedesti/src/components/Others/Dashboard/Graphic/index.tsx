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

    let [labels, setLabels]: any = useState([]);
    let url = window.location.href;

    useEffect(() => {
        getMonthName();

    }, [props]);

    function getMonthName() {

        let monthNames = [
            { i: 1, month: "Jan", numbers: 0 },
            { i: 2, month: "Feb", numbers: 0 },
            { i: 3, month: "Mar", numbers: 0 },
            { i: 4, month: "Apr", numbers: 0 },
            { i: 5, month: "May", numbers: 0 },
            { i: 6, month: "Jun", numbers: 0 },
            { i: 7, month: "Jul", numbers: 0 },
            { i: 8, month: "Aug", numbers: 0 },
            { i: 9, month: "Sep", numbers: 0 },
            { i: 10, month: "Oct", numbers: 0 },
            { i: 11, month: "Nov", numbers: 0 },
            { i: 12, month: "Dec", numbers: 0 }
        ];

        if (props.dates.length > 0) {
            for (let i = 0; i < props.dates.length; i++) {
                let mes = JSON.parse(props.dates[i].split("/")[1]);
                let ano = JSON.parse(props.dates[i].split("/")[2]);
                let anoAtual = new Date().getFullYear();

                // eu quero mostrar somente os meses do ano atual e os 6 meses anteriores
                if (ano === anoAtual) {
                    for (let j = 0; j < monthNames.length; j++) {
                        if (monthNames[j].i === mes) {
                            monthNames[j].numbers++;
                        }
                    }
                } else if (ano === anoAtual - 1) {

                    // se o mês for maior que o mês atual, então ele não deve ser contabilizado
                    if (mes > new Date().getMonth() + 1) {
                        for (let j = 0; j < monthNames.length; j++) {
                            if (monthNames[j].i === mes) {
                                monthNames[j].numbers++;
                            }
                        }
                    }
                }

            }
        }

        // Obtém a data atual
        const currenDate = new Date();

        // Array com os nomes dos últimos sete meses
        const monthNames7 = [];
        for (let i = 7; i >= 1; i--) {
            const date = new Date(currenDate.getFullYear(), currenDate.getMonth() - i, 1);
            const monthName = monthNames[date.getMonth()].month;
            const monthNumber = monthNames[date.getMonth()].numbers;

            const month = { month: monthName, numbers: monthNumber };
            monthNames7.push(month);
        }

        // Adiciona o nome do mês atual ao array
        const nameCurrentMonth = monthNames[currenDate.getMonth()].month;
        const monthNumber = monthNames[currenDate.getMonth()].numbers;

        const month = { month: nameCurrentMonth, numbers: monthNumber };
        monthNames7.push(month);


        let totalNumbersPrefix = 0;

        for (let i = 0; i < monthNames7.length; i++) {
            totalNumbersPrefix += monthNames7[i].numbers;
        }


        if (props.number === totalNumbersPrefix) {
            setLabels(monthNames7);
        }
    }




    const data = {
        labels: labels.map((val: any) => val.month),
        datasets: [
            {
                fill: true,
                label: "",
                data: labels.map((val: any) => val.numbers),
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
