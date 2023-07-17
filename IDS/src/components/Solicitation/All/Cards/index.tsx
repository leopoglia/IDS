import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Steps } from "intro.js-react";

import Search from "../../../Fixed/Search";
import Card from "./Card";
import Footer from "../../../Fixed/Footer";
import Load from "../../../Fixed/Load";
import ServicesDemand from "../../../../services/demandService";
import ServicesProposal from "../../../../services/proposalService";
import ServicesAgenda from "../../../../services/agendaService";
import ServicesMinute from "../../../../services/minuteService";
import ServicesReproach from "../../../../services/reproachService";
import Presentation from "./Presentation";
import Notification from "../../../../utils/notifyUtil";
import othersUtil from "../../../../utils/othersUtil";
import filtersUtil from "../../../../utils/filtersUtil";
import "./style.css"
import UserContext from "../../../../context/userContext";
import presentationUtil from "../../../../utils/presentationUtil";
import Calendar from "./Calendar";



export default function Demands() {
    const url = window.location.href.split("/");
    let findDemands: any;
    let page: any = url[4]


    let navigate = useNavigate();
    const { t } = useTranslation();
    const { worker, setWorker } = useContext(UserContext);
    const [presentation, setPresentation] = useState(localStorage.getItem("presentation") === "true" ? true : false); // Estado para mostrar a apresentação
    const [table, setTableList] = useState(false); // Estado para mostrar a tabela de demandas
    const [search, setSearch]: any = useState(""); // Retorno do campo de busca de demandas
    const [pages, setPages] = useState(0); // Quantidade de páginas
    const [calendar, setCalendar] = useState(false); // Estado para mostrar o calendário

    const [demands, setDemands] = useState([]);
    const [proposals, setProposals] = useState([]);
    const [agendas, setAgendas] = useState([]);
    const [minutes, setMinutes] = useState([]);


    const [nameFilter, setName] = useState<string>(""); // Busca o que foi digitado no input do filtro
    const [typeFilter, setType] = useState<string>(""); // Busca qual filtro foi selecionado
    const [filterOn, setFilterOn] = useState(false);
    const [customFilterObject, setCustomFilterObject] = useState<any>({}); // Busca o objeto de filtro personalizado

    const [demandsSize, setDemandsSize] = useState(0);
    const [loading, setLoading] = useState(true);

    // Entra na página e busca as demandas cadastradas
    useEffect(() => {
        setLoading(true);

        if (url[3] === "demands") {

            if (search === "" && typeFilter === "" && nameFilter === "" && !othersUtil.verifyObject(customFilterObject)) {

                getDemands(); // Busca as demandas cadastradas
            } else {
                if (nameFilter !== "score" && nameFilter !== "dates" && nameFilter !== "code" && othersUtil.verifyObject(customFilterObject)) {

                    ServicesDemand.findAll().then(async (demands: any) => {

                        await demands.map(async (demand: any) => {
                            await ServicesProposal.findByDemandCode(demand.demandCode).then(async (proposal: any) => {
                                if (proposal?.demand?.demandCode === demand?.demandCode) {
                                    demand.proposal = proposal;
                                }
                                return demand;
                            });
                        });

                        setDemands(demands);
                        setPages(0);
                        setLoading(false);
                    });
                } else {
                    ServicesDemand.order(nameFilter, typeFilter).then(async (demands: any) => {
                        setDemands(demands);
                        setLoading(false);
                    });
                }
            }
        } else if (url[3] === "proposals") {
            if (search === "" && typeFilter === "" && !othersUtil.verifyObject(customFilterObject)) {
                getProposals(); // Busca as demandas cadastradas
            } else {
                if (nameFilter !== "score" && nameFilter !== "dates" && nameFilter !== "code" && othersUtil.verifyObject(customFilterObject)) {
                    ServicesProposal.findAll().then(async (proposals: any) => {
                        setProposals(proposals);
                        setLoading(false);
                    });
                } else {
                    ServicesProposal.order(nameFilter, typeFilter).then(async (proposals: any) => {
                        setProposals(proposals);
                    });
                }
            }
        } else if (url[3] === "agendas") {
            if (search === "" && typeFilter === "" && !othersUtil.verifyObject(customFilterObject)) {
                getAgendas(); // Busca as demandas cadastradas
            } else {
                if (nameFilter !== "dates" && nameFilter !== "code" && othersUtil.verifyObject(customFilterObject)) {
                    ServicesAgenda.findAll().then((agendas: any) => {
                        setAgendas(agendas);
                    });
                } else {
                    ServicesAgenda.order(nameFilter, typeFilter).then((agendas: any) => {
                        setAgendas(agendas);
                    });
                }
            }
        } else if (url[3] === "minutes") {
            if (search === "" && typeFilter === "" && !othersUtil.verifyObject(customFilterObject)) {
                getMinutes(); // Busca as demandas cadastradas
            } else {
                if (nameFilter !== "dates" && nameFilter !== "code" && othersUtil.verifyObject(customFilterObject)) {
                    ServicesMinute.findAll().then((minutes: any) => {
                        setMinutes(minutes);
                    });
                } else {
                    ServicesMinute.order(nameFilter, typeFilter).then((minutes: any) => {
                        setMinutes(minutes);
                    });
                }
            }
        }
        // Verifica se a rota da página anterior é a de cadastro de demanda
        if (localStorage.getItem("route") === "create-demand") {
            localStorage.removeItem("route");
            Notification.success(t("demandCreateSuccess"));
        }
    }, [url[3], page, search, table, nameFilter, typeFilter, worker.office, worker.department, customFilterObject])


    // Buscar as demandas cadastradas
    async function getDemands() {

        if (worker.office !== "business") {
            if (worker.office !== "requester") {
                if (table === false) {
                    findDemands = await ServicesDemand.findByPage(page, 5).then(async (res: any) => {
                        let demandsContent = res.content; // Atualiza o estado das demandas

                        let proposalsContent: any = await ServicesProposal.findAll(); // Busca as propostas cadastradas
                        addProposal(demandsContent, proposalsContent); // Adiciona as propostas nas demandas
                        setLoadingFalse(res); // Desativa o loading
                        setPages(res.totalPages); // Atualiza o estado das páginas
                    });
                } else {
                    findDemands = await ServicesDemand.findByPage(page, 9).then(async (res: any) => {
                        let demandsContent = res.content; // Atualiza o estado das demandas
                        let totalDemands: any = 0;

                        await ServicesProposal.findAll().then((res: any) => {
                            totalDemands = res.length;
                        })

                        if (demandsContent.length === 0) {
                            navigate("/demands/" + (Math.ceil((totalDemands / 9) + 1)));
                            setLoading(false);
                        }

                        let proposalsContent: any = await ServicesProposal.findAll();
                        addProposal(demandsContent, proposalsContent);
                        setPages(res.totalPages); // Atualiza o estado das páginas
                    });
                }
            } else {
                if (table === false) {
                    findDemands = await ServicesDemand.findByDepartment(worker.department, page, 5).then(async (res: any) => {
                        let demandsContent = res.content; // Atualiza o estado das demandas

                        let proposalsContent: any = await ServicesProposal.findAll(); // Busca as propostas cadastradas
                        addProposal(demandsContent, proposalsContent); // Adiciona as propostas nas demandas
                        setLoadingFalse(res); // Desativa o loading
                        setPages(res.totalPages); // Atualiza o estado das páginas
                    });
                } else {
                    findDemands = await ServicesDemand.findByDepartment(worker.department, page, 9).then(async (res: any) => {
                        let demandsContent = res.content; // Atualiza o estado das demandas
                        let totalDemands: any = 0;

                        await ServicesProposal.findAll().then((res: any) => {
                            totalDemands = res.length;
                        })

                        if (demandsContent.length === 0) {
                            navigate("/demands/" + (Math.ceil((totalDemands / 9) + 1)));
                            setLoading(false);
                        }

                        let proposalsContent: any = await ServicesProposal.findAll();
                        addProposal(demandsContent, proposalsContent);
                        setPages(res.totalPages); // Atualiza o estado das páginas
                    });
                }
            }
        } else {
            if (table === false) {
                findDemands = await ServicesDemand.findAllManager(page, 5).then(async (res: any) => {
                    let demandsContent = res.content; // Atualiza o estado das demandas

                    let proposalsContent: any = await ServicesProposal.findAll(); // Busca as propostas cadastradas
                    addProposal(demandsContent, proposalsContent); // Adiciona as propostas nas demandas
                    setLoadingFalse(res); // Desativa o loading
                    setPages(res.totalPages); // Atualiza o estado das páginas
                });
            } else {
                findDemands = await ServicesDemand.findAllManager(page, 9).then(async (res: any) => {
                    let demandsContent = res.content; // Atualiza o estado das demandas
                    let totalDemands: any = 0;

                    await ServicesProposal.findAll().then((res: any) => {
                        totalDemands = res.length;
                    })

                    if (demandsContent.length === 0) {
                        navigate("/demands/" + (Math.ceil((totalDemands / 9) + 1)));
                        setLoading(false);
                    }

                    let proposalsContent: any = await ServicesProposal.findAll();
                    addProposal(demandsContent, proposalsContent);
                    setPages(res.totalPages); // Atualiza o estado das páginas
                });
            }
        }

        return findDemands;
    }

    // Buscar as propostas cadastradas
    async function getProposals() {
        findDemands = await ServicesProposal.findByPage(page, 5).then((res: any) => {
            addAgenda(res.content);
            setPages(res.totalPages); // Atualiza o estado das páginas
            setLoadingFalse(res);
        });

        return findDemands;
    }

    // Buscar as pautas cadastradas
    async function getAgendas() {
        findDemands = await ServicesAgenda.findByPage(page, 5).then((res: any) => {
            setAgendas(res.content); // Atualiza o estado das demandas
            setPages(res.totalPages); // Atualiza o estado das páginas
            setLoadingFalse(res);
        });

        return findDemands;
    }


    // Buscar as atas cadastradas
    async function getMinutes() {
        findDemands = await ServicesMinute.findByPage(page, 5).then((res: any) => {
            setMinutes(res.content); // Atualiza o estado das demandas
            setPages(res.totalPages); // Atualiza o estado das páginas
            setLoadingFalse(res)
        });

        return findDemands;
    }

    // Função para deixar o loading falso quando tiver carregado
    async function setLoadingFalse(res: any) {
        if (res?.content?.length === 0) {
            setLoading(false);
        }
    }

    // Função para adicionar o código da proposta na demanda
    const addProposal = async (demandsContent: any, proposalsContent: any) => {

        await demandsContent.map(async (demand: any) => {
            if (demand.demandStatus === "Assesment") {
                proposalsContent.map(async (proposal: any) => {

                    if (proposal?.demand?.demandCode === demand?.demandCode) {
                        demand.proposalCode = proposal.proposalCode;

                        await ServicesAgenda.findByProposals(proposal.proposalCode).then((agenda: any) => {
                            demand.forum = agenda.commission;
                        })
                    }
                })
            }
            return demand;
        })

        setDemands(demandsContent); // Atualiza o estado das demandas
        setLoading(false); // Desativa o loading
    }

    const addAgenda = async (proposalContent: any) => {

        if (proposalContent.length !== undefined) {
            proposalContent.map(async (proposal: any) => {
                await ServicesAgenda.findByProposals(proposal.proposalCode).then((agenda: any) => {
                    proposal.forum = agenda.commission;
                })
                return proposal;
            })
        }

        setProposals(proposalContent);
        setLoading(false);
    }

    // Função para setar o estado da tabela
    const setTable = () => {
        setTableList(!table);
    }

    const callback = (name: string, type: string) => {
        setName(name)
        setType(type)
    }

    const noResult = () => {
        if (url[3] === "demands") {
            return (
                <div className="no-results">
                    <span className="material-symbols-outlined">draft</span>
                    <h1>{t("noResults")}</h1>
                </div>
            )
        } else if (url[3] === "proposals") {
            return (
                <div className="no-results">
                    <span className="material-symbols-outlined">request_quote</span>
                    <h1>{t("noResults")}</h1>
                </div>
            )
        } else if (url[3] === "agendas") {
            return (
                <div className="no-results">
                    <span className="material-symbols-outlined">folder</span>
                    <h1>{t("noResults")}</h1>
                </div>
            )
        } else if (url[3] === "minutes") {
            return (
                <div className="no-results">
                    <span className="material-symbols-outlined">file_present</span>
                    <h1>{t("noResults")}</h1>
                </div>
            )
        }
    }

    return (
        <div className="solicitation">

            {/* <Calendar /> */}

            {(url[3] === "demands") ? (

                <div className="demands">
                    {presentation && (
                        <Presentation setPresentation={setPresentation} />
                    )}


                    <div className="container">

                        <Search setSearch={setSearch} search={search} solicitationType="demand" onClick={callback} name={nameFilter} solicitation={demands} type={typeFilter} setTable={setTable} setName={setName} setType={setType} setFilterOn={setFilterOn} nav={t("demandsViewDemands")} setCustomFilterObject={setCustomFilterObject} customFilterObject={customFilterObject} title="demands" button="createDemand" link="/demand/create/1" />
                        <div className={"container-background boxNoPadding-" + table}>


                            {
                                demands.filter((val: any) => {
                                    if (filtersUtil.demand(nameFilter, typeFilter, search, val, customFilterObject)) { return true } else { return false }
                                }).map((val: any, index: number) => {

                                    if (index === demands.length - 1 && index === 8) {


                                        return (
                                            <div className="demand-last">
                                                <Card key={index} id={index} demandCode={val.demandCode} listDirection={table} name={val.demandTitle}
                                                    requester={val?.requesterRegistration?.workerName} date={val.demandDate} situation={val.demandStatus}
                                                    proposalCode={val.proposalCode} demandVersion={val.demandVersion} score={val?.score} type="demand" />
                                            </div>
                                        )
                                    } else {
                                        return (
                                            <Card key={index} id={index} demandCode={val.demandCode} listDirection={table} name={val.demandTitle}
                                                requester={val?.requesterRegistration?.workerName} date={val.demandDate} situation={val.demandStatus}
                                                proposalCode={val.proposalCode} demandVersion={val.demandVersion} score={val?.score} type="demand" />
                                        )
                                    }
                                })

                            }

                            {(demands.filter((val: any) => { if (filtersUtil.demand(nameFilter, typeFilter, search, val, customFilterObject)) { return true } else { return false } }).length === 0 && loading === false ? noResult() : null)}

                            {demands.length === 0 && loading === true && <Load />}


                        </div>

                        {othersUtil.footer(url, demands, proposals, agendas, minutes, search, typeFilter, pages, page, navigate, demandsSize, table)}

                        <Footer />

                    </div>
                </div>

            ) : (url[3] === "proposals") ? (
                <div className="proposals">

                    <div className="container">
                        <Search setSearch={setSearch} solicitation={proposals} solicitationType="proposal" search={search} onClick={callback} name={nameFilter} type={typeFilter} setTable={setTable} setName={setName} setType={setType} nav={t("proposalViewProposal")} setCustomFilterObject={setCustomFilterObject} customFilterObject={customFilterObject} title="proposals" button="createProposal" link="/demands/1" />
                        <div className={"container-background boxNoPadding-" + table}>
                            {
                                proposals.filter((val: any) => {
                                    if (filtersUtil.proposal(nameFilter, typeFilter, search, val, customFilterObject)) { return true } else { return false }
                                }).map((val: any, index: any) => (
                                    <Card
                                        key={index} listDirection={table} demandCode={val.proposalCode}
                                        name={val.demand?.demandTitle} requester={val.demand?.requesterRegistration.workerName} analyst={val.responsibleAnalyst?.workerName}
                                        date={val.demand?.demandDate} situation={val.proposalStatus} type="proposal"
                                    />
                                ))
                            }

                            {(proposals.filter((val: any) => { if (filtersUtil.proposal(nameFilter, typeFilter, search, val, customFilterObject)) { return true } else { return false } }).length === 0 && loading === false ? noResult() : null)}


                            {proposals.length === 0 && loading === true && <Load />}

                        </div>
                        {othersUtil.footer(url, demands, proposals, agendas, minutes, search, typeFilter, pages, page, navigate, demandsSize, table)}

                        <Footer />

                    </div>
                </div>
            ) : (url[3] === "agendas") ? (
                <div className="agendas">

                    {calendar &&
                        <Calendar setCalendar={setCalendar} calendar={calendar} />
                    }

                    <div className="container">
                        <Search setSearch={setSearch} search={search} solicitation={agendas} solicitationType="agenda" onClick={callback} name={nameFilter} type={typeFilter} setTipe={setType} setTable={setTable} setCalendar={setCalendar} calendar={calendar} setName={setName} setType={setType} nav={t("agendaViewAgenda")} setCustomFilterObject={setCustomFilterObject} customFilterObject={customFilterObject} title="agendas" button="createAgenda" link="/agenda/create" />
                        <div className={"container-background boxNoPadding-" + table}>
                            {
                                agendas
                                    .filter((val: any) => {
                                        if (filtersUtil.agenda(nameFilter, typeFilter, search, val, customFilterObject)) { return true } else { return false }
                                    })
                                    .map((val: any, index: any) => (
                                        <Card
                                            key={index} val={val.agendaCode} agenda={val} listDirection={table}
                                            name={(val.commission.commissionName.split("–")[1]).toUpperCase() + " – " + val.agendaDate} demandCode={val.agendaCode} date={val.agendaDate}
                                            requester={val.analistRegistry?.workerName}
                                            number={val.sequentialNumber} year={val.initialDate} type="agenda"
                                        />
                                    ))
                            }

                            {(agendas.filter((val: any) => { if (filtersUtil.agenda(nameFilter, typeFilter, search, val, customFilterObject)) { return true } else { return false } }).length === 0 && loading === false ? noResult() : null)}


                            {agendas.length === 0 && loading === true && <Load />}

                        </div>

                        {othersUtil.footer(url, demands, proposals, agendas, minutes, search, typeFilter, pages, page, navigate, demandsSize, table)}

                        <Footer />

                    </div>

                </div>
            ) : (url[3] === "minutes") ? (
                <div className="minutes">

                    <div className="container">

                        <Search onClick={callback} setSearch={setSearch} solicitation={minutes} solicitationType="minute" search={search} name={nameFilter} type={typeFilter} nav={t("minuteViewMinute")} setCustomFilterObject={setCustomFilterObject} customFilterObject={customFilterObject} title="minutes" button="createMinute" link="/agendas/1" setTable={setTable} setName={setName} setType={setType} />
                        <div className={"container-background boxNoPadding-" + table}>
                            {
                                minutes
                                    .filter((val: any) => {
                                        if (filtersUtil.minutes(nameFilter, typeFilter, search, val, t, customFilterObject)) { return true } else { return false }
                                    })
                                    .map((val: any, index: any) => (
                                        <Card
                                            key={index}
                                            listDirection={table}
                                            name={(t(val.minuteType) + " – " + val.agenda.commission.commissionName.split("–")[1]).toUpperCase()}
                                            demandCode={val.minuteCode}
                                            director={val.director?.workerName}
                                            number={val.minuteCode}
                                            date={val.minuteStartDate}
                                            comission={val.comission}
                                            situation={val.minuteType}
                                            type="minute"
                                        />
                                    ))
                            }

                            {minutes.length === 0 && loading === true && <Load />}

                            {(minutes.filter((val: any) => { if (filtersUtil.minutes(nameFilter, typeFilter, search, val, t, customFilterObject)) { return true } else { return false } }).length === 0 && loading === false ? noResult() : null)}

                        </div>
                        {othersUtil.footer(url, demands, proposals, agendas, minutes, search, typeFilter, pages, page, navigate, demandsSize, table)}

                        <Footer />

                    </div>
                </div>
            ) : (<div className="null" />)
            }


            {url[3] === "demands" &&
                <Steps
                    enabled={worker.presentation}
                    steps={presentationUtil?.steps()}
                    initialStep={0}
                    onExit={presentationUtil?.onExit(worker, setWorker)}
                    onAfterChange={(e) => presentationUtil?.complete(e, navigate)}
                />
            }
        </div>
    )
}