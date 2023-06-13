import { useEffect, useState } from "react";
import { ToastContainer } from 'react-toastify';
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
import "./style.css"


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


    const [minute, setMinute] = useState(false); // Verifica se a página é de ata
    const [nameFilter, setName] = useState<string>(""); // Busca o que foi digitado no input do filtro
    const [typeFilter, setType] = useState<string>(""); // Busca qual filtro foi selecionado


    const [demandsSize, setDemandsSize] = useState(0);
    const [loading, setLoading] = useState(true);

    const [comissions, setComissions] = useState(""); // Estado para armazenar as comissões

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
                    putNameAgenda(res);
                    setAgendas(res);
                });
            }
        } else if (url[3] === "minutes") {
            if (search === "" && typeFilter === "") {
                getMinutes(); // Busca as demandas cadastradas
            } else {
                ServicesMinute.findAll().then((res: any) => {
                    putNameMinute(res);
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

                if (res.content.length === 0) {
                    setLoading(false);
                }

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
                    setLoading(false);
                }

                let proposalsContent: any = await ServicesProposal.findAll();

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

            if (res.content.length === 0) {
                setLoading(false);
            }
        });


        return findDemands;
    }

    // Buscar as pautas cadastradas
    async function getAgendas() {
        findDemands = await ServicesAgenda.findByPage(page, 5).then((res: any) => {
            setAgendas(res.content); // Atualiza o estado das demandas
            setPages(res.totalPages); // Atualiza o estado das páginas
            putNameAgenda(res);
            if (res.content.length === 0) {
                setLoading(false);
            }
        });

        return findDemands;
    }


    //Buscar as atas cadastradas
    async function getMinutes() {
        findDemands = await ServicesMinute.findByPage(page, 5).then((res: any) => {
            setMinutes(res.content); // Atualiza o estado das demandas
            setPages(res.totalPages); // Atualiza o estado das páginas
            putNameMinute(res);

            if (res.content.length === 0) {
                setLoading(false);
            }
        });


        return findDemands;
    }

    // Altera o nome da agenda para o nome com comissão
    function putNameAgenda(res: any) {
        for (let i = 0; i < res.content.length; i++) {
            let comission = "";

            for (let j = 0; j < res?.content[i]?.commission.length; j++) {
                comission += res.content[i].commission[j].commissionName.split("–")[1] + " "
            }
            res.content[i].minuteName = comission;
        }
    }

    // Altera o nome da ata para o nome com comissão
    function putNameMinute(res: any) {
        for (let i = 0; i < res.content.length; i++) {
            let comission = "";

            for (let j = 0; j < res?.content[i]?.agenda?.commission.length; j++) {
                comission += res.content[i].agenda.commission[j].commissionName.split("–")[1] + " "
            }
            res.content[i].minuteName = comission;
        }

    }


    // Função para setar o estado da tabela
    const setTable = () => {
        setTableList(!table);
    }


    const callback = (name: string, type: string) => {
        setName(name)
        setType(type)
    }

    const closePresentation = () => {
        setPresentation(false);
        localStorage.removeItem("presentation");
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
                        <div>
                            <Presentation />
                            <button onClick={() => { closePresentation() }} className="btn-secondary btn-presentation">
                                <div className="material-symbols-outlined">
                                    close
                                </div>
                            </button>
                        </div>)}


                    <div className="container">

                        <Search setSearch={setSearch} search={search} onClick={callback} name={nameFilter} type={typeFilter} setTable={setTable} nav={t("demandsViewDemands")} title="demands" button="createDemand" link="/demand/create/1" />
                        <div className={"container-background boxNoPadding-" + table}>

                            {/* {table === true &&
                                <div className="header">
                                </div>
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

                                        if (typeFilter === "requester" && val.requesterRegistration.workerName.toUpperCase().includes(nameFilter.toUpperCase())) {
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
                                        } else if (typeFilter === "forum") {
                                            return false;
                                        }
                                        return false;
                                    })
                                    .map((val: any, index: number) => {

                                        //verificar ultimo
                                        if (index === demands.length - 1 && index === 8) {
                                            return (
                                                <div className="demand-last">
                                                    <Demand key={val.demandCode} demandCode={val.demandCode} listDirection={table} name={val.demandTitle}
                                                        requester={val?.requesterRegistration?.workerName} date={val.demandDate} situation={val.demandStatus}
                                                        proposalCode={val.proposalCode} demandVersion={val.demandVersion} type="demand" />
                                                </div>
                                            )
                                        } else {
                                            return (
                                                <Demand key={val.demandCode} demandCode={val.demandCode} listDirection={table} name={val.demandTitle}
                                                    requester={val?.requesterRegistration?.workerName} date={val.demandDate} situation={val.demandStatus}
                                                    proposalCode={val.proposalCode} demandVersion={val.demandVersion} type="demand" />
                                            )
                                        }
                                    })
                            }



                            {demands.length === 0 && loading === true && <Load />}

                            {demands.length === 0 && loading === false && noResult()}

                        </div>

                        {othersUtil.footer(url, demands, proposals, agendas, minutes, search, typeFilter, pages, page, navigate, demandsSize, table)}

                        <Footer />

                    </div>
                </div>

            ) : (url[3] === "proposals") ? (
                <div className="proposals">

                    <div className="container">
                        <Search setSearch={setSearch} search={search} onClick={callback} name={nameFilter} type={typeFilter} setTable={setTable} nav={t("proposalViewProposal")} title="proposals" button="createProposal" link="/demands/1" />
                        <div className={"container-background boxNoPadding-" + table}>
                            {
                                proposals
                                    .filter((val: any) => {
                                        if (
                                            (nameFilter === "" || nameFilter === undefined) &&
                                            (typeFilter === "" || typeFilter === undefined) &&
                                            search === ""
                                        ) {
                                            return true;
                                        }

                                        if (search !== "" && val.demand?.demandTitle.toUpperCase().includes(search.toUpperCase())) {
                                            return true;
                                        }

                                        if (typeFilter === "requester" && val.demand?.requesterRegistration.workerName.toUpperCase().includes(nameFilter.toUpperCase())) {
                                            return true;
                                        } else if (typeFilter === "size" && val.demand?.classification.classificationSize.toUpperCase() === nameFilter.toUpperCase()) {
                                            return true;
                                        } else if (typeFilter === "ppm" && val.demand?.classification.ppmCode.toUpperCase() === nameFilter.toUpperCase()) {
                                            return true;
                                        } else if (typeFilter === "code-proposal" && val.proposalCode === parseInt(nameFilter)) {
                                            return true;
                                        } else if (typeFilter === "department" && val.demand?.requesterRegistration.department === nameFilter) {
                                            return true;
                                        }

                                        return false;
                                    })
                                    .map((val: any) => (
                                        <Demand
                                            key={val.proposalCode} listDirection={table} demandCode={val.proposalCode}
                                            name={val.demand?.demandTitle} requester={val.demand?.requesterRegistration.workerName} analyst={val.responsibleAnalyst?.workerName}
                                            date={val.demand?.demandDate} situation={val.proposalStatus} type="proposal"
                                        />
                                    ))
                            }


                            {proposals.length === 0 && loading === true && <Load />}

                            {proposals.length === 0 && loading === false && noResult()}
                        </div>
                        {othersUtil.footer(url, demands, proposals, agendas, minutes, search, typeFilter, pages, page, navigate, demandsSize, table)}

                        <Footer />

                    </div>
                </div>
            ) : (url[3] === "agendas") ? (
                <div className="agendas">

                    <div className="container">
                        <Search setSearch={setSearch} search={search} onClick={callback} name={nameFilter} type={typeFilter} setTipe={setType} setTable={setTable} nav={t("agendaViewAgenda")} title="agendas" button="createAgenda" link="/agenda/create" />
                        <div className={"container-background boxNoPadding-" + table}>
                            {
                                agendas
                                    .filter((val: any) => {
                                        if (
                                            (nameFilter === "" || nameFilter === undefined) &&
                                            (typeFilter === "" || typeFilter === undefined) &&
                                            search === ""
                                        ) {
                                            return true;
                                        }

                                        if (search !== "" && val.agendaCode.toString().includes(search)) {
                                            return true;
                                        }

                                        if (typeFilter === "code-agendas") {

                                            for (let i = 0; i < val.proposals.length; i++) {

                                                if (val.proposals[i].proposalCode === parseInt(nameFilter)) {
                                                    return true;
                                                }

                                            }
                                        }

                                        return false;
                                    })
                                    .map((val: any) => (
                                        <Demand
                                            key={val.agendaCode} val={val.agendaCode} listDirection={table}
                                            name={t("meetingAgenda") + " – " + val.minuteName} demandCode={val.agendaCode} date={val.agendaDate}
                                            number={val.sequentialNumber} year={val.initialDate} type="agenda"
                                        />
                                    ))
                            }


                            {agendas.length === 0 && loading === true && <Load />}

                            {agendas.length === 0 && loading === false && noResult()}

                        </div>

                        {othersUtil.footer(url, demands, proposals, agendas, minutes, search, typeFilter, pages, page, navigate, demandsSize, table)}

                        <Footer />

                    </div>

                </div>
            ) : (url[3] === "minutes") ? (
                <div className="minutes">

                    <div className="container">

                        <Search onClick={callback} setSearch={setSearch} search={search} name={nameFilter} type={typeFilter} setType={setType} nav={t("minuteViewMinute")} title="minutes" button="createMinute" link="/agendas/1" setTable={setTable} />
                        <div className={"container-background boxNoPadding-" + table}>
                            {
                                minutes
                                    .filter((val: any) => {

                                        if (
                                            (nameFilter === "" || nameFilter === undefined) &&
                                            (typeFilter === "" || typeFilter === undefined) &&
                                            search === ""
                                        ) {
                                            return true;
                                        }

                                        if (search !== "" && ((t(val.minuteType) + " – " + val.minuteName).toUpperCase()).includes(search.toUpperCase())) {
                                            return true;
                                        }

                                        let dateFormat: any;

                                        // se for menos de 9 colocar 0 na frente
                                        if (val.minuteStartDate?.split("/")[1].length === 1) {
                                            dateFormat = val.minuteStartDate.split("/")[0] + "0" + val.minuteStartDate.split("/")[1] + val.minuteStartDate.split("/")[2]
                                        }

                                        if (typeFilter === "code-minutes" && val.minuteCode === parseInt(nameFilter)) {
                                            return true;
                                        } else if (typeFilter === "date" && dateFormat.includes(nameFilter.split("-").reverse().join(""))) {
                                            return true;
                                        }


                                        return false;
                                    })
                                    .map((val: any) => (
                                        <Demand
                                            key={val.minuteCode}
                                            listDirection={table}
                                            name={t(val.minuteType) + " – " + val.minuteName}
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

                            {minutes.length === 0 && loading === false && noResult()}

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

            <ToastContainer position="bottom-right" newestOnTop />
        </div>
    )
}