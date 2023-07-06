import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import othersUtil from "../../../utils/othersUtil";
import Title from "../../Fixed/Search/Title";
import Footer from "../../Fixed/Footer";
import UserContext from "../../../context/userContext";
import WorkerService from "../../../services/workerService";
import Slider from "./Slider";
import "./style.css"


export default function Configuration() {

    const { t } = useTranslation();

    const worker: any = useContext(UserContext).worker; // Contexto do utilizador
    const setWorker: any = useContext(UserContext).setWorker; // Set para o contexto do utilizador
    const name: any = worker.name; // Nome do utilizador
    const [image, setImage] = useState(name.substring(0, 1)); // Primeira letra do nome do utilizador
    const email = worker.email; // Email do utilizador


    const [voiceCommand, setVoiceCommand] = useState(false); // Estado do comando de voz
    const [pounds, setPounds] = useState(false); // Estado do pounds
    const [screenReading, setScreenReading] = useState(false); // Estado do leitor de tela

    const [fontSize, setFontSize] = useState(0); // Tamanho da fonte
    const [darkMode, setDarkMode] = useState(false); // Estado do darkMode
    const [squareStyleLayout, setSquareStyleLayout] = useState(false); // Estado do layout quadrado



    // Atualiza o estado do utilizador
    useEffect(() => {
        setImage(worker?.name?.substring(0, 1));
        setPounds(worker?.pounds);
        setVoiceCommand(worker?.voiceCommand);
        setScreenReading(worker?.screenReader);
        setDarkMode(worker?.darkmode);
        setSquareStyleLayout(worker?.square);
        setFontSize(worker?.fontSize);
    }, [worker])

    useEffect(() => {
        var test: any = document.getElementById("image-profile");

        test.addEventListener("mouseenter", function (event: any) {
            setImage("edit");
        }, false);

        test.addEventListener("mouseleave", function (event: any) {
            setImage(worker?.name?.substring(0, 1));
        }, false);
    }, []);

    // Atualiza o estado do layout quadrado
    const handleSquare = async (event: any) => {
        await WorkerService.updateSquare(worker.id, event.target.checked).then((response: any) => {
            setSquareStyleLayout(response.square);
            setWorker({ ...worker, square: response.square });

            if (response.square === false) {
                document.documentElement.style.setProperty('--r', ".375rem");
                document.documentElement.style.setProperty('--rr', "50px");
            } else {
                document.documentElement.style.setProperty('--r', "2px");
                document.documentElement.style.setProperty('--rr', "2px");
            }
        })
    }

    // Atualiza o estado do darkMode
    const handleDarkMode = async (event: any) => {
        await WorkerService.updateDarkMode(worker.id, event.target.checked).then((response: any) => {
            setDarkMode(response.darkmode);
            setWorker({ ...worker, darkmode: response.darkmode });
        })
        document.body.classList.toggle('darkmode');
    }

    // Atualiza o estado do comando de voz
    const handleVoiceCommand = async (event: any) => {
        await WorkerService.updateVoiceCommand(worker.id, event.target.checked).then((response: any) => {
            setVoiceCommand(response.voiceCommand);
            setWorker({ ...worker, voiceCommand: response.voiceCommand });
        })
    }

    // Atualiza o estado das libras
    const handlePounds = async (event: any) => {
        await WorkerService.updatePounds(worker.id, event.target.checked).then((response: any) => {
            setPounds(response.pounds);
            setWorker({ ...worker, pounds: response.pounds });
        })
    }

    // Atualiza o estado do tamanho da fonte
    const handleFontSize = async (fontSize: any) => {
        await WorkerService.updateFontSize(worker.id, fontSize).then((response: any) => {
            setFontSize(response.fontSize);
            setWorker({ ...worker, fontSize: response.fontSize });

            document.documentElement.style.setProperty('--gg', response.fontSize - 2 + "px");
            document.documentElement.style.setProperty('--g', response.fontSize - 4 + "px");
            document.documentElement.style.setProperty('--m', response.fontSize - 6 + "px");
            document.documentElement.style.setProperty('--p', response.fontSize - 10 + "px");
            document.documentElement.style.setProperty('--pp', response.fontSize - 12 + "px");
        })
    }

    // Atualiza o estado do leitor de tela
    const handleScreenReading = async (event: any) => {
        await WorkerService.updateScreenReader(worker.id, event.target.checked).then((response: any) => {
            setScreenReading(response.screenReader);
            setWorker({ ...worker, screenReader: response.screenReader });
        })
    }


    return (
        <div className="configuration">
            <div className="container">
                <div className="background-title">
                    <Title nav="configurations" title="configurations" />
                </div>

                <div className="box">
                    <div className="profile">
                        {/* <input className="input-image" type="file" id="image-profile" /> */}
                        <label htmlFor="image-profile" className={image === "edit" ? "material-symbols-outlined" : ""} id="image-profile">

                            {image.substring(0, 4) !== "data" ?
                                (
                                    image
                                ) :
                                <img src={image} alt="" />
                            }
                        </label>
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
                                <span className="title-confuration">{t("style")}</span>

                                <div className="display-flex">
                                    <div className="display-flex mr20">
                                        <span className="subtitle-confuration">{t("darkmode")}</span>

                                        <div className="switch">
                                            <input onChange={handleDarkMode} type="checkbox" id="darkMode" name="darkMode" checked={darkMode} />
                                            <label htmlFor="darkMode" />
                                        </div>
                                    </div>


                                    <div className="display-flex mr20">
                                        <span className="subtitle-confuration">{t("squareStyleLayout")}</span>

                                        <div className="switch">
                                            <input onChange={handleSquare} type="checkbox" id="switch" name="switch" checked={squareStyleLayout} />
                                            <label htmlFor="switch" />
                                        </div>
                                    </div>
                                    {/* 
                                    <div className="display-flex">
                                        <span className="subtitle-confuration">{t("colors")}</span>

                                        <div className="colors-configuration ml10">
                                            <div className="color color-1"></div>
                                            <div className="color color-2"></div>
                                            <div className="color color-3"></div>
                                            <div className="color color-4"></div>
                                            <div className="color color-5"></div>
                                            <div className="color color-6"></div>
                                            <div className="color color-7"></div>
                                            <div className="color color-8"></div>
                                            <div className="color color-9"></div>


                                        </div>
                                    </div> */}
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
                                                <Slider setValue={setFontSize} fontSize={fontSize} handleFontSize={handleFontSize} />
                                            </div>

                                        </div>


                                        <div className="display-space-between">
                                            <span className="subtitle-confuration">{t("voiceCommand")}</span>


                                            <div className="switch-accessibility">
                                                <div className="switch">
                                                    <input type="checkbox" id="slider-voiceCommand" name="slider-voiceCommand" checked={voiceCommand} onChange={handleVoiceCommand} />
                                                    <label htmlFor="slider-voiceCommand" />
                                                </div>
                                            </div>

                                        </div>

                                        <div className="display-space-between">
                                            <span className="subtitle-confuration">{t("screenReading")}</span>


                                            <div className="switch-accessibility">
                                                <div className="switch">
                                                    <input type="checkbox" id="slider-screenReading" name="slider-screenReading" onChange={handleScreenReading} checked={screenReading} />
                                                    <label htmlFor="slider-screenReading" />
                                                </div>
                                            </div>

                                        </div>

                                        {worker?.language === "pt" ?
                                            <div className="display-space-between">
                                                <span className="subtitle-confuration">{t("pounds")}</span>
                                                <div className="switch-accessibility">
                                                    <div className="switch">
                                                        <input type="checkbox" id="slider-pounds" name="slider-pounds" checked={pounds} onChange={handlePounds} />
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