import "./style.css"
import Header from "../../../Fixed/Header"
import Nav from "../../../Fixed/Nav"
import Search from "../../../Fixed/Search";
import Demand from "../Demand";
import Footer from "../../../Fixed/Footer";
import { useState } from "react";
import Load from "../../../Fixed/Load";

export default function Demands() {

    const url = window.location.href.split("/");

    const [table, setTableList] = useState(false);

    const [demands] = useState([
        { name: "Solicitação 001", requester: "Leonardo Heitor Poglia", date: "27/04/2022", situation: "Backlog" },
        { name: "Solicitação 002", requester: "Vytor Augusto Rosa", date: "21/11/2022", situation: "Assesment" },
        { name: "Solicitação 002", requester: "Vytor Augusto Rosa", date: "21/11/2022", situation: "Business Case" },
        { name: "Solicitação 002", requester: "Vytor Augusto Rosa", date: "21/11/2022", situation: "To-do" },
        { name: "Solicitação 002", requester: "Vytor Augusto Rosa", date: "21/11/2022", situation: "Design and Build" },
        { name: "Solicitação 002", requester: "Vytor Augusto Rosa", date: "21/11/2022", situation: "Cancelled" },
        { name: "Solicitação 002", requester: "Vytor Augusto Rosa", date: "21/11/2022", situation: "Support" },
        { name: "Solicitação 002", requester: "Vytor Augusto Rosa", date: "21/11/2022", situation: "Done" },
    ]);
    const [proposals] = useState([
        { name: "Proposta 001", requester: "Leonardo Heitor Poglia", date: "27/04/2022", situation: "unallocated" },
    ]);
    const [agendas] = useState([
        { name: "Pauta 001", requester: "Leonardo Heitor Poglia", date: "27/04/2022", situation: "unallocated" },
    ]);
    const [minutes] = useState([
        { name: "Ata 001", requester: "Leonardo Heitor Poglia", date: "27/04/2022", situation: "unallocated" },
    ]);

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
                        {
                            demands.map((val, index) => {
                                return (
                                    <Demand listDirection={table} name={val.name} requester={val.requester} date={val.date} situation={val.situation} type="demand" />
                                );
                            })
                        }
                        {footer()}
                    </div>
                </div>
            ) : (url[3] === "proposals") ? (
                <div className="proposals">
                    <Header icon="content_paste" title="Propostas" />
                    <Nav />
                    <div className="container">
                        <Search nav="Propostas > Visualizar Propostas" title="Propostas" button="Criar Proposta" link="/demands" setTable={setTable} />
                        {
                            proposals.map((val, index) => {
                                return (
                                    <Demand listDirection={table} name={val.name} requester={val.requester} date={val.date} situation={val.situation} type="proposal" />
                                );
                            })
                        }
                        {footer()}
                    </div>
                </div>
            ) : (url[3] === "agendas") ? (
                <div className="agendas">
                    <Header icon="file_copy" title="Pautas" />
                    <Nav />
                    <div className="container">
                        <Search nav="Pautas > Visualizar Pautas" title="Pautas" button="Criar Pauta" link="/agenda/create" setTable={setTable} />
                        {
                            agendas.map((val, index) => {
                                return (
                                    <Demand listDirection={table} name={val.name} requester={val.requester} date={val.date} situation={val.situation} type="agenda" />
                                );
                            })
                        }
                        {footer()}
                    </div>
                </div>
            ) : (url[3] === "minutes") ? (
                <div className="minutes">
                    <Header icon="description" title="Atas" />
                    <Nav />
                    <div className="container">
                        <Search nav="Atas > Visualizar Atas" title="Atas" button="Criar Ata" link="/minutes/create" setTable={setTable} />
                        {
                            minutes.map((val, index) => {
                                return (
                                    <Demand listDirection={table} name={val.name} requester={val.requester} date={val.date} situation={val.situation} type="minute" />
                                );
                            })
                        }
                        {footer()}
                    </div>
                </div>
            ) : (<div className="null" />)
            }
        </div>
    )
}