import "./style.css";
import { useRef, useState } from "react";

export interface FilterProps {
    onClick: (name: string | undefined, type: string) => void
}

export default function Filter(props: FilterProps) {

    const url = window.location.pathname.split("/")[1];
    const [filter, setFilter] = useState(false);
    const [type, setType] = useState<string>("")

    const sendFilter = () => {
        if (filter === true) {
            return (
                <div>
                    <div className="hr" />

                    <input type="text" ref={inputName} placeholder="Insira o parametro aqui" />

                    <button onClick={onButtonPress} className="btn-primary">Filtrar</button>

                </div>
            )
        }
    }

    const inputName = useRef<HTMLInputElement>(null)
    const onButtonPress = () => {
        props.onClick(inputName?.current?.value, type)
    }

    if (url === 'demands') {
        return (
            <div className="filter-modal modal">

                <div className="li">
                    <span className="material-symbols-outlined" onClick={() => { setType("home") }}>home</span>
                    <span>Minhas demandas</span>
                </div>

                <div className="li" onClick={() => { setFilter(true); setType("requester") }}>
                    <span className="material-symbols-outlined">person</span>
                    <span>Solicitante</span>
                </div>

                <div className="li" onClick={() => { setFilter(true); setType("manager") }}>
                    <span className="material-symbols-outlined">manage_accounts</span>
                    <span>Gerente</span>
                </div>

                <div className="li" onClick={() => { setFilter(true); setType("forum") }}>
                    <span className="material-symbols-outlined">workspaces</span>
                    <span>Forúm</span>
                </div>

                <div className="li" onClick={() => { setFilter(true); setType("department") }}>
                    <span className="material-symbols-outlined">location_on</span>
                    <span>Departamento</span>
                </div>

                <div className="li" onClick={() => { setFilter(true); setType("size") }}>
                    <span className="material-symbols-outlined">crop_free</span>
                    <span>Tamanho</span>
                </div>

                <div className="li" onClick={() => { setFilter(true); setType("ppm") }}>
                    <span className="material-symbols-outlined">link</span>
                    <span>Código PPM</span>
                </div>

                <div className="li" onClick={() => { setFilter(true); setType("code-demand") }}>
                    <span className="material-symbols-outlined">draft</span>
                    <span>Código Demanda</span>
                </div>

                <div className="li" onClick={() => { setFilter(true); setType("status") }}>
                    <span className="material-symbols-outlined">schedule</span>
                    <span>Status</span>
                </div>

                {sendFilter()}

            </div>
        )
    } else if (url === 'proposals') {
        return (
            <div className="filter-modal modal">

                <div className="li" onClick={() => { setFilter(true); setType("requester") }}>
                    <span className="material-symbols-outlined">person</span>
                    <span>Solicitante</span>
                </div>

                <div className="li" onClick={() => { setFilter(true); setType("manager") }}>
                    <span className="material-symbols-outlined">manage_accounts</span>
                    <span>Gerente</span>
                </div>

                <div className="li" onClick={() => { setFilter(true); setType("forum") }}>
                    <span className="material-symbols-outlined">workspaces</span>
                    <span>Forúm</span>
                </div>

                <div className="li" onClick={() => { setFilter(true); setType("department") }}>
                    <span className="material-symbols-outlined">location_on</span>
                    <span>Departamento</span>
                </div>

                <div className="li" onClick={() => { setFilter(true); setType("size") }}>
                    <span className="material-symbols-outlined">crop_free</span>
                    <span>Tamanho</span>
                </div>

                <div className="li" onClick={() => { setFilter(true); setType("ppm") }}>
                    <span className="material-symbols-outlined">link</span>
                    <span>Código PPM</span>
                </div>

                <div className="li" onClick={() => { setFilter(true); setType("code-proposal") }}>
                    <span className="material-symbols-outlined">draft</span>
                    <span>Código Proposta</span>
                </div>

                {sendFilter()}

            </div>
        )
    } else if (url === 'agendas') {
        return (
            <div className="filter-modal modal">

                <div className="li" onClick={() => { setFilter(true); setType("forum") }}>
                    <span className="material-symbols-outlined">workspaces</span>
                    <span>Forúm</span>
                </div>

                <div className="li" onClick={() => { setFilter(true); setType("code-agendas") }}>
                    <span className="material-symbols-outlined">draft</span>
                    <span>Código Pauta</span>
                </div>

                {sendFilter()}

            </div>
        )
    } else {
        return (
            <div className="filter-modal modal">

                <div className="li" onClick={() => { setFilter(true); setType("number-minutes") }}>
                    <span className="material-symbols-outlined">workspaces</span>
                    <span>Número ATA</span>
                </div>

                <div className="li" onClick={() => { setFilter(true); setType("date") }}>
                    <span className="material-symbols-outlined">calendar_month</span>
                    <span>Data</span>
                </div>

                <div className="li" onClick={() => { setFilter(true); setType("code-minutes") }}>
                    <span className="material-symbols-outlined">draft</span>
                    <span>Código ATA</span>
                </div>

                {sendFilter()}

            </div>
        )
    }

}   