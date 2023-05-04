import "./style.css"
import Search from "../../../Fixed/Search";
import Demand from "./Card";
import Footer from "../../../Fixed/Footer";
import { useEffect, useState } from "react";
import Load from "../../../Fixed/Load";
import ServicesDemand from "../../../../services/demandService";
import ServicesProposal from "../../../../services/proposalService";
import ServicesAgenda from "../../../../services/agendaService";
import ServicesMinute from "../../../../services/minuteService";
import { ToastContainer } from 'react-toastify';
import { useTranslation } from "react-i18next";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Presentation from "./Presentation";
import Notification from "../../../../utils/notifyUtil";

export default function Demands() {
    const url = window.location.href.split("/");
    let findDemands: any;
    let navigate = useNavigate();
    const { t } = useTranslation();

    const [presentation, setPresentation] = useState(localStorage.getItem("presentation") === "true" ? true : false);

    const [table, setTableList] = useState(false); // Estado para mostrar a tabela de demandas
    const [search, setSearch]: any = useState(""); // Retorno do campo de busca de demandas
    let page: any = url[4]
    const [pages, setPages] = useState(0); // Quantidade de páginas

    const [demands, setDemands] = useState([]);
    const [proposals, setProposals] = useState([]);
    const [agendas, setAgendas] = useState([]);
    const [minutes, setMinutes] = useState([]);

    const [loading, setLoading] = useState(true);

    // Entra na página e busca as demandas cadastradas
    useEffect(() => {
        setLoading(true);
        if (url[3] === "demands") {
            if (search === "") {
                getDemands(); // Busca as demandas cadastradas
            } else {
                ServicesDemand.findAll().then((res: any) => {
                    setDemands(res);
                });
            }
        } else if (url[3] === "proposals") {
            if (search === "") {
                getProposals(); // Busca as demandas cadastradas
            } else {
                ServicesProposal.findAll().then((res: any) => {
                    setProposals(res);
                });
            }
        } else if (url[3] === "agendas") {
            if (search === "") {
                getAgendas(); // Busca as demandas cadastradas
            } else {
                ServicesAgenda.findAll().then((res: any) => {
                    setAgendas(res);
                });
            }
        } else if (url[3] === "minutes") {
            if (search === "") {
                getMinutes(); // Busca as demandas cadastradas
            } else {
                ServicesMinute.findAll().then((res: any) => {
                    setMinutes(res);
                });
            }
        }


        // Verifica se a rota da página anterior é a de cadastro de demanda
        if (localStorage.getItem("route") === "create-demand") {
            localStorage.removeItem("route");
            Notification.success(t("demandCreateSuccess"));
        }
    }, [url[3], page])

    // Buscar as demandas cadastradas
    async function getDemands() {
        if (table === false) {
            findDemands = await ServicesDemand.findByPage(page, 5).then(async (res: any) => {
                let demandsContent = res.content; // Atualiza o estado das demandas
                setPages(res.totalPages); // Atualiza o estado das páginas

                let proposalsContent: any = await ServicesProposal.findAll();

                demandsContent.map((demand: any) => {
                    if (demand.demandStatus === "Assesment") {
                        proposalsContent.map((proposal: any) => {

                            if (proposal.demand.demandCode === demand.demandCode) {
                                demand.proposalCode = proposal.proposalCode;
                            }
                        })
                    }

                    return demand;
                })

                setDemands(demandsContent);
            });
        } else {
            findDemands = await ServicesDemand.findByPage(page, 9).then(async (res: any) => {
                let demandsContent = res.content; // Atualiza o estado das demandas
                setPages(res.totalPages); // Atualiza o estado das páginas

                let totalDemands: any = 0;

                await ServicesProposal.findAll().then((res: any) => {
                    totalDemands = res.length;
                })

                if (demandsContent.length === 0) {
                    navigate("/demands/" + (Math.ceil((totalDemands / 9) + 1)));
                }

                let proposalsContent: any = await ServicesProposal.findAll();


                demandsContent.map((demand: any) => {
                    if (demand.demandStatus === "Assesment") {
                        proposalsContent.map((proposal: any) => {

                            if (proposal.demand.demandCode === demand.demandCode) {
                                demand.proposalCode = proposal.proposalCode;
                            }
                        })
                    }

                    return demand;


                })
                setDemands(demandsContent);
            });
        }
        setLoading(false);

        return findDemands;
    }

    // Buscar as propostas cadastradas
    async function getProposals() {
        findDemands = await ServicesProposal.findByPage(page, 5).then((res: any) => {
            setProposals(res.content); // Atualiza o estado das demandas
            setPages(res.totalPages); // Atualiza o estado das páginas
        });
        setLoading(false);
        return findDemands;
    }

    // Buscar as pautas cadastradas
    async function getAgendas() {
        findDemands = await ServicesAgenda.findByPage(page, 5).then((res: any) => {
            setAgendas(res.content); // Atualiza o estado das demandas
            setPages(res.totalPages); // Atualiza o estado das páginas
        });
        setLoading(false);
        return findDemands;
    }

    //Buscar as atas cadastradas
    async function getMinutes() {
        findDemands = await ServicesMinute.findByPage(page, 5).then((res: any) => {
            setMinutes(res.content); // Atualiza o estado das demandas
            setPages(res.totalPages); // Atualiza o estado das páginas
        });
        setLoading(false);
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
        } else if (url[3] === "minutes") {
            nav = minutes.length;
        }

        return (
            <div className="h45">
                {search === "" && pages > 1 && (
                    <div className="navigator">
                        {page > 1 ? (
                            <div onClick={() => {
                                navigate("/" + url[3] + "/" + (parseInt(page) - 1));
                            }}>{"<"}</div>
                        ) : (
                            <div className="arrow-disabled">{"<"}</div>
                        )}
                        {[...Array(pages)].map((_, index) => {
                            const pageNumber = index + 1;
                            const distance = Math.abs(pageNumber - page);
                            const showPage = distance <= 1 || pageNumber === 1 || pageNumber === pages;
                            return showPage ? (
                                <div
                                    key={pageNumber}
                                    className={pageNumber === parseInt(page) ? "current" : ""}
                                    onClick={() => navigate(`/${url[3]}/${pageNumber}`)}
                                >
                                    {pageNumber}
                                </div>
                            ) : (
                                null
                            );
                        })}
                        {page < pages ? (
                            <div onClick={() => {
                                navigate("/" + url[3] + "/" + (parseInt(page) + 1));
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

    const [minute, setMinute] = useState(false); // Verifica se a página é de ata
    const [nameFilter, setName] = useState<string>(""); // Busca o que foi digitado no input do filtro
    const [typeFilter, setType] = useState<string>(""); // Busca qual filtro foi selecionado

    const callback = (name: string, type: string) => {
        setName(name)
        setType(type)
    }

    const closePresentation = () => {
        setPresentation(false);
        localStorage.removeItem("presentation");
    }

    const noResult = () => {
        return (
            <div className="no-results">
                <h1>{t("noResults")}</h1>
            </div>
        )
    }

    return (
        <div className="solicitation">

            {(url[3] === "demands") ? (

                <div className="demands">
                    {presentation && (
                        <div>
                            <Presentation />
                            <button onClick={() => { closePresentation() }} className="btn-secondary btn-presentation">
                                <div className="material-symbols-outlined">
                                    close
                                </div>
                            </button>
                        </div>)}

                    
                    <div className="container">

                        <Search setSearch={setSearch} onClick={callback} name={nameFilter} type={typeFilter} setTable={setTable} nav={t("demandsViewDemands")} title="demands" button="createDemand" link="/demand/create/1" />
                        <div className="container-background">
                            {
                                demands.map((val: any, index) => {
                                    if ((nameFilter === "" || nameFilter === undefined) && (typeFilter === "" || typeFilter === undefined) && (search === "")) {
                                        return (
                                            <Demand key={val.demandCode} demandCode={val.demandCode} listDirection={table} name={val.demandTitle} requester={val?.requesterRegistration?.workerName} date={val.demandDate} situation={val.demandStatus} proposalCode={val.proposalCode} type="demand" />
                                        );

                                    } else {

                                        if (search !== "") {

                                            if (val.demandTitle.toUpperCase().includes(search.toUpperCase())) {
                                                return (<Demand key={val.demandCode} demandCode={val.demandCode} listDirection={table} name={val.demandTitle} requester={val?.requesterRegistration?.workerName} date={val.demandDate} situation={val.demandStatus} proposalCode={val.proposalCode} type="demand" />);

                                            } else if (index === demands.length - 1) {
                                                return noResult();
                                            }
                                        }


                                        if (typeFilter === "requester" && val.requesterRegistration.workerName.toUpperCase().includes(nameFilter.toUpperCase())) {
                                            return (<Demand key={val.demandCode} demandCode={val.demandCode} listDirection={table} name={val.demandTitle} requester={val?.requesterRegistration?.workerName} date={val.demandDate} situation={val.demandStatus} proposalCode={val.proposalCode} type="demand" />);
                                        } else if (typeFilter === "status" && val.demandStatus.toUpperCase().includes(nameFilter.toUpperCase())) {
                                            return (<Demand key={val.demandCode} demandCode={val.demandCode} listDirection={table} name={val.demandTitle} requester={val?.requesterRegistration?.workerName} date={val.demandDate} situation={val.demandStatus} proposalCode={val.proposalCode} type="demand" />);
                                        } else if (index === demands.length - 1) {
                                            return noResult();
                                        }
                                    }
                                })
                            }


                            {demands.length === 0 && loading === true && <Load />}

                            {demands.length === 0 && loading === false && noResult()}

                        </div>

                        {footer()}

                        <Footer />

                    </div>
                </div>

            ) : (url[3] === "proposals") ? (
                <div className="proposals">

                    <div className="container">
                        <Search setSearch={setSearch} onClick={callback} name={nameFilter} type={typeFilter} setTable={setTable} nav={t("proposalViewProposal")} title="proposals" button="createProposal" link="/demands/1" />
                        <div className="container-background">
                            {
                                proposals.map((val: any, index) => {
                                    if ((nameFilter === "" || nameFilter === undefined) && (typeFilter === "" || typeFilter === undefined) && (search === "")) {
                                        return (
                                            <Demand key={val.proposalCode} listDirection={table} demandCode={val.proposalCode} name={val.demand?.demandTitle} requester={val.demand?.requesterRegistration.workerName} analyst={val.responsibleAnalyst?.workerName} date={val.demand?.demandDate} situation={val.proposalStatus} type="proposal" />
                                        );
                                    } else if (search !== "") {

                                        if (val.demand?.demandTitle.toUpperCase().includes(search.toUpperCase())) {
                                            return (<Demand key={val.proposalCode} listDirection={table} demandCode={val.proposalCode} name={val.demand?.demandTitle} requester={val.demand?.requesterRegistration.workerName} analyst={val.responsibleAnalyst?.workerName} date={val.demand?.demandDate} situation={val.proposalStatus} type="proposal" />);
                                        } else {
                                            return noResult();
                                        }
                                    } else {
                                        return noResult();
                                    }

                                })
                            }

                            {proposals.length === 0 && loading === true && <Load />}

                            {proposals.length === 0 && loading === false && noResult()}
                        </div>
                        {footer()}

                        <Footer />

                    </div>
                </div>
            ) : (url[3] === "agendas") ? (
                <div className="agendas">
                    
                    <div className="container">
                        <Search setSearch={setSearch} onClick={callback} name={nameFilter} type={typeFilter} setTipe={setType} setTable={setTable} nav={t("agendaViewAgenda")} title="agendas" button="createAgenda" link="/agenda/create" />
                        <div className="container-background">
                            {
                                agendas.map((val: any, index) => {
                                    if ((nameFilter === "" || nameFilter === undefined) && (typeFilter === "" || typeFilter === undefined) && (search === "")) {
                                        return (
                                            <Demand key={val.agendaCode} val={val.agendaCode} listDirection={table} name={"Pauta da reunião  " + val.agendaCode} demandCode={val.agendaCode} date={val.agendaDate} number={val.sequentialNumber} year={val.yearAgenda} type="agenda" />
                                        );
                                    } else if (search !== "") {
                                        if (val.agendaCode.toString().includes(search)) {
                                            return (
                                                <Demand key={val.agendaCode} val={val.agendaCode} listDirection={table} name={"Pauta da reunião  " + val.agendaCode} demandCode={val.agendaCode} date={val.agendaDate} number={val.sequentialNumber} year={val.yearAgenda} type="agenda" />
                                            );
                                        } else {
                                            return noResult();
                                        }
                                    }
                                })
                            }

                            {agendas.length === 0 && loading === true && <Load />}

                            {agendas.length === 0 && loading === false && noResult()}
                            
                        </div>

                        {footer()}

                        <Footer />

                    </div>

                </div>
            ) : (url[3] === "minutes") ? (
                <div className="minutes">
                  
                    <div className="container">
                        <Search onClick={callback} name={nameFilter} type={typeFilter} setType={setType} nav={t("minuteViewMinute")} title="minutes" button="createMinute" link="/agendas/1" setTable={setTable} />
                        <div className="container-background">
                            {
                                minutes.map((val: any, index) => {
                                    if ((nameFilter === "" || nameFilter === undefined) && (typeFilter === "" || typeFilter === undefined) && (search === "")) {
                                        return (
                                            <Demand key={val.minuteCode} listDirection={table} name={val.minuteName} demandCode={val.minuteCode} director={val.director?.workerName} number={val.minuteCode} date={val.minuteStartDate} type="minute" />
                                        );
                                    } else if (search !== "") {
                                        if (val.minuteCode.toString().includes(search)) {
                                            return (
                                                <Demand key={val.minuteCode} listDirection={table} name={val.minuteName} demandCode={val.minuteCode} director={val.director?.workerName} number={val.minuteCode} date={val.minuteStartDate} type="minute" />
                                            );
                                        } else {
                                            return noResult();
                                        }
                                    }
                                })
                            }

                            {minutes.length === 0 && loading === true && <Load />}

                            {minutes.length === 0 && loading === false && noResult()}

                        </div>
                        {footer()}

                        <Footer />

                    </div>
                </div>
            ) : (<div className="null" />)
            }

            {minute && (
                <div className="background-minute" onClick={() => setMinute(false)}>
                    <div className="minute">

                        <iframe src="https://drive.google.com/file/d/1-Mb9GlWMegsrv8po3Ra-PL3x8WqpancP/preview" width="640" height="480" allow="autoplay"></iframe>

                    </div>
                </div>
            )}

            <ToastContainer position="bottom-right" newestOnTop />
        </div>
    )
}