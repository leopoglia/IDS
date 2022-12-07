import "./style.css";
import { useState } from "react";

export default function Filter() {

    const url = window.location.pathname.split("/")[1];

    const [filter, setFilter] = useState(false);

    const sendFilter = () => {
        if (filter === true) {
            return (
                <div>
                    <div className="hr" />
                    <input type="text" placeholder="Insira o parametro aqui" />
                    <button className="btn-primary">Filtrar</button>
                </div>
            )
        }
    }

    if (url === 'demands') {
        return (
            <div className="filter-modal modal">
                <div className="li">
                    <span className="material-symbols-outlined">home</span>
                    <span>Minhas demandas</span>
                </div>

                <div className="li" onClick={() => { setFilter(true) }}>
                    <span className="material-symbols-outlined">person</span>
                    <span>Solicitante</span>
                </div>

                <div className="li" onClick={() => { setFilter(true) }}>
                    <span className="material-symbols-outlined">manage_accounts</span>
                    <span>Gerente</span>
                </div>

                <div className="li" onClick={() => { setFilter(true) }}>
                    <span className="material-symbols-outlined">workspaces</span>
                    <span>Forúm</span>
                </div>

                <div className="li" onClick={() => { setFilter(true) }}>
                    <span className="material-symbols-outlined">location_on</span>
                    <span>Departamento</span>
                </div>

                <div className="li" onClick={() => { setFilter(true) }}>
                    <span className="material-symbols-outlined">crop_free</span>
                    <span>Tamanho</span>
                </div>

                <div className="li" onClick={() => { setFilter(true) }}>
                    <span className="material-symbols-outlined">link</span>
                    <span>Código PPM</span>
                </div>

                <div className="li" onClick={() => { setFilter(true) }}>
                    <span className="material-symbols-outlined">draft</span>
                    <span>Código Demanda</span>
                </div>

                <div className="li" onClick={() => { setFilter(true) }}>
                    <span className="material-symbols-outlined">schedule</span>
                    <span>Status</span>
                </div>

                {sendFilter()}

            </div>
        )
    } else if (url === 'proposals') {
        return (
            <div className="filter-modal modal">

                <div className="li" onClick={() => { setFilter(true) }}>
                    <span className="material-symbols-outlined">person</span>
                    <span>Solicitante</span>
                </div>

                <div className="li" onClick={() => { setFilter(true) }}>
                    <span className="material-symbols-outlined">manage_accounts</span>
                    <span>Gerente</span>
                </div>

                <div className="li" onClick={() => { setFilter(true) }}>
                    <span className="material-symbols-outlined">workspaces</span>
                    <span>Forúm</span>
                </div>

                <div className="li" onClick={() => { setFilter(true) }}>
                    <span className="material-symbols-outlined">location_on</span>
                    <span>Departamento</span>
                </div>

                <div className="li" onClick={() => { setFilter(true) }}>
                    <span className="material-symbols-outlined">crop_free</span>
                    <span>Tamanho</span>
                </div>

                <div className="li" onClick={() => { setFilter(true) }}>
                    <span className="material-symbols-outlined">link</span>
                    <span>Código PPM</span>
                </div>

                <div className="li" onClick={() => { setFilter(true) }}>
                    <span className="material-symbols-outlined">draft</span>
                    <span>Código Proposta</span>
                </div>

                {sendFilter()}

            </div>
        )
    } else if (url === 'agendas') {
        return (
            <div className="filter-modal modal">

                <div className="li" onClick={() => { setFilter(true) }}>
                    <span className="material-symbols-outlined">workspaces</span>
                    <span>Forúm</span>
                </div>

                <div className="li" onClick={() => { setFilter(true) }}>
                    <span className="material-symbols-outlined">draft</span>
                    <span>Código Pauta</span>
                </div>

                {sendFilter()}

            </div>
        )
    } else {
        return (
            <div className="filter-modal modal">

                <div className="li" onClick={() => { setFilter(true) }}>
                    <span className="material-symbols-outlined">workspaces</span>
                    <span>Número ATA</span>
                </div>

                <div className="li" onClick={() => { setFilter(true) }}>
                    <span className="material-symbols-outlined">calendar_month</span>
                    <span>Data</span>
                </div>

                <div className="li" onClick={() => { setFilter(true) }}>
                    <span className="material-symbols-outlined">draft</span>
                    <span>Código ATA</span>
                </div>

                {sendFilter()}

            </div>
        )
    }

}   