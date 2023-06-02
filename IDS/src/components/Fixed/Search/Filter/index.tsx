import { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import SelectStatus from "./SelectStatus";
import UserContext from "../../../../context/userContext";
import "./style.css";

export interface FilterProps {
    onClick: (name: string | undefined, type: string) => void
}

export default function Filter(props: FilterProps) {

    const { t } = useTranslation();

    let worker: any = useContext(UserContext).worker;

    const url = window.location.pathname.split("/")[1];
    const [filter, setFilter] = useState(false);
    const [type, setType] = useState<string>("");

    const [status, setStatus] = useState<string>("");

    useEffect(() => {
        onButtonPressSelect();
    }, [status])

    const sendFilter = () => {



        if ((type !== "status" && filter === true) && (type !== "size" && filter === true) && (type !== "date" && filter === true)) {
            return (
                <div className="send-filter">
                    <div className="hr" />

                    {type !== "home" &&

                        <input className="input" onChange={onButtonPress} type="text" ref={inputName} placeholder="Insira o parametro aqui" />

                    }

                    <button onClick={onButtonPress} className="btn-primary">Filtrar</button>

                </div>
            )
        } else if (filter === true && (type === "status" || type === "size")) {

            let arraySelect: string[] = [];

            if (type === "status") {
                arraySelect = ["Backlog", "BacklogRanked", "BacklogEdit", "BacklogRankApproved", "BacklogComplement", "Assesment"];
            } else if (type === "size") {
                arraySelect = ["Muito pequeno", "Pequeno", "Médio", "Grande", "Muito grande"];
            }

            return (
                <div className="send-filter">
                    <div className="hr" />

                    <SelectStatus status={status} setStatus={setStatus} array={arraySelect} />

                    <button onClick={onButtonPressSelect} className="btn-primary">Filtrar</button>

                </div>
            )
        } else if (filter === true && type === "date") {

            return (
                <div className="send-filter">
                    <div className="hr" />


                    <input className="input" onChange={onButtonPress} type="date" ref={inputName} placeholder="Insira o parametro aqui" />


                    <button onClick={onButtonPress} className="btn-primary">Filtrar</button>

                </div>
            )
        }
    }

    const inputName = useRef<HTMLInputElement>(null)
    const onButtonPress = () => {
        props.onClick(inputName?.current?.value, type)
    }

    const onButtonPressSelect = () => {
        props.onClick(status, type);

    }

    const onButtonPressHome = () => {
        props.onClick(worker.name, "home")
    }

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
                    <span className="material-symbols-outlined">crop_free</span>
                    <span className="font-p">{t("size")}</span>
                </div>

                <div className="li" onClick={() => { setFilter(true); setType("ppm") }}>
                    <span className="material-symbols-outlined">link</span>
                    <span className="font-p">{t("ppmCode")}</span>
                </div>

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
                    <span className="material-symbols-outlined">crop_free</span>
                    <span className="font-p">{t("size")}</span>
                </div>

                <div className="li" onClick={() => { setFilter(true); setType("ppm") }}>
                    <span className="material-symbols-outlined">link</span>
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

}   