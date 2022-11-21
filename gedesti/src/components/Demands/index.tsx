import "./style.css"
import Header from "../Fixed/Header"
import Nav from "../Fixed/Nav"
import Search from "../Fixed/Search";
import Demand from "./Demand";
import Footer from "../Fixed/Footer";
import { useState } from "react";
import Load from "../Fixed/Load";

export default function Demands() {

    const url = window.location.href.split("/");

    const [table, setTableList] = useState(false);

    const [demands, setDemands] = useState([]);
    const [proposals, setProposals] = useState([]);
    const [agendas, setAgendas] = useState([]);
    const [minutes, setMinutes] = useState([]);


    const footer = () => {
        return (
            <div>
                <div className="navigator" >
                    <div className="current">1</div>
                    <div>2</div>
                    <div>3</div>
                    <div>4</div>
                    <div>{">"}</div>
                </div >
                <Footer />
            </div >
        )
    }

    const setTable = () => {
        setTableList(!table);
    }

    return (
        <div>
            {(url[3] === "demands") ? (
                <div className="demands">
                    <Header icon="folder_copy" title="Demandas" />
                    <Nav />

                    <div className="container">
                        <Search nav="Demandas > Visualizar Demandas" title="Demandas" button="Criar Demanda" link="/demand/create/1" setTable={setTable} />
                        <Demand listDirection={table} />
                        {footer()}
                    </div>



                </div>

            ) : (url[3] === "proposals") ? (
                <div className="proposals">
                    <Header icon="content_paste" title="Propostas" />
                    <Nav />
                    <div className="container">
                        <Search nav="Propostas > Visualizar Propostas" title="Propostas" button="Criar Proposta" link="/demands" setTable={setTable} />
                        <Demand listDirection={table} />
                        {footer()}
                    </div>
                </div>
            ) : (url[3] === "agendas") ? (
                <div className="agendas">
                    <Header icon="file_copy" title="Pautas" />
                    <Nav />
                    <div className="container">
                        <Search nav="Pautas > Visualizar Pautas" title="Pautas" button="Criar Pauta" link="/agenda/create" setTable={setTable} />
                        <Demand listDirection={table} />
                        {footer()}
                    </div>
                </div>
            ) : (url[3] === "minutes") ? (
                <div className="minutes">
                    <Header icon="description" title="Atas" />
                    <Nav />
                    <div className="container">
                        <Search nav="Atas > Visualizar Atas" title="Atas" button="Criar Ata" link="/minutes/create" setTable={setTable} />
                        <Demand listDirection={table} />
                        {footer()}
                    </div>
                </div>
            ) : (
                <div className="null" />
            )
            }

        </div>

    )

}