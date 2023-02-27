import "./style.css"
import Header from "../../../Fixed/Header"
import Nav from "../../../Fixed/Nav"
import Search from "../../../Fixed/Search";
import Demand from "../Demand";
import Footer from "../../../Fixed/Footer";
import { useEffect, useState } from "react";
import { t } from "i18next"
import Load from "../../../Fixed/Load";
import ServicesDemand from "../../../../services/demandService";
import ServicesProposal from "../../../../services/proposalService";
import ServicesAgenda from "../../../../services/agendaService";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function Demands() {
    const url = window.location.href.split("/");
    let findDemands: any;


    const [table, setTableList] = useState(false); // Estado para mostrar a tabela de demandas
    const [search, setSearch]: any = useState(""); // Retorno do campo de busca de demandas


    // Entra na página e busca as demandas cadastradas
    useEffect(() => {


        if (url[3] === "demands") {
            getDemands(); // Busca as demandas cadastradas
        } else if (url[3] === "proposals") {
            getProposals(); // Busca as demandas cadastradas
        } else if (url[3] === "agendas") {
            getAgendas(); // Busca as demandas cadastradas
        }


        // Verifica se a rota da página anterior é a de cadastro de demanda
        if (localStorage.getItem("route") === "create-demand") {
            localStorage.removeItem("route");
            notify();
        }
    }, [url[3]])


    // Buscar as demandas cadastradas
    async function getDemands() {
        findDemands = await ServicesDemand.findAll().then((res: any) => {
            setDemands(res); // Atualiza o estado das demandas
        });
        return findDemands;
    }

    // Buscar as propostas cadastradas
    async function getProposals() {
        findDemands = await ServicesProposal.findAll().then((res: any) => {
            setProposals(res); // Atualiza o estado das demandas
        });
        return findDemands;
    }

    // Buscar as pautas cadastradas
    async function getAgendas() {
        findDemands = await ServicesAgenda.findAll().then((res: any) => {
            setAgendas(res); // Atualiza o estado das demandas
        });
        return findDemands;
    }

    const [demands, setDemands] = useState([
        { demandCode: 0, demandTitle: "", requesterRegistration: { workerName: "" }, demandDate: "", demandStatus: "" }
    ]);

    const [proposals, setProposals] = useState([
        { proposalCode: "", demand: { demandTitle: "", requesterRegistration: { workerName: "" }, demandDate: "" }, proposalTitle: "", requesterRegistration: { workerName: "" }, responsibleAnalyst: { workerName: "" }, proposalDate: "", proposalStatus: "" },
        { name: "Proposta 001", requester: "Leonardo Heitor Poglia", analyst: "Vytor Augusto Rosa", date: "27/04/2022", situation: "Approved" },
        { name: "Proposta 001", requester: "Leonardo Heitor Poglia", analyst: "Vytor Augusto Rosa", date: "27/04/2022", situation: "Rejected" },
        { name: "Proposta 001", requester: "Leonardo Heitor Poglia", analyst: "Vytor Augusto Rosa", date: "27/04/2022", situation: "Pending" },

    ]);
    const [agendas, setAgendas] = useState([
        { agendaCode: "", sequentialNumber: 0, yearAgenda: 0 },
    ]);
    const [minutes] = useState([
        { minuteCode: "1", name: "Ata 001", date: "27/04/2022", situation: "unallocated", number: "10/2021", director: "Vytor Augusto Rosa", coordinator: "Leonardo Heitor Poglia" },
    ]);

    // Função para mostrar o navigator
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

    // Função para setar o estado da tabela
    const setTable = () => {
        setTableList(!table);
    }

    const [minute, setMinute] = useState(false);
    const [nameFilter, setName] = useState<string>(""); // Busca o que foi digitado no input do filtro
    const [typeFilter, setType] = useState<string>(""); // Busca qual filtro foi selecionado

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
                    <Header />
                    <Nav />
                    <div className="container">

                        <Search setSearch={setSearch} onClick={callback} name={nameFilter} setType={setType} nav={t("demandsViewDemands")} title="demands" button="createDemand" link="/demand/create/1" setTable={setTable} />
                        <div className="container-background">
                            {
                                demands.map((val, index) => {
                                    if ((nameFilter === "" || nameFilter === undefined) && (typeFilter === "" || typeFilter === undefined) && (search === "")) {
                                        return (
                                            <Demand demandCode={val.demandCode} listDirection={table} name={val.demandTitle} requester={val.requesterRegistration.workerName} date={val.demandDate} situation={val.demandStatus} type="demand" />
                                        );
                                    } else {

                                        if (search !== "" && val.demandTitle.toUpperCase().includes(search.toUpperCase())) {
                                            return (<Demand demandCode={val.demandCode} listDirection={table} name={val.demandTitle} requester={val.requesterRegistration.workerName} date={val.demandDate} situation={val.demandStatus} type="demand" />);
                                        }

                                        if (typeFilter === "requester" && val.requesterRegistration.workerName.toUpperCase().includes(nameFilter.toUpperCase())) {
                                            return (<Demand demandCode={val.demandCode} listDirection={table} name={val.demandTitle} requester={val.requesterRegistration.workerName} date={val.demandDate} situation={val.demandStatus} type="demand" />);
                                        }
                                    }
                                })
                            }
                        </div>

                        {demands.length === 0 && (
                            <div className="no-results">
                                <h1>{t("noResults")}</h1>
                            </div>
                        )}

                        {footer()}
                    </div>
                </div>
            ) : (url[3] === "proposals") ? (
                <div className="proposals">
                    <Header />
                    <Nav />
                    <div className="container">
                        <Search onClick={callback} name={nameFilter} type={typeFilter} nav={t("proposalViewProposal")} title="proposals" button="createProposal" link="/demands" setTable={setTable} />
                        <div className="container-background">
                            {
                                proposals.map((val, index) => {
                                    return (
                                        <Demand listDirection={table} demandCode={val.proposalCode} name={val.demand?.demandTitle} requester={val.demand?.requesterRegistration.workerName} analyst={val.responsibleAnalyst?.workerName} date={val.demand?.demandDate} situation={val.proposalStatus} type="proposal" />
                                    );
                                })
                            }
                        </div>
                        {footer()}
                    </div>
                </div>
            ) : (url[3] === "agendas") ? (
                <div className="agendas">
                    <Header />
                    <Nav />
                    <div className="container">
                        <Search onClick={callback} name={nameFilter} type={typeFilter} nav={t("agendaViewAgenda")} title="agendas" button="createAgenda" link="/agenda/create" setTable={setTable} />
                        <div className="container-background">
                            {
                                agendas.map((val, index) => {
                                    return (
                                        <Demand listDirection={table} name={"Pauta da reunião  " + val.agendaCode} demandCode={val.agendaCode} number={val.sequentialNumber} year={val.yearAgenda} type="agenda" />
                                    );
                                })
                            }
                        </div>
                        {footer()}
                    </div>
                </div>
            ) : (url[3] === "minutes") ? (
                <div className="minutes">
                    <Header />
                    <Nav />
                    <div className="container">
                        <Search onClick={callback} name={nameFilter} type={typeFilter} nav={t("minuteViewMinute")} title="minutes" button="createMinute" link="/agendas" setTable={setTable} />
                        <div className="container-background">
                            {
                                minutes.map((val, index) => {
                                    return (
                                        <div onClick={() => setMinute(true)}>
                                            <Demand listDirection={table} demandCode={val.minuteCode} name={val.name} director={val.director} coordinator={val.coordinator} number={val.number} date={val.date} situation={val.situation} type="minute" />
                                        </div>
                                    );
                                })
                            }
                        </div>
                        {footer()}
                    </div>
                </div>
            ) : (<div className="null" />)
            }

            <ToastContainer position="bottom-right" newestOnTop />


        </div>
    )
}

// Função para notificar o usuário que a demanda foi cadastrada
const notify = () => {
    toast.success('Demanda cadastrada!', {
        position: "bottom-right",
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
};