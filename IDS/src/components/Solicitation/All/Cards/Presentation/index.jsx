import { useTranslation } from "react-i18next";
import { useState, useContext } from "react";
import 'intro.js/introjs.css';
import UserContext from "../../../../../context/userContext";

import "./style.css"

export default function Presentation(props) {

    const { t } = useTranslation();

    const { worker, setWorker } = useContext(UserContext); // Contexto do usuário

    const handleWorker = () => {
        worker.presentation = true;
        setWorker(worker);
        props.setPresentation(false);
    }

    return (
        <div className="presentation" >

            <div className="barrier">
                <div className="bubble">
                    <p>
                        {t("widsPresentation")}
                    </p>
                    <div className="description">
                        {t("introduceSystem")}
                    </div>

                    <div className="btn-presentation-bar-true">
                        <button onClick={handleWorker} className="btn-primary btn-primary-unique">
                            <span className="material-symbols-outlined">
                                arrow_forward_ios
                            </span>
                        </button>


                    </div>
                </div>


                <img className="bia" src="/images/wids.png" />


            </div>


        </div>
    )

}