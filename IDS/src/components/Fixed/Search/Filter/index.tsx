import { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import SelectStatus from "./SelectStatus";
import UserContext from "../../../../context/userContext";
import "./style.css";

export default function Filter(props: any) {

    const { t } = useTranslation();

    let worker: any = useContext(UserContext).worker; // Contexto do usuário

    const url = window.location.pathname.split("/")[1]; // Pega a url para verificar se é demanda, proposta, pauta ou ata
    const [filter, setFilter]: any = useState(false); // Estado do filtro
    const [type, setType] = useState<string>("");
    const [status, setStatus] = useState<string>("");


    const sendFilter = () => {

        // Se o tipo for diferente de status, size, date, forum ou home, retorna o input normal de pesquisa
        if (!(type === "status" || type === "size" || type === "date" || type === "forum" || type === "home") && filter === true) {
            return (
                <div className="send-filter">
                    <div className="hr" />
                    <input className="input" onChange={onButtonPress} type="text" ref={inputName} placeholder="Insira o parametro aqui" />
                </div>
            )

            // Se o tipo for status, size ou forum, retorna o select com os valores
        } else if ((type === "status" || type === "size" || type === "forum") && filter === true) {

            let arraySelect: string[] = []; // Array que vai receber os valores do select

            if (type === "status") {
                arraySelect = ["Backlog", "BacklogRanked", "BacklogEdit", "BacklogRankApproved", "BacklogComplement", "Assesment"]; // Status das demandas
            } else if (type === "size") {
                arraySelect = ["Muito pequeno", "Pequeno", "Médio", "Grande", "Muito grande"]; // Tamanhos das demandas
            } else if (type === "forum") {
                arraySelect = ["CPVM", "CPGCI", "CPGPR", "CGPN", "CTI", "CWBS", "DTI"]; // Siglas dos fóruns
            }

            return (
                <div className="send-filter">
                    <div className="hr" />
                    <SelectStatus status={status} setStatus={setStatus} onChange={onButtonPressSelect} array={arraySelect}/>
                </div>
            )

            // Se o tipo for date, retorna o input de data
        } else if (filter === true && type === "date") {
            return (
                <div className="send-filter">
                    <div className="hr" />
                    <input className="input" onChange={onButtonPress} type="date" ref={inputName} placeholder="Insira o parametro aqui" />
                </div>
            )
        }
    }


    const sendOrder = (option: any) => {

        if (option === "score") {
            if (type === "score") {
                setType("score-true");
                props.setName("score")
                props.setType("down")
            } else if (type === "score-true" && filter === true) {
                setType("score-false");
                props.setName("")
                props.setType("")
            } else {
                setType("score");
                props.setName("score")
                props.setType("up")
            }

            setFilter(true);
        } else if (option === "dates") {

            if (type === "dates") {
                setType("dates-true");
                props.setName("dates")
                props.setType("down")
            } else if (type === "dates-true" && filter === true) {
                setType("dates-false");
                props.setName("")
                props.setType("")
            } else {
                setType("dates");
                props.setName("dates")
                props.setType("up")
            }

            setFilter(true);
        } else if (option === "code") {

            if (type === "code") {
                setType("code-true");
                props.setName("code")
                props.setType("down")
            } else if (type === "code-true" && filter === true) {
                setType("code-false");
                props.setName("")
                props.setType("")
            } else {
                setType("code");
                props.setName("code")
                props.setType("up")
            }

            setFilter(true);
        }


    }

    const inputName = useRef<HTMLInputElement>(null) // Referência do input de pesquisa

    // Envia o valor do input e o tipo para o componente pai
    const onButtonPress = () => {
        props.onClick(inputName?.current?.value, type);
    }

    // Envia o valor do select e o tipo para o componente pai
    const onButtonPressSelect = (status: any) => {
        props.onClick(status, type);
    }

    // Envia o valor do select e o tipo para o componente pai
    const onButtonPressHome = () => {
        props.onClick(worker.name, "home");
    }


    if (props.type === "filter") {
        if (url === 'demands') {
            return (
                <div className="filter-modal modal">

                    <div className="li" onClick={() => { setFilter(true); setType("home"); onButtonPressHome() }}>
                        <span className="material-symbols-outlined" >home</span>
                        <span className="font-p">{t("myDemands")}</span>
                    </div>

                    <div className="li" onClick={() => { setFilter(true); setType("requester") }}>
                        <span className="material-symbols-outlined">person</span>
                        <span className="font-p">{t("requester")}</span>
                    </div>


                    {worker?.office !== "requester" &&
                        <>
                            <div className="li" onClick={() => { setFilter(true); setType("manager") }}>
                                <span className="material-symbols-outlined">manage_accounts</span>
                                <span className="font-p">{t("manager")}</span>
                            </div>

                            <div className="li" onClick={() => { setFilter(true); setType("forum") }}>
                                <span className="material-symbols-outlined">workspaces</span>
                                <span className="font-p">{t("forum")}</span>
                            </div>

                            <div className="li" onClick={() => { setFilter(true); setType("department") }}>
                                <span className="material-symbols-outlined">location_on</span>
                                <span className="font-p">{t("departament")}</span>
                            </div>

                            <div className="li" onClick={() => { setFilter(true); setType("size") }}>
                                <span className="material-symbols-outlined">straighten</span>
                                <span className="font-p">{t("size")}</span>
                            </div>

                            <div className="li" onClick={() => { setFilter(true); setType("ppm") }}>
                                <span className="material-symbols-outlined">vpn_key</span>
                                <span className="font-p">{t("ppmCode")}</span>
                            </div>
                        </>
                    }

                    <div className="li" onClick={() => { setFilter(true); setType("code-demand") }}>
                        <span className="material-symbols-outlined">draft</span>
                        <span className="font-p">{t("demandCode")}</span>
                    </div>

                    <div className="li" onClick={() => { setFilter(true); setType("status") }}>
                        <span className="material-symbols-outlined">schedule</span>
                        <span className="font-p">{t("status")}</span>
                    </div>

                    {sendFilter()}

                </div>
            )
        } else if (url === 'proposals') {
            return (
                <div className="filter-modal modal">

                    <div className="li" onClick={() => { setFilter(true); setType("requester") }}>
                        <span className="material-symbols-outlined">person</span>
                        <span className="font-p">{t("requester")}</span>
                    </div>

                    <div className="li" onClick={() => { setFilter(true); setType("manager") }}>
                        <span className="material-symbols-outlined">manage_accounts</span>
                        <span className="font-p">{t("manager")}</span>
                    </div>

                    <div className="li" onClick={() => { setFilter(true); setType("forum") }}>
                        <span className="material-symbols-outlined">workspaces</span>
                        <span className="font-p">{t("forum")}</span>
                    </div>

                    <div className="li" onClick={() => { setFilter(true); setType("department") }}>
                        <span className="material-symbols-outlined">location_on</span>
                        <span className="font-p">{t("departament")}</span>
                    </div>

                    <div className="li" onClick={() => { setFilter(true); setType("size") }}>
                        <span className="material-symbols-outlined">straighten</span>
                        <span className="font-p">{t("size")}</span>
                    </div>

                    <div className="li" onClick={() => { setFilter(true); setType("ppm") }}>
                        <span className="material-symbols-outlined">vpn_key</span>
                        <span className="font-p">{t("ppmCode")}</span>
                    </div>

                    <div className="li" onClick={() => { setFilter(true); setType("code-proposal") }}>
                        <span className="material-symbols-outlined">draft</span>
                        <span className="font-p">{t("codeProposal")}</span>
                    </div>

                    {sendFilter()}

                </div>
            )
        } else if (url === 'agendas') {
            return (
                <div className="filter-modal modal">

                    <div className="li" onClick={() => { setFilter(true); setType("forum") }}>
                        <span className="material-symbols-outlined">workspaces</span>
                        <span className="font-p">{t("forum")}</span>
                    </div>

                    <div className="li" onClick={() => { setFilter(true); setType("code-agendas") }}>
                        <span className="material-symbols-outlined">draft</span>
                        <span className="font-p">{t("codeProposal")}</span>
                    </div>

                    {sendFilter()}

                </div>
            )
        } else {
            return (
                <div className="filter-modal modal">

                    <div className="li" onClick={() => { setFilter(true); setType("number-minutes") }}>
                        <span className="material-symbols-outlined">workspaces</span>
                        <span className="font-p">{t("numberMinutes")}</span>
                    </div>

                    <div className="li" onClick={() => { setFilter(true); setType("date") }}>
                        <span className="material-symbols-outlined">calendar_month</span>
                        <span className="font-p">{t("date")}</span>
                    </div>

                    <div className="li" onClick={() => { setFilter(true); setType("code-minutes") }}>
                        <span className="material-symbols-outlined">draft</span>
                        <span className="font-p">{t("codeMinutes")}</span>
                    </div>

                    {sendFilter()}

                </div>
            )
        }
    } else {

        if (url === "demands" || url === "proposals") {
            return (
                <div className="filter-modal modal">

                    <div className="li display-flex-space-between" onClick={() => sendOrder("score")}>
                        <div className="display-flex-align-center">
                            <span className="material-symbols-outlined">grade</span>
                            <span className="font-p">{t("score")}</span>
                        </div>



                        {filter === true && type === "score" &&
                            <span className="material-symbols-outlined mr5">
                                keyboard_double_arrow_up
                            </span>
                        }

                        {filter === true && type === "score-true" &&
                            <span className="material-symbols-outlined mr5">
                                keyboard_double_arrow_down
                            </span>
                        }
                    </div>

                    <div className="li display-flex-space-between" onClick={() => sendOrder("dates")}>
                        <div className="display-flex-align-center">
                            <span className="material-symbols-outlined">calendar_month</span>
                            <span className="font-p">{t("dates")}</span>
                        </div>

                        {filter === true && type === "dates" &&
                            <span className="material-symbols-outlined mr5">
                                keyboard_double_arrow_up
                            </span>
                        }

                        {filter === true && type === "dates-true" &&
                            <span className="material-symbols-outlined mr5">
                                keyboard_double_arrow_down
                            </span>
                        }
                    </div>

                    <div className="li display-flex-space-between" onClick={() => sendOrder("code")}>
                        <div className="display-flex-align-center">
                            <span className="material-symbols-outlined">draft</span>
                            <span className="font-p">{t("code")}</span>
                        </div>

                        {filter === true && type === "code" &&
                            <span className="material-symbols-outlined mr5">
                                keyboard_double_arrow_up
                            </span>
                        }

                        {filter === true && type === "code-true" &&
                            <span className="material-symbols-outlined mr5">
                                keyboard_double_arrow_down
                            </span>
                        }
                    </div>

                </div>
            )
        } else {
            return (
                <div className="filter-modal modal">

                    <div className="li display-flex-space-between" onClick={() => sendOrder("dates")}>
                        <div className="display-flex-align-center">
                            <span className="material-symbols-outlined">calendar_month</span>
                            <span className="font-p">{t("dates")}</span>
                        </div>

                        {filter === true && type === "dates" &&
                            <span className="material-symbols-outlined mr5">
                                keyboard_double_arrow_up
                            </span>
                        }

                        {filter === true && type === "dates-true" &&
                            <span className="material-symbols-outlined mr5">
                                keyboard_double_arrow_down
                            </span>
                        }
                    </div>

                    <div className="li display-flex-space-between" onClick={() => sendOrder("code")}>
                        <div className="display-flex-align-center">
                            <span className="material-symbols-outlined">draft</span>
                            <span className="font-p">{t("code")}</span>
                        </div>

                        {filter === true && type === "code" &&
                            <span className="material-symbols-outlined mr5">
                                keyboard_double_arrow_up
                            </span>
                        }

                        {filter === true && type === "code-true" &&
                            <span className="material-symbols-outlined mr5">
                                keyboard_double_arrow_down
                            </span>
                        }
                    </div>

                </div>
            )
        }
    }

}   