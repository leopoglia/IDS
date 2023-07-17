import { useEffect, useState } from 'react';
import othersUtil from '../../../../utils/othersUtil';
import './style.css';

export default function List(props: any) {

    const [weekPercent, setWeekPercent]: any = useState(0);
    const [monthPercent, setMonthPercent]: any = useState(0);
    const [yearPercent, setYearPercent]: any = useState(0);

    useEffect(() => {
        if (props.number.length !== 0) {
            const dateActual = new Date();
            const dateLastWeek = new Date();
            let datesFormated: any = [];
            dateLastWeek.setDate(dateLastWeek.getDate() - 7);


            for (let i = 0; i < props.number.length; i++) {
                datesFormated.push(
                    new Date(props.number[i])
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
    }, [props.number]);


    return (
        <div className="list-dashboard">
            <div className="list-dashboard-header display-flex">

                <div className='display-flex-space-between'>
                    <div className='display-flex'>
                        <span className='material-symbols-outlined'>{props.icon}</span>

                        <p>{props.title}</p>
                    </div>


                    <div className='display-flex'>
                        <span className='number-list'>{props.number.length}</span>

                        <div className="display-grid alteration-numbers">

                            <div className="display-flex-center ml10">
                                <div className='span'>1S</div>

                                <div className='display-flex'>
                                    <span className="material-symbols-outlined">
                                        trending_up
                                    </span>
                                    <p>{weekPercent?.toFixed(2)}%</p>
                                </div>
                            </div>

                            <div className="display-flex-center ml10">
                                <div className='span'>1M</div>
                                <div className='display-flex'>
                                    <span className="material-symbols-outlined">
                                        trending_up
                                    </span>
                                    <p>{monthPercent?.toFixed(2)}%</p>
                                </div>
                            </div>

                            <div className="display-flex-center ml10">
                                <div className='span'>1A</div>

                                <div className='display-flex'>
                                    <span className="material-symbols-outlined">
                                        trending_up
                                    </span>
                                    <p>{yearPercent?.toFixed(2)}%</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}