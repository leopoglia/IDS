import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import Search from "../../../Fixed/Search";
import Demand from "./Card";
import Footer from "../../../Fixed/Footer";
import Load from "../../../Fixed/Load";
import ServicesDemand from "../../../../services/demandService";
import ServicesProposal from "../../../../services/proposalService";
import ServicesAgenda from "../../../../services/agendaService";
import ServicesMinute from "../../../../services/minuteService";
import Presentation from "./Presentation";
import Notification from "../../../../utils/notifyUtil";
import othersUtil from "../../../../utils/othersUtil";
import filtersUtil from "../../../../utils/filtersUtil";
import "./style.css"
import { Steps } from "intro.js-react";
import UserContext from "../../../../context/userContext";
import presentationUtil from "../../../../utils/presentationUtil";


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

    const [demands, setDemands] = useState([]);
    const [proposals, setProposals] = useState([]);
    const [agendas, setAgendas] = useState([]);
    const [minutes, setMinutes] = useState([]);


    const [minute, setMinute] = useState(false); // Verifica se a página é de ata
    const [nameFilter, setName] = useState<string>(""); // Busca o que foi digitado no input do filtro
    const [typeFilter, setType] = useState<string>(""); // Busca qual filtro foi selecionado


    const [demandsSize, setDemandsSize] = useState(0);
    const [loading, setLoading] = useState(true);


    // Entra na página e busca as demandas cadastradas
    useEffect(() => {
        setLoading(true);

        if (url[3] === "demands") {
            if (search === "" && typeFilter === "") {
                getDemands(); // Busca as demandas cadastradas
            } else {
                ServicesDemand.findAll().then((res: any) => {
                    setDemands(res);
                });
            }


        } else if (url[3] === "proposals") {
            if (search === "" && typeFilter === "") {
                getProposals(); // Busca as demandas cadastradas
            } else {
                ServicesProposal.findAll().then((res: any) => {
                    setProposals(res);
                });
            }
        } else if (url[3] === "agendas") {
            if (search === "" && typeFilter === "") {
                getAgendas(); // Busca as demandas cadastradas
            } else {
                ServicesAgenda.findAll().then((res: any) => {
                    setAgendas(res);
                });
            }
        } else if (url[3] === "minutes") {
            if (search === "" && typeFilter === "") {
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
    }, [url[3], page, search, typeFilter, table])


    // Buscar as demandas cadastradas
    async function getDemands() {
        if (table === false) {
            findDemands = await ServicesDemand.findByPage(page, 5).then(async (res: any) => {
                let demandsContent = res.content; // Atualiza o estado das demandas
                setPages(res.totalPages); // Atualiza o estado das páginas


                let proposalsContent: any = await ServicesProposal.findAll(); // Busca as propostas cadastradas
                addProposal(demandsContent, proposalsContent); // Adiciona as propostas nas demandas
                setDemands(demandsContent); // Atualiza o estado das demandas
                setLoadingFalse(res); // Desativa o loading
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
                    setLoading(false);
                }

                let proposalsContent: any = await ServicesProposal.findAll();
                addProposal(demandsContent, proposalsContent);
                setDemands(demandsContent);
            });
        }


        return findDemands;
    }

    // Buscar as propostas cadastradas
    async function getProposals() {
        findDemands = await ServicesProposal.findByPage(page, 5).then((res: any) => {
            setProposals(res.content); // Atualiza o estado das demandas
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
        if (res.content.length === 0) {
            setLoading(false);
        }
    }

    // Função para adicionar o código da proposta na demanda
    const addProposal = (demandsContent: any, proposalsContent: any) => {
        demandsContent?.map((demand: any) => {
            if (demand.demandStatus === "Assesment") {
                proposalsContent.map((proposal: any) => {

                    if (proposal.demand.demandCode === demand.demandCode) {
                        demand.proposalCode = proposal.proposalCode;
                    }
                })
            }
            return demand;
        })
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

            {(url[3] === "demands") ? (

                <div className="demands">
                    {presentation && (
                        <Presentation setPresentation={setPresentation} />
                    )}


                    <div className="container">

                        <Search setSearch={setSearch} search={search} solicitationType="demand" onClick={callback} name={nameFilter} solicitation={demands} type={typeFilter} setTable={setTable} nav={t("demandsViewDemands")} title="demands" button="createDemand" link="/demand/create/1" />
                        <div className={"container-background boxNoPadding-" + table}>


                            {

                                demands.filter((val: any) => {
                                    if (filtersUtil.demand(nameFilter, typeFilter, search, val)) { return true } else { return false }
                                }).map((val: any, index: number) => {
                                    if (index === demands.length - 1 && index === 8) {
                                        return (
                                            <div className="demand-last">
                                                <Demand key={index} id={index} demandCode={val.demandCode} listDirection={table} name={val.demandTitle}
                                                    requester={val?.requesterRegistration?.workerName} date={val.demandDate} situation={val.demandStatus}
                                                    proposalCode={val.proposalCode} demandVersion={val.demandVersion} score={val?.score} type="demand" />
                                            </div>
                                        )
                                    } else {
                                        return (
                                            <Demand key={index} id={index} demandCode={val.demandCode} listDirection={table} name={val.demandTitle}
                                                requester={val?.requesterRegistration?.workerName} date={val.demandDate} situation={val.demandStatus}
                                                proposalCode={val.proposalCode} demandVersion={val.demandVersion} score={val?.score} type="demand" />
                                        )
                                    }
                                })

                            }

                            {(demands.filter((val: any) => { if (filtersUtil.demand(nameFilter, typeFilter, search, val)) { return true } else { return false } }).length === 0 && loading === false ? noResult() : null)}

                            {demands.length === 0 && loading === true && <Load />}


                        </div>

                        {othersUtil.footer(url, demands, proposals, agendas, minutes, search, typeFilter, pages, page, navigate, demandsSize, table)}

                        <Footer />

                    </div>
                </div>

            ) : (url[3] === "proposals") ? (
                <div className="proposals">

                    <div className="container">
                        <Search setSearch={setSearch} solicitation={proposals} solicitationType="proposal" search={search} onClick={callback} name={nameFilter} type={typeFilter} setTable={setTable} nav={t("proposalViewProposal")} title="proposals" button="createProposal" link="/demands/1" />
                        <div className={"container-background boxNoPadding-" + table}>
                            {
                                proposals.filter((val: any) => {
                                    if (filtersUtil.proposal(nameFilter, typeFilter, search, val)) { return true } else { return false }
                                }).map((val: any, index: any) => (
                                    <Demand
                                        key={index} listDirection={table} demandCode={val.proposalCode}
                                        name={val.demand?.demandTitle} requester={val.demand?.requesterRegistration.workerName} analyst={val.responsibleAnalyst?.workerName}
                                        date={val.demand?.demandDate} situation={val.proposalStatus} type="proposal"
                                    />
                                ))
                            }

                            {(proposals.filter((val: any) => { if (filtersUtil.proposal(nameFilter, typeFilter, search, val)) { return true } else { return false } }).length === 0 && loading === false ? noResult() : null)}


                            {proposals.length === 0 && loading === true && <Load />}

                        </div>
                        {othersUtil.footer(url, demands, proposals, agendas, minutes, search, typeFilter, pages, page, navigate, demandsSize, table)}

                        <Footer />

                    </div>
                </div>
            ) : (url[3] === "agendas") ? (
                <div className="agendas">

                    <div className="container">
                        <Search setSearch={setSearch} search={search} solicitation={agendas} solicitationType="agenda" onClick={callback} name={nameFilter} type={typeFilter} setTipe={setType} setTable={setTable} nav={t("agendaViewAgenda")} title="agendas" button="createAgenda" link="/agenda/create" />
                        <div className={"container-background boxNoPadding-" + table}>
                            {
                                agendas
                                    .filter((val: any) => {
                                        if (filtersUtil.agenda(nameFilter, typeFilter, search, val)) { return true } else { return false }
                                    })
                                    .map((val: any, index: any) => (
                                        <Demand
                                            key={index} val={val.agendaCode} agenda={val} listDirection={table}
                                            name={(val.commission.commissionName.split("–")[1]).toUpperCase() + " – " + val.agendaDate} demandCode={val.agendaCode} date={val.agendaDate}
                                            requester={val.analistRegistry?.workerName}
                                            number={val.sequentialNumber} year={val.initialDate} type="agenda"
                                        />
                                    ))
                            }

                            {(agendas.filter((val: any) => { if (filtersUtil.agenda(nameFilter, typeFilter, search, val)) { return true } else { return false } }).length === 0 && loading === false ? noResult() : null)}

                            {agendas.length === 0 && loading === true && <Load />}

                        </div>

                        {othersUtil.footer(url, demands, proposals, agendas, minutes, search, typeFilter, pages, page, navigate, demandsSize, table)}

                        <Footer />

                    </div>

                </div>
            ) : (url[3] === "minutes") ? (
                <div className="minutes">

                    <div className="container">

                        <Search onClick={callback} setSearch={setSearch} solicitation={minutes} solicitationType="minute" search={search} name={nameFilter} type={typeFilter} setType={setType} nav={t("minuteViewMinute")} title="minutes" button="createMinute" link="/agendas/1" setTable={setTable} />
                        <div className={"container-background boxNoPadding-" + table}>
                            {
                                minutes
                                    .filter((val: any) => {
                                        if (filtersUtil.minutes(nameFilter, typeFilter, search, val, t)) { return true } else { return false }
                                    })
                                    .map((val: any, index: any) => (
                                        <Demand
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

                            {(minutes.filter((val: any) => { if (filtersUtil.minutes(nameFilter, typeFilter, search, val, t)) { return true } else { return false } }).length === 0 && loading === false ? noResult() : null)}

                        </div>
                        {othersUtil.footer(url, demands, proposals, agendas, minutes, search, typeFilter, pages, page, navigate, demandsSize, table)}

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

            {url[3] === "demands" &&
                < Steps
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