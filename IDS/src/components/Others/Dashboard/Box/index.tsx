import { useEffect, useState } from 'react';
import othersUtil from '../../../../utils/othersUtil';
import Graphic from '../Graphic';

export default function Box(props: any) {


    const [valor, setValor] = useState(0);
    const [weekPercent, setWeekPercent]: any = useState(0);
    const [monthPercent, setMonthPercent]: any = useState(0);
    const [yearPercent, setYearPercent]: any = useState(0);
    let valorFinal = props.number;


    useEffect(() => {
        const intervalId = setInterval(() => {
            setValor(valor => {
                if (valor >= valorFinal) {
                    clearInterval(intervalId);
                    return valorFinal;
                } else {
                    return valor + 1;
                }
            });
        }, 5);
    }, [valorFinal]);


    useEffect(() => {
        if (props.dates.length !== 0) {
            const dateActual = new Date();
            const dateLastWeek = new Date();
            let datesFormated: any = [];
            dateLastWeek.setDate(dateLastWeek.getDate() - 7);


            for (let i = 0; i < props.dates.length; i++) {
                datesFormated.push(
                    new Date(othersUtil.removeZeroDate(othersUtil.formatDate(props.dates[i])))
                );
            }

            const dateLastMonth = new Date();
            dateLastMonth.setMonth(dateLastMonth.getMonth() - 1);

            const dateLastYear = new Date();
            dateLastYear.setFullYear(dateLastYear.getFullYear() - 1);

            const lastWeek = datesFormated.filter(
                (date: any) => date > dateLastWeek && date <= dateLastWeek
            );

            const actualWeek = datesFormated.filter(
                (date: any) => date >= dateLastWeek
            );

            const lastMonth = datesFormated.filter(
                (date: any) =>
                    date.getMonth() === dateLastMonth.getMonth() &&
                    date.getFullYear() === dateLastMonth.getFullYear()
            );

            const lastYear = datesFormated.filter(
                (date: any) =>
                    date.getFullYear() === dateLastYear.getFullYear()
            );

            const actualMonth = datesFormated.filter(
                (date: any) =>
                    date.getMonth() === dateActual.getMonth() &&
                    date.getFullYear() === dateActual.getFullYear()
            );

            const actualYear = datesFormated.filter(
                (date: any) => date.getFullYear() === dateActual.getFullYear()
            );
            
            console.log('lastWeek', lastWeek);
            console.log('acutalWeek', actualWeek)

            const weekPercent =
                ((actualWeek.length - lastWeek.length) / lastWeek.length) * 100;
            const monthPercent =
                ((actualMonth.length - lastMonth.length) / lastMonth.length) * 100;
            const yearPercent =
                ((actualYear.length - lastYear.length) / lastYear.length) * 100;

            setWeekPercent(weekPercent === Infinity ? 0 : weekPercent);
            setMonthPercent(monthPercent === Infinity ? 0 : monthPercent);
            setYearPercent(yearPercent === Infinity ? 0 : yearPercent);
        }
    }, [props.dates]);



    return (
        <div className="box">


            <div className="display-flex flex-box">



                <div className='display-block h190'>


                    <p>{props.title}</p>


                    <div className='display-grid'>
                        <span className="gg">{valor}</span>

                        <div className="display-grid">

                            <div className="display-flex-center">
                                <span className='grey3d'>1S</span>

                                <span className="material-symbols-outlined">
                                    trending_up
                                </span>
                                <p>{weekPercent?.toFixed(2)}%</p>
                            </div>

                            <div className="display-flex-center">
                                <span className='grey3d'>1M</span>
                                <span className="material-symbols-outlined">
                                    trending_up
                                </span>
                                <p>{monthPercent?.toFixed(2)}%</p>
                            </div>

                            <div className="display-flex-center">
                                <span className='grey3d'>1A</span>
                                <span className="material-symbols-outlined">
                                    trending_up
                                </span>
                                <p>{yearPercent?.toFixed(2)}%</p>
                            </div>
                        </div>
                    </div>

                </div>

                <Graphic type={props.type} number={props.number} dates={props.dates} />
            </div>

        </div>
    )
}