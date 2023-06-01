import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import Title from "../../Fixed/Search/Title";
import Footer from "../../Fixed/Footer";
import UserContext from "../../../context/userContext";
import WorkerService from "../../../services/workerService";
import Slider from "./Slider";
import "./style.css"


export default function Configuration() {
    const { t } = useTranslation();

    const worker: any = useContext(UserContext).worker;
    const name: any = worker.name;
    const email = worker.email;


    const [voiceCommand, setVoiceCommand] = useState(worker.voiceCommand);
    const [pounds, setPounds] = useState(worker?.pounds);
    const [fontSize, setFontSize] = useState(0);
    const image = name.substring(0, 1);

    const handleChange = (event: any) => {
        if (event.target.checked === false) {
            document.documentElement.style.setProperty('--r', ".375rem");
            document.documentElement.style.setProperty('--rr', "50px");
        } else {
            document.documentElement.style.setProperty('--r', "2px");
            document.documentElement.style.setProperty('--rr', "2px");
        }
    }

    const editVoiceCommand = async (event: any) => {


        await WorkerService.updateVoiceCommand(worker.id, event.target.checked).then((response: any) => {
            console.log(response)

            setVoiceCommand(response.voiceCommand);

        })

    }

    const editPounds = (event: any) => {
        setPounds(event.target.checked);
    }


    useEffect(() => {
        document.documentElement.style.setProperty('--gg', fontSize - 2 + "px");
        document.documentElement.style.setProperty('--g', fontSize - 4 + "px");
        document.documentElement.style.setProperty('--m', fontSize - 6 + "px");
        document.documentElement.style.setProperty('--p', fontSize - 10 + "px");
        document.documentElement.style.setProperty('--pp', fontSize - 12 + "px");


        // document.documentElement.style.setProperty('--z', JSON.stringify(1 + (fontSize / 100)));



    }, [fontSize])

    return (
        <div className="configuration">


            <div className="container">
                <div className="background-title">
                    <Title nav="configurations" title="configurations" />
                </div>

                <div className="box">
                    <div className="profile">
                        <div className="picture-profile">{image}</div>
                        <div className="email-name">
                            <div className="flex">
                                <span className="name">{name}</span>
                                <span className="material-symbols-outlined">
                                    edit
                                </span>
                            </div>
                            <span className="email">{email}</span>
                        </div>
                    </div>

                    <div className="display-flex background-configurations">
                        <div className="box-configurations">
                            <div className="change-configuration">
                                <div className="flex">
                                    <span className="title-confuration">{t("password")}</span>
                                    <span className="material-symbols-outlined">
                                        edit
                                    </span>
                                </div>

                                <div className="display-flex">
                                    <span className="subtitle-confuration">{t("changePassword")}</span>

                                    <input type="password" className="input-password" value={"123456789124354235423516534424354235234532345678"} disabled />
                                </div>
                            </div>

                            <div className="change-configuration">
                                <span className="title-confuration">{t("notifications")}</span>

                                <div className="display-flex">
                                    <span className="subtitle-confuration">{t("messagesNotify")}</span>

                                    <div className="switch">
                                        <input type="checkbox" id="slider" name="slider" />
                                        <label htmlFor="slider" />
                                    </div>

                                </div>

                            </div>

                            <div className="change-configuration">
                                <span className="title-confuration">{t("square")}</span>

                                <div className="display-flex">
                                    <span className="subtitle-confuration">{t("squareStyleLayout")}</span>

                                    <div className="switch">
                                        <input onChange={(e) => handleChange(e)} type="checkbox" id="switch" name="switch" />
                                        <label htmlFor="switch" />
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="box-accesibility">

                            <div className="display-flex">
                                <img className="accessibility-person" src="/images/accessibility_person.png" alt="" />

                                <div className="accesibility-options display-block">
                                    <div>
                                        <span className="title-confuration">{t("accessibility")}</span>
                                    </div>


                                    <div className="sliders-accessibility">
                                        <div className="display-space-between">
                                            <span className="subtitle-confuration">{t("fontSize")}</span>

                                            <div className="switch-slider-fontSize">
                                                <Slider setValue={setFontSize} />
                                            </div>

                                        </div>


                                        <div className="display-space-between">
                                            <span className="subtitle-confuration">{t("voiceCommand")}</span>


                                            <div className="switch-accessibility">
                                                <div className="switch">
                                                    <input type="checkbox" id="slider-voiceCommand" name="slider-voiceCommand" checked={voiceCommand} onChange={editVoiceCommand} />
                                                    <label htmlFor="slider-voiceCommand" />
                                                </div>
                                            </div>

                                        </div>

                                        <div className="display-space-between">
                                            <span className="subtitle-confuration">{t("screenReading")}</span>


                                            <div className="switch-accessibility">
                                                <div className="switch">
                                                    <input type="checkbox" id="slider-screenReading" name="slider-screenReading" />
                                                    <label htmlFor="slider-screenReading" />
                                                </div>
                                            </div>

                                        </div>


                                        {worker?.language === "pt" ?
                                            <div className="display-space-between">
                                                <span className="subtitle-confuration">{t("pounds")}</span>
                                                <div className="switch-accessibility">
                                                    <div className="switch">
                                                        <input type="checkbox" id="slider-pounds" name="slider-pounds" checked={pounds} onChange={editPounds} />
                                                        <label htmlFor="slider-pounds" />
                                                    </div>
                                                </div>
                                            </div>
                                            : null
                                        }
                                    </div>


                                </div>



                                <div className="title-confuration text-background">
                                    <span>{t("accessibility")}
                                    </span>
                                </div>

                            </div>




                        </div>

                    </div>


                </div>

                <div className="h45"></div>

                <Footer />

            </div>


        </div >
    );
}