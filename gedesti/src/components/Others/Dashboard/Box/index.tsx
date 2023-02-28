import React, { useEffect, useState } from 'react';
import Graphic from '../Graphic';

export default function Box(props: any) {


    const [valor, setValor] = useState(0);
    const valorFinal = props.number;

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
        }, 20);

    }, [props]);

    return (
        <div className="box">


            <div className="display-flex flex-box">



                <div className='display-block h190'>


                    <p>{props.title}</p>


                    <div className='display-block'>
                        <span className="gg">{valor}</span>

                        <div className="display-grid">

                            <div className="display-flex-center">
                                <span>1S</span>

                                <span className="material-symbols-outlined">
                                    trending_up
                                </span>
                                <p>+50%</p>
                            </div>

                            <div className="display-flex-center">
                                <span>1M</span>
                                <span className="material-symbols-outlined">
                                    trending_up
                                </span>
                                <p>+50%</p>
                            </div>

                            <div className="display-flex-center">
                                <span>1A</span>
                                <span className="material-symbols-outlined">
                                    trending_up
                                </span>
                                <p>+50%</p>
                            </div>
                        </div>
                    </div>

                </div>

                <Graphic type={props.type} number={valor} />
            </div>

        </div>
    )
}