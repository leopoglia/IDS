import { useTranslation } from "react-i18next";

import Title from '../../../Fixed/Search/Title';
import './style.css';

export default function Workerflow() {

    const { t } = useTranslation();


    const step = (number: any, text: string) => {
        return (
            <div className="step">
                <div className={"ellipse ellipse-"  + number} >
                    {number !== "done" ? <span className="number">{number}</span> : <span className="material-symbols-outlined">done</span>
                    }
                </div>

                <span className="ellipse-text">
                    {t(text)}
                </span>
            </div>

        )
    }

    return (
        <div className="workflow">
            <div className="container">

                <div className="backgroud-title">
                    <Title nav={t("demand > workFlow")} title="workFlow" />
                </div>


                <div className="boxNoPadding">


                    {step(1, "Criar demanda")}
                    {step(2, "Criar das")}
                    {step("done", "Criar das")}




                </div>
            </div>

        </div>
    )
}