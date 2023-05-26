import { useTranslation } from "react-i18next";
import { useState } from "react";

import "./style.css"

export default function Presentation() {

    const { t } = useTranslation();

    const [stepPresentation, setStepPresentation]: any = useState(0);

    const linesPresentation = [
        { title: "widsPresentation", description: "introduceSystem" },
        { title: "demandPage", description: "thisIsDemandPage" },
        { title: "createDemand", description: "createDemandHere" }
    ]
    
    return (
        <div className={"presentation presentation-" +  stepPresentation} >

            <div className="barrier">
                <div className="bubble">
                    <p>
                        {t(linesPresentation[stepPresentation].title)}
                    </p>
                    <div className="description">
                        {t(linesPresentation[stepPresentation].description)}
                    </div>

                    <div className={"btn-presentation-bar-" + (stepPresentation === 0 ? true : false)}>
                        {stepPresentation !== 0 &&
                            <button onClick={() => { setStepPresentation(stepPresentation - 1) }} className="btn-secondary btn-primary-unique">
                                <span className="material-symbols-outlined">
                                    arrow_back_ios
                                </span>
                            </button>
                        }

                        {linesPresentation.length !== stepPresentation + 1 &&
                            <button onClick={() => { setStepPresentation(stepPresentation + 1) }} className="btn-primary btn-primary-unique">
                                <span className="material-symbols-outlined">
                                    arrow_forward_ios
                                </span>
                            </button>
                        }

                    </div>
                </div>


                <img className="bia" src="https://i.imgur.com/r004kLD.png" />
            </div>


        </div>
    )

}