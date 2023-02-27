import React, { useEffect, useState } from 'react';
import Graphic from '../Graphic';

export default function Box() {


    const [valor, setValor] = useState(0);
    const valorFinal = 10;

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
        }, 100);
    }, []);


    return (
        <div className="box">

            <p>Novas propostas</p>

            <div className="display-flex flex-box">

             

                <div className='display-block'>


                

                    <div className='display-flex'>
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

                <Graphic />
            </div>

        </div>
    )
}