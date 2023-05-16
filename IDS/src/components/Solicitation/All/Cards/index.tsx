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
import othersUtil from "../../../../utils/othersUtil";

export default function Demands() {
    const url = window.location.href.split("/");
    let findDemands: any;
    let page: any = url[4]

    let navigate = useNavigate();
    const { t } = useTranslation();

    const [presentation, setPresentation] = useState(localStorage.getItem("presentation") === "true" ? true : false); // Estado para mostrar a apresentação
    const [table, setTableList] = useState(false); // Estado para mostrar a tabela de demandas
    const [search, setSearch]: any = useState(""); // Retorno do campo de busca de demandas
    const [pages, setPages] = useState(0); // Quantidade de páginas

    const [demands, setDemands] = useState([]);
    const [proposals, setProposals] = useState([]);
    const [agendas, setAgendas] = useState([]);
    const [minutes, setMinutes] = useState([]);


    const [demandsSize, setDemandsSize] = useState(0);

    const [loading, setLoading] = useState(true);

    // Entra na página e busca as demandas cadastradas
    useEffect(() => {
        setLoading(true);
        if (url[3] === "demands") {
            if (search === "" || typeFilter === "") {
                getDemands(); // Busca as demandas cadastradas
            } else {
                ServicesDemand.findAll().then((res: any) => {
                    setDemands(res);
                });
            }
        } else if (url[3] === "proposals") {
            if (search === "" || typeFilter === "") {
                getProposals(); // Busca as demandas cadastradas
            } else {
                ServicesProposal.findAll().then((res: any) => {
                    setProposals(res);
                });
            }
        } else if (url[3] === "agendas") {
            if (search === "" || typeFilter === "") {
                getAgendas(); // Busca as demandas cadastradas
            } else {
                ServicesAgenda.findAll().then((res: any) => {
                    setAgendas(res);
                });
            }
        } else if (url[3] === "minutes") {
            if (search === "" || typeFilter === "") {
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
                            {/* {
                                demands.map((val: any, index) => {
                                    if ((nameFilter === "" || nameFilter === undefined) && (typeFilter === "" || typeFilter === undefined) && (search === "")) {
                                        return (
                                            <Demand key={val.demandCode} demandCode={val.demandCode} listDirection={table} name={val.demandTitle} requester={val?.requesterRegistration?.workerName} date={val.demandDate} situation={val.demandStatus} proposalCode={val.proposalCode} demandVersion={val.demandVersion} type="demand" />
                                        );

                                    } else {

                                        if (search !== "") {

                                            if (val.demandTitle.toUpperCase().includes(search.toUpperCase())) {
                                                return (<Demand key={val.demandCode} demandCode={val.demandCode} listDirection={table} name={val.demandTitle} requester={val?.requesterRegistration?.workerName} date={val.demandDate} situation={val.demandStatus} proposalCode={val.proposalCode} demandVersion={val.demandVersion} type="demand" />);

                                            } else if (index === demands.length - 1) {
                                                return noResult();
                                            }
                                        }

                                        if (typeFilter === "requester" && val.requesterRegistration.workerName.toUpperCase().includes(nameFilter.toUpperCase())) {
                                            return (<Demand key={val.demandCode} demandCode={val.demandCode} listDirection={table} name={val.demandTitle} requester={val?.requesterRegistration?.workerName} date={val.demandDate} situation={val.demandStatus} proposalCode={val.proposalCode} demandVersion={val.demandVersion} type="demand" />);
                                        } else if (typeFilter === "status" && val.demandStatus.toUpperCase() === nameFilter.toUpperCase()) {
                                            return (<Demand key={val.demandCode} demandCode={val.demandCode} listDirection={table} name={val.demandTitle} requester={val?.requesterRegistration?.workerName} date={val.demandDate} situation={val.demandStatus} proposalCode={val.proposalCode} demandVersion={val.demandVersion} type="demand" />);
                                        } else if (typeFilter === "size" && val.classification.classificationSize.toUpperCase() === nameFilter.toUpperCase()) {
                                            return (<Demand key={val.demandCode} demandCode={val.demandCode} listDirection={table} name={val.demandTitle} requester={val?.requesterRegistration?.workerName} date={val.demandDate} situation={val.demandStatus} proposalCode={val.proposalCode} demandVersion={val.demandVersion} type="demand" />);
                                        } else if (typeFilter === "ppm" && val.classification.ppmCode.toUpperCase() === nameFilter.toUpperCase()) {
                                            return (<Demand key={val.demandCode} demandCode={val.demandCode} listDirection={table} name={val.demandTitle} requester={val?.requesterRegistration?.workerName} date={val.demandDate} situation={val.demandStatus} proposalCode={val.proposalCode} demandVersion={val.demandVersion} type="demand" />);
                                        } else if (typeFilter === "code-demand" && val.demandCode === parseInt(nameFilter)) {
                                            return (<Demand key={val.demandCode} demandCode={val.demandCode} listDirection={table} name={val.demandTitle} requester={val?.requesterRegistration?.workerName} date={val.demandDate} situation={val.demandStatus} proposalCode={val.proposalCode} demandVersion={val.demandVersion} type="demand" />);
                                        } else if (typeFilter === "home" && val.requesterRegistration.workerName === nameFilter) {
                                            return (<Demand key={val.demandCode} demandCode={val.demandCode} listDirection={table} name={val.demandTitle} requester={val?.requesterRegistration?.workerName} date={val.demandDate} situation={val.demandStatus} proposalCode={val.proposalCode} demandVersion={val.demandVersion} type="demand" />);
                                        } else if (typeFilter === "department" && val.requesterRegistration.department === nameFilter) {
                                            return (<Demand key={val.demandCode} demandCode={val.demandCode} listDirection={table} name={val.demandTitle} requester={val?.requesterRegistration?.workerName} date={val.demandDate} situation={val.demandStatus} proposalCode={val.proposalCode} demandVersion={val.demandVersion} type="demand" />);
                                        } else if (index === demands.length - 1) {
                                            return noResult();
                                        }
                                    }
                                })
                            } */}

                            {
                                demands
                                    .filter((val: any) => {
                                        if (
                                            (nameFilter === "" || nameFilter === undefined) &&
                                            (typeFilter === "" || typeFilter === undefined) &&
                                            search === ""
                                        ) {
                                            return true;
                                        }

                                        if (search !== "" && val.demandTitle.toUpperCase().includes(search.toUpperCase())) {
                                            return true;
                                        }

                                        if (
                                            typeFilter === "requester" &&
                                            val.requesterRegistration.workerName.toUpperCase().includes(nameFilter.toUpperCase())
                                        ) {
                                            return true;
                                        } else if (typeFilter === "status" && val?.demandStatus.toUpperCase() === nameFilter.toUpperCase()) {
                                            return true;
                                        } else if (typeFilter === "size" && val?.classification?.classificationSize.toUpperCase() === nameFilter.toUpperCase()) {
                                            return true;
                                        } else if (typeFilter === "ppm" && val?.classification?.ppmCode.toUpperCase() === nameFilter.toUpperCase()) {
                                            return true;
                                        } else if (typeFilter === "code-demand" && val?.demandCode === parseInt(nameFilter)) {
                                            return true;
                                        } else if (typeFilter === "home" && val?.requesterRegistration.workerName === nameFilter) {
                                            return true;
                                        } else if (typeFilter === "department" && val?.requesterRegistration.department === nameFilter) {
                                            return true;
                                        }

                                        return false;
                                    })
                                    .map((val: any, index: number) => {

                                        return (
                                            <Demand
                                                key={val.demandCode}
                                                demandCode={val.demandCode}
                                                listDirection={table}
                                                name={val.demandTitle}
                                                requester={val?.requesterRegistration?.workerName}
                                                date={val.demandDate}
                                                situation={val.demandStatus}
                                                proposalCode={val.proposalCode}
                                                demandVersion={val.demandVersion}
                                                type="demand"
                                            />
                                        )
                                    })
                            }



                            {demands.length === 0 && loading === true && <Load />}

                            {demands.length === 0 && loading === false && noResult()}

                        </div>

                        {othersUtil.footer(url, demands, proposals, agendas, minutes, search, pages, page, navigate, demandsSize)}

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
                                    } else {
                                        if (search !== "") {

                                            if (val.demandTitle.toUpperCase().includes(search.toUpperCase())) {
                                                return (<Demand key={val.demandCode} demandCode={val.demandCode} listDirection={table} name={val.demandTitle} requester={val?.requesterRegistration?.workerName} date={val.demandDate} situation={val.demandStatus} proposalCode={val.proposalCode} demandVersion={val.demandVersion} type="demand" />);

                                            } else if (index === demands.length - 1) {
                                                return noResult();
                                            }
                                        }

                                        console.log(val.demand?.classification.classificationSize.toUpperCase().includes(nameFilter.toUpperCase()))

                                        if (typeFilter === "requester" && val.demand.requesterRegistration.workerName.toUpperCase().includes(nameFilter.toUpperCase())) {
                                            return (<Demand key={val.proposalCode} listDirection={table} demandCode={val.proposalCode} name={val.demand?.demandTitle} requester={val.demand?.requesterRegistration.workerName} analyst={val.responsibleAnalyst?.workerName} date={val.demand?.demandDate} situation={val.proposalStatus} type="proposal" />);
                                        } else if (typeFilter === "size" && val.demand?.classification.classificationSize.toUpperCase() === nameFilter.toUpperCase()) {
                                            return (<Demand key={val.proposalCode} listDirection={table} demandCode={val.proposalCode} name={val.demand?.demandTitle} requester={val.demand?.requesterRegistration.workerName} analyst={val.responsibleAnalyst?.workerName} date={val.demand?.demandDate} situation={val.proposalStatus} type="proposal" />);
                                        } else if (typeFilter === "ppm" && val.demand?.classification.ppmCode.toUpperCase() === nameFilter.toUpperCase()) {
                                            return (<Demand key={val.proposalCode} listDirection={table} demandCode={val.proposalCode} name={val.demand?.demandTitle} requester={val.demand?.requesterRegistration.workerName} analyst={val.responsibleAnalyst?.workerName} date={val.demand?.demandDate} situation={val.proposalStatus} type="proposal" />);
                                        } else if (typeFilter === "code-proposal" && val.proposalCode === parseInt(nameFilter)) {
                                            return (<Demand key={val.proposalCode} listDirection={table} demandCode={val.proposalCode} name={val.demand?.demandTitle} requester={val.demand?.requesterRegistration.workerName} analyst={val.responsibleAnalyst?.workerName} date={val.demand?.demandDate} situation={val.proposalStatus} type="proposal" />);
                                        } else {
                                            return noResult();
                                        }

                                    }

                                })
                            }

                            {proposals.length === 0 && loading === true && <Load />}

                            {proposals.length === 0 && loading === false && noResult()}
                        </div>
                        {othersUtil.footer(url, demands, proposals, agendas, minutes, search, pages, page, navigate, demandsSize)}

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
                                            <Demand key={val.agendaCode} val={val.agendaCode} listDirection={table} name={t("meetingAgenda") + " " + val.agendaCode} demandCode={val.agendaCode} date={val.agendaDate} number={val.sequentialNumber} year={val.yearAgenda} type="agenda" />
                                        );
                                    } else if (search !== "") {
                                        if (val.agendaCode.toString().includes(search)) {
                                            return (
                                                <Demand key={val.agendaCode} val={val.agendaCode} listDirection={table} name={t("meetingAgenda") + " " + val.agendaCode} demandCode={val.agendaCode} date={val.agendaDate} number={val.sequentialNumber} year={val.yearAgenda} type="agenda" />
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

                        {othersUtil.footer(url, demands, proposals, agendas, minutes, search, pages, page, navigate, demandsSize)}

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
                        {othersUtil.footer(url, demands, proposals, agendas, minutes, search, pages, page, navigate, demandsSize)}

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