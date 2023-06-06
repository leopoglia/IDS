import { useTranslation } from "react-i18next";

import Title from '../../../Fixed/Search/Title';
import ServicesDemand from "../../../../services/demandService";
import './style.css';
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function Workerflow() {

    const { t } = useTranslation();

    const demandCode: number = parseInt(useParams().id as string);
    const [stepActual, setStepActual] = useState(0);
    const steps = ["Criar demanda", "Classificação pelo analista", "Aprovação do gerente", "Complemento do analista", "Criação da proposta", "Inserção em uma pauta de reunião", "Aprovação da comissão", "Aprovação da DG", "Desenvolvimento"];


    useEffect(() => {
        ServicesDemand.findById(demandCode).then((demand: any) => {
            console.log(demand);

            if (demand.demandStatus === "Backlog") {
                setStepActual(0);
            } else if (demand.demandStatus === "BacklogRanked") {
                setStepActual(1);
            } else if (demand.demandStatus === "BacklogRankedApproved") {
                setStepActual(2);
            } else if (demand.demandStatus === "BacklogComplement") {
                setStepActual(3);
            } else if (demand.demandStatus === "Assesment") {
                setStepActual(4);
            }
        })
    }, [])



    const step = (number: any, text: any, index: number) => {
        return (
            <div key={index}>
                <div className="step">
                    <div className={"ellipse ellipse-" + number} >
                        {number !== "done" ? <span className="number">{number}</span> : <span className="material-symbols-outlined">done</span>
                        }
                    </div>

                    <span className="ellipse-text">
                        {t(text)}
                    </span>
                </div>

                {index !== 8 &&
                    < div className="background-line">

                        <div className={"line line-" + (index === stepActual - 1 ? true : false)} />
                    </div>
                }
            </div >
        )
    }


    return (
        <div className="workflow">
            <div className="container">

                <div className="backgroud-title">
                    <Title nav={t("demand > workFlow")} title="workFlow" />
                </div>


                <div className="boxNoPadding h100">
                    {
                        steps.map((steps, index) => {
                            if (index <= stepActual) {
                                return step("done", steps, index);
                            } else {
                                return step(index + 1, steps, index);
                            }
                        })
                    }

                </div>
            </div>

        </div>
    )
}