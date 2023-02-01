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
import { toast, ToastContainer, TypeOptions } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function Demands() {
    const url = window.location.href.split("/");
    let findDemands: any;


    const [table, setTableList] = useState(false); // Estado para mostrar a tabela de demandas
    const [search, setSearch]: any = useState(""); // Retorno do campo de busca de demandas


    // Entra na página e busca as demandas cadastradas
    useEffect(() => {
        getDemands(); // Busca as demandas cadastradas

        // Verifica se a rota da página anterior é a de cadastro de demanda
        if (localStorage.getItem("route") === "create-demand") {
            localStorage.removeItem("route");
            notify();
        }
    }, [])


    // Buscar as demandas cadastradas
    async function getDemands() {
        findDemands = await Services.findAll().then((res: any) => {
            setDemands(res); // Atualiza o estado das demandas
        });
        return findDemands;
    }

    const [demands, setDemands] = useState([
        { demandCode: 1, demandTitle: "Sistema para calcular o SCORE", requesterRegistration: { workerName: "Leonardo Heitor Poglia" }, demandDate: "27/04/2022", demandStatus: "Backlog" },
        { demandCode: 2, demandTitle: "Calculadora de custos para projeto de demandas", requesterRegistration: { workerName: "Vytor Augusto Rosa" }, demandDate: "21/11/2022", demandStatus: "Assesment" },
        { demandCode: 3, demandTitle: "Programa que identifica falhas de proteção constantes no Gitlab", requesterRegistration: { workerName: "Eduarda B" }, demandDate: "21/11/2022", demandStatus: "Business Case" },
        { demandCode: 4, demandTitle: "Projeto para inovações", requesterRegistration: { workerName: "Ester G" }, demandDate: "21/11/2022", demandStatus: "To-do" },
        { demandCode: 5, demandTitle: "Alterar custo de uso do projeto GEDESTI", requesterRegistration: { workerName: "Romário H" }, demandDate: "21/11/2022", demandStatus: "Design and Build" },
        { demandCode: 6, demandTitle: "Nova área de leitura online", requesterRegistration: { workerName: "Josué do Amarante" }, demandDate: "21/11/2022", demandStatus: "Cancelled" },
        { demandCode: 7, demandTitle: "GPS para se localizar na fabrica", requesterRegistration: { workerName: "Tati" }, demandDate: "21/11/2022", demandStatus: "Support" },
        { demandCode: 8, demandTitle: "Sistema para solicitação de demandas de TI", requesterRegistration: { workerName: "Jair" }, demandDate: "21/11/2022", demandStatus: "Done" }
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
                    <Header icon="folder_copy" title="demands" />
                    <Nav />
                    <div className="container">

                        <Search setSearch={setSearch} onClick={callback} name={nameFilter} type={typeFilter} nav={t("demandsViewDemands")} title="demands" button="createDemand" link="/demand/create/1" setTable={setTable} />
                        {
                            demands.map((val, index) => {
                                if ((nameFilter === "" || nameFilter === undefined) && (typeFilter === "" || typeFilter === undefined) && (search === "")) {
                                    return (
                                        <Demand demandCode={val.demandCode} listDirection={table} name={val.demandTitle} requester={val.requesterRegistration.workerName} date={val.demandDate} situation={val.demandStatus} type="demand" />
                                    );
                                } else {

                                    if (search !== "" && val.demandTitle.toUpperCase().includes(search.toUpperCase())) {
                                        return (
                                            <Demand demandCode={val.demandCode} listDirection={table} name={val.demandTitle} requester={val.requesterRegistration.workerName} date={val.demandDate} situation={val.demandStatus} type="demand" />
                                        );
                                    }

                                    if (typeFilter === "requester" && val.requesterRegistration.workerName.toUpperCase().includes(nameFilter.toUpperCase())) {
                                        return (
                                            <Demand demandCode={val.demandCode} listDirection={table} name={val.demandTitle} requester={val.requesterRegistration.workerName} date={val.demandDate} situation={val.demandStatus} type="demand" />
                                        );
                                    }
                                }
                            })
                        }

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