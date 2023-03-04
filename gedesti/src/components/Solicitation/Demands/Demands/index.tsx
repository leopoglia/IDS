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
import { useNavigate } from "react-router-dom";

export default function Demands() {
    const url = window.location.href.split("/");
    let findDemands: any;
    let navigate = useNavigate();


    const [table, setTableList] = useState(false); // Estado para mostrar a tabela de demandas
    const [search, setSearch]: any = useState(""); // Retorno do campo de busca de demandas
    const page: any = url[4]
    const [pages, setPages] = useState(0); // Quantidade de páginas

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



    // Entra na página e busca as demandas cadastradas
    useEffect(() => {
        if (url[3] === "demands") {
            if (search === "") {
                getDemands(); // Busca as demandas cadastradas
            } else {
                ServicesDemand.findAll().then((res: any) => {
                    setDemands(res);
                });
            }
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

    }, [url[3], page, search])


    // Buscar as demandas cadastradas
    async function getDemands() {
        findDemands = await ServicesDemand.findByPage(page, 5).then((res: any) => {
            setDemands(res.content); // Atualiza o estado das demandas
            setPages(res.totalPages); // Atualiza o estado das páginas
        });
        return findDemands;
    }

    // Buscar as propostas cadastradas
    async function getProposals() {
        findDemands = await ServicesProposal.findAll().then((res: any) => {
            setProposals(res); // Atualiza o estado das demandas
            setPages(res.totalPages); // Atualiza o estado das páginas
        });
        return findDemands;
    }

    // Buscar as pautas cadastradas
    async function getAgendas() {
        findDemands = await ServicesAgenda.findAll().then((res: any) => {
            setAgendas(res); // Atualiza o estado das demandas
            setPages(res.totalPages); // Atualiza o estado das páginas
        });
        return findDemands;
    }


    // Função para mostrar o navigator
    const footer = () => {

        let nav: any;

        if (url[3] === "demands") {
            nav = demands.length;
        } else if (url[3] === "proposals") {
            nav = proposals.length;
        } else if (url[3] === "agendas") {
            nav = agendas.length;
        }

        return (
            <div className="h45">
                {search === "" && pages > 1 && (
                    <div className="navigator">
                        {page > 1 ? (
                            <div onClick={() => {
                                navigate("/demands/" + (parseInt(page) - 1));
                            }}>{"<"}</div>
                        ) : (
                            <div className="arrow-disabled">{"<"}</div>
                        )}
                        {[...Array(pages)].map((_, index) => {
                            const pageNumber = index + 1;
                            return (
                                <div
                                    key={pageNumber}
                                    className={pageNumber === parseInt(page) ? "current" : ""}
                                    onClick={() => navigate(`/demands/${pageNumber}`)}
                                >
                                    {pageNumber}
                                </div>
                            );
                        })}
                        {page < pages ? (
                            <div onClick={() => {
                                navigate("/demands/" + (parseInt(page) + 1));
                            }}>{">"}</div>
                        ) : (
                            <div className="arrow-disabled">{">"}</div>
                        )}
                    </div>
                )}
            </div>

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
        <div className="solicitation">
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
                                            <Demand key={val.demandCode} demandCode={val.demandCode} listDirection={table} name={val.demandTitle} requester={val.requesterRegistration.workerName} date={val.demandDate} situation={val.demandStatus} type="demand" />
                                        );
                                    } else {

                                        if (search !== "") {

                                            if (val.demandTitle.toUpperCase().includes(search.toUpperCase())) {
                                                return (<Demand key={val.demandCode} demandCode={val.demandCode} listDirection={table} name={val.demandTitle} requester={val.requesterRegistration.workerName} date={val.demandDate} situation={val.demandStatus} type="demand" />);

                                            } else if (index === demands.length - 1) {
                                                return (
                                                    <div className="no-results">
                                                        <h1>{t("noResults")}</h1>
                                                    </div>
                                                );

                                            }
                                        }


                                        if (typeFilter === "requester" && val.requesterRegistration.workerName.toUpperCase().includes(nameFilter.toUpperCase())) {
                                            return (<Demand key={val.demandCode} demandCode={val.demandCode} listDirection={table} name={val.demandTitle} requester={val.requesterRegistration.workerName} date={val.demandDate} situation={val.demandStatus} type="demand" />);
                                        }
                                    }
                                })
                            }

                            {demands.length === 0 && (
                                <div className="no-results">
                                    <h1>{t("noResults")}</h1>
                                </div>
                            )}
                        </div>

                        {
                            footer()
                        }

                        <Footer />

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
                                        <Demand key={val.proposalCode} listDirection={table} demandCode={val.proposalCode} name={val.demand?.demandTitle} requester={val.demand?.requesterRegistration.workerName} analyst={val.responsibleAnalyst?.workerName} date={val.demand?.demandDate} situation={val.proposalStatus} type="proposal" />
                                    );
                                })
                            }

                            {proposals.length === 0 && (
                                <div className="no-results">
                                    <h1>{t("noResults")}</h1>
                                </div>
                            )}
                        </div>
                        {footer()}

                        <Footer />

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
                                        <Demand val={val.agendaCode} listDirection={table} name={"Pauta da reunião  " + val.agendaCode} demandCode={val.agendaCode} number={val.sequentialNumber} year={val.yearAgenda} type="agenda" />
                                    );
                                })
                            }

                            {agendas.length === 0 && (
                                <div className="no-results">
                                    <h1>{t("noResults")}</h1>
                                </div>
                            )}
                        </div>



                        {footer()}

                        <Footer />

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
                                            <Demand key={val.minuteCode} listDirection={table} demandCode={val.minuteCode} name={val.name} director={val.director} coordinator={val.coordinator} number={val.number} date={val.date} situation={val.situation} type="minute" />
                                        </div>
                                    );
                                })
                            }
                        </div>
                        {footer()}

                        <Footer />

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