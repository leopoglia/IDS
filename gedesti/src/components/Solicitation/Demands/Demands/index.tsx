import "./style.css"
import Header from "../../../Fixed/Header"
import Nav from "../../../Fixed/Nav"
import Search from "../../../Fixed/Search";
import Demand from "../Demand";
import Footer from "../../../Fixed/Footer";
import { useEffect, useState } from "react";
import { t } from "i18next"
import Load from "../../../Fixed/Load";
import Services from "../../../../services/demandService";
import { findAllByAltText } from "@testing-library/react";

export default function Demands() {
    const url = window.location.href.split("/");
    let findDemands:any;
    const [table, setTableList] = useState(false);

    async function getDemands(){
        findDemands = await Services.findAll().then((res:any) => {
            setDemands(res);
        });
        return findDemands;
    }

    useEffect(() => {
        getDemands();
    })

    const [demands, setDemands] = useState([
        { demandTitle: "Sistema para calcular o SCORE", requesterRegistration: {workerName: "Leonardo Heitor Poglia"}, demandDate: "27/04/2022", demandStatus: "Backlog" },
        { demandTitle: "Calculadora de custos para projeto de demandas", requesterRegistration: {workerName: "Vytor Augusto Rosa"}, demandDate: "21/11/2022", demandStatus: "Assesment" },
        { demandTitle: "Programa que identifica falhas de proteção constantes no Gitlab", requesterRegistration: {workerName: "Eduarda B"}, demandDate: "21/11/2022", demandStatus: "Business Case" },
        { demandTitle: "Projeto para inovações", requesterRegistration: {workerName: "Ester G"}, demandDate: "21/11/2022", demandStatus: "To-do" },
        { demandTitle: "Alterar custo de uso do projeto GEDESTI", requesterRegistration: {workerName: "Romário H"}, demandDate: "21/11/2022", demandStatus: "Design and Build" },
        { demandTitle: "Nova área de leitura online", requesterRegistration: {workerName: "Josué do Amarante"}, demandDate: "21/11/2022", demandStatus: "Cancelled" },
        { demandTitle: "GPS para se localizar na fabrica", requesterRegistration: {workerName: "Tati"}, demandDate: "21/11/2022", demandStatus: "Support" },
        { demandTitle: "Sistema para solicitação de demandas de TI", requesterRegistration: {workerName: "Jair"}, demandDate: "21/11/2022", demandStatus: "Done" }
    ]);

    const [proposals] = useState([
        { name: "Proposta 001", requester: "Leonardo Heitor Poglia", analyst: "Vytor Augusto Rosa", date: "27/04/2022", situation: "Approved" },
        { name: "Proposta 001", requester: "Leonardo Heitor Poglia", analyst: "Vytor Augusto Rosa", date: "27/04/2022", situation: "Rejected" },
        { name: "Proposta 001", requester: "Leonardo Heitor Poglia", analyst: "Vytor Augusto Rosa", date: "27/04/2022", situation: "Pending" },

    ]);
    const [agendas] = useState([
        { name: "Pauta 001", requester: "Leonardo Heitor Poglia", analyst: "Vytor Augusto Rosa", date: "27/04/2022", situation: "unallocated" },
    ]);
    const [minutes] = useState([
        { name: "Ata 001", date: "27/04/2022", situation: "unallocated", number: "10/2021", director: "Vytor Augusto Rosa", coordinator: "Leonardo Heitor Poglia" },
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

    const [minute, setMinute] = useState(false);

    const [nameFilter, setName] = useState<string>("")
    const [typeFilter, setType] = useState<string>("")
    const callback = (name: string, type: string) => {
        setName(name)
        setType(type)
    }

    return (
        <div>
            {minute && (
                <div className="background-minute" onClick={() => setMinute(false)}>
                    <div className="minute">

                        <iframe src="https://drive.google.com/file/d/1-Mb9GlWMegsrv8po3Ra-PL3x8WqpancP/preview" width="640" height="480" allow="autoplay"></iframe>

                    </div>
                </div>
            )}

            {(url[3] === "demands") ? (
                <div className="demands">
                    <Header icon="folder_copy" title="demands" />
                    <Nav />
                    <div className="container">

                        <Search onClick={callback} name={nameFilter} type={typeFilter} nav={t("demandsViewDemands")} title="demands" button="createDemand" link="/demand/create/1" setTable={setTable} />
                        {
                            demands.map((val, index) => {
                                if ((nameFilter === "" || nameFilter === undefined) && (typeFilter === "" || typeFilter === undefined)) {
                                    return (
                                        <Demand listDirection={table} name={val.demandTitle} requester={val.requesterRegistration.workerName} date={val.demandDate} situation={val.demandStatus} type="demand" />
                                    );
                                } else {
                                    if (typeFilter === "requester" && val.requesterRegistration.workerName.toUpperCase().includes(nameFilter.toUpperCase())) {
                                        return (
                                            <Demand listDirection={table} name={val.demandTitle} requester={val.requesterRegistration.workerName} date={val.demandDate} situation={val.demandStatus} type="demand" />
                                        );
                                    }
                                }
                            })
                        }
                        {footer()}
                    </div>
                </div>
            ) : (url[3] === "proposals") ? (
                <div className="proposals">
                    <Header icon="content_paste" title="proposals" />
                    <Nav />
                    <div className="container">
                        <Search onClick={callback} name={nameFilter} type={typeFilter} nav={t("proposalViewProposal")} title="proposals" button="createProposal" link="/demands" setTable={setTable} />
                        {
                            proposals.map((val, index) => {
                                return (
                                    <Demand listDirection={table} name={val.name} requester={val.requester} analyst={val.analyst} date={val.date} situation={val.situation} type="proposal" />
                                );
                            })
                        }
                        {footer()}
                    </div>
                </div>
            ) : (url[3] === "agendas") ? (
                <div className="agendas">
                    <Header icon="file_copy" title="agendas" />
                    <Nav />
                    <div className="container">
                        <Search onClick={callback} name={nameFilter} type={typeFilter} nav={t("agendaViewAgenda")} title="agendas" button="createAgenda" link="/agenda/create" setTable={setTable} />
                        {
                            agendas.map((val, index) => {
                                return (
                                    <Demand listDirection={table} name={val.name} requester={val.requester} analyst={val.analyst} date={val.date} situation={val.situation} type="agenda" />
                                );
                            })
                        }
                        {footer()}
                    </div>
                </div>
            ) : (url[3] === "minutes") ? (
                <div className="minutes">
                    <Header icon="description" title="minutes" />
                    <Nav />
                    <div className="container">
                        <Search onClick={callback} name={nameFilter} type={typeFilter} nav={t("minuteViewMinute")} title="minutes" button="createMinute" link="/agendas" setTable={setTable} />
                        {
                            minutes.map((val, index) => {
                                return (
                                    <div onClick={() => setMinute(true)}>
                                        <Demand listDirection={table} name={val.name} director={val.director} coordinator={val.coordinator} number={val.number} date={val.date} situation={val.situation} type="minute" />
                                    </div>
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