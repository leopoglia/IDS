import "./style.css";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

export interface FilterProps {
    onClick: (name: string | undefined, type: string) => void
}

export default function Filter(props: FilterProps) {

    const { t } = useTranslation();

    const url = window.location.pathname.split("/")[1];
    const [filter, setFilter] = useState(false);
    const [type, setType] = useState<string>("")

    const sendFilter = () => {
        if (filter === true) {
            return (
                <div className="send-filter">
                    <div className="hr" />

                    <input onChange={onButtonPress} type="text" ref={inputName} placeholder="Insira o parametro aqui" />

                    <button onClick={onButtonPress} className="btn-primary">Filtrar</button>

                </div>
            )
        }
    }

    const inputName = useRef<HTMLInputElement>(null)
    const onButtonPress = () => {
        console.log(inputName?.current?.value)
        console.log(type)
        props.onClick(inputName?.current?.value, type)
    }

    if (url === 'demands') {
        return (
            <div className="filter-modal modal">

                <div className="li">
                    <span className="material-symbols-outlined" onClick={() => {  setFilter(true); setType("home") }}>home</span>
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