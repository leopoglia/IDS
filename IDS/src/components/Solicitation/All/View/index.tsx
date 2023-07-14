import { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { WebSocketContext } from '../../../../services/webSocketService';

import ButtonActionAnalyst from "./Others/ButtonActionAnalyst";
import Title from "../../../Fixed/Search/Title";
import ServicesDemand from "../../../../services/demandService";
import ServicesProposal from "../../../../services/proposalService";
import ServicesAgenda from "../../../../services/agendaService";
import ServicesExpenses from "../../../../services/expensesService";
import ServicesMinute from "../../../../services/minuteService";
import Footer from "../../../Fixed/Footer";
import HtmlReactParser from 'html-react-parser';
import UserContext from "../../../../context/userContext";
import Tooltip from '@mui/material/Tooltip';
import Expenses from "./Others/Expenses";
import Table from "./Others/Table";
import ButtonsActions from "./Others/ButtonsActions";
import notifyUtil from "../../../../utils/notifyUtil";
import Load from "../../../Fixed/Load";
import CompareDemands from "./Others/CompareDemands";

import "./style.css";
import othersUtil from "../../../../utils/othersUtil";
import ModalInfoCancelled from "./Others/ModalInfoCancelled";



export default function ViewDemand() {

    const { t } = useTranslation();

    const worker: any = useContext(UserContext).worker; // Buscar dados do usuário
    const office = worker.office; // Buscar tipo de usuário
    const workerId = worker.id; // Buscar código do usuário
    const url = window.location.href.split("/")[3]; // Buscar tipo da demanda
    const demandCode: any = parseInt(useParams().id || "null"); // Buscar código da demanda
    const demandVersion: any = window.location.href.split("?")[1]; // Buscar versão da demanda
    const viewDemand: string = window.location.href.split("?")[2]; // Verificar se é uma demanda para visualização
    const [load, setLoad] = useState(true); // Carregamento da página
    const [modalCancelled, setModalCancelled] = useState(false); // Modal de cancelamento

    // Botões superiores
    // 0 - Sem botões  
    // 1 - Gerar PDF e Editar (Solicitante) 
    // 2 - Reprovar ou Classificar (Analista)
    // 3 - Reprovar ou Aprovar (Gerente de Negócios)
    // 4 - Complementar (Analista)
    // 5 - Gerar Proposta (Analista)
    // 6 - Histórico, Gerar PDF e Editar (Analista)
    // 7 - Editar Proposta (Analista)
    const [actionsDemand, setActionsDemand] = useState(0);

    // Situação da Demanda
    // 0 - Demanda criada
    // 1 - Demanda Classificada
    // 2 - Demanda Complementada
    const [stepDemand, setStepDemand] = useState(0);
    const [centerCost, setCenterCost]: any = useState([]); // Dados do centro de custo
    const [classification, setClassification]: any = useState({}); // Dados da classificação
    const [beneficiariesBu, setBeneficiariesBu]: any = useState([]); // Dados dos beneficiários da BU
    const [comission, setComission]: any = useState([]); // Dados da comissão
    const [subscribeId, setSubscribeId] = useState(null);
    const [pendingMinute, setPendingMinute]: any = useState(0); // Quantidade de propostas pendentes
    const [approvedDG, setApprovedDG]: any = useState(0); // Quantidade de propostas aprovadas pelo DG
    const { send, subscribe, stompClient }: any = useContext(WebSocketContext);

    let notification = {}; // Notificações do usuário


    // Dados da demanda
    const [demand, setDemand]: any = useState({
        requesterRegistration: { workerCode: "", workerName: "" },
        demandStatus: "", demandType: "", demandDescription: "", demandDate: "",
        classification: { classificationCode: "", classificationName: "" },
        realBenefit: { realBenefitCode: "", realCurrency: 0, realMonthlyValue: 0 },
        potentialBenefit: { potencialBenefitCode: "", potentialCurrency: 0, potentialMonthlyValue: 0, potentialBenefitDescription: "" },
        qualitativeBenefit: { qualitativeBenefitCode: "", qualitativeBenefitDescription: "" },
        demandAttachment: { demandAttachmentCode: "", dice: "", type: "", name: "" }, demandCode: 0,
    });

    // Dados da proposta
    const [proposal, setProposal]: any = useState({
        responsibleAnalyst: { workerCode: "", workerName: "", }
    });

    // Dados da proposta específica
    const [proposalSpecific, setProposalSpecific]: any = useState([{
        proposalName: "", proposalCode: "", proposalStatus: "",
        proposalDate: "", proposalDescription: "",
        demand: { demandCode: "", demandDescription: "", demandObjective: "" }
    }]);

    // Dados da proposta específica
    const [proposalPublished, setProposalPublished]: any = useState([{
        proposalName: "", proposalCode: "", proposalStatus: "",
        proposalDate: "", proposalDescription: "",
        demand: { demandCode: "", demandDescription: "", demandObjective: "" }
    }]);

    const [agenda, setAgenda]: any = useState([{
        agendaCode: "", agendaDate: "", agendaDescription: "", agendaStatus: "",
        minutePublished: { minuteCode: "", minuteDate: "", minuteDescription: "", minuteStatus: "" },
        minuteNotPublished: { minuteCode: "", minuteDate: "", minuteDescription: "", minuteStatus: "" },
        proposal: {
            proposalCode: "", proposalName: "", proposalDescription: "",
            proposalStatus: "", proposalDate: "",
            demand: { demandCode: "", demandDescription: "", demandObjective: "" }
        }
    }]);

    const [minute, setMinute]: any = useState([{
        minuteCode: "", minuteDate: "", minuteDescription: "", minuteStatus: "", minuteName: ""
    }]);

    useEffect(() => {
        setLoad(true);
    }, []);

    // Chama função ao entrar na página
    useEffect(() => {
        // Buscar dados da demanda

        localStorage.removeItem('expenseList'); // Limpa a lista de despesas da edição
        localStorage.removeItem('centerOfCustProposalrecurrent'); // Limpa a lista de centro de custo da edição
        localStorage.removeItem('centerOfCustProposalinternal'); // Limpa a lista de centro de custo da edição
        localStorage.removeItem('centerOfCustProposalexpenses'); // Limpa a lista de centro de custo da edição


        if (url === "demand") {
            getDemand();
            setCenterCost(demand.costCenter)

        } else if (url === "proposal") {
            getProposal();
            localStorage.removeItem('proposalScope');
            localStorage.removeItem('demand');
            localStorage.removeItem('proposalScope');
            localStorage.removeItem('classification')
        } else if (url === "agenda") {
            getProposalSpecific();
        } else if (url === "minute") {
            getMinute();
        }

        // Verificações para notificações
        if (localStorage.getItem("route") === "classification") {
            notifyUtil.success(t("demandClassified"));
            localStorage.removeItem("route");
        } else if (localStorage.getItem("route") === "complement") {
            notifyUtil.success(t("demandComplemented"));
            localStorage.removeItem("route");
        } else if (localStorage.getItem("route") === "reprove") {
            notifyUtil.success(t("demandReproved"));
            localStorage.removeItem("route");
        } else if (localStorage.getItem("route") === "edit") {
            notifyUtil.success(t("demandEdited"));
            localStorage.removeItem("route");
        }

        if (stompClient && !subscribeId) {
            setSubscribeId(subscribe("/notifications/" + demand.requesterRegistration.workerCode, notification));
        }

    }, [url, demand.demandStatus, proposal.proposalStatus, proposalSpecific[0].proposalStatus, stompClient]);

    function getDemand() {
        ServicesDemand.findByDemandCodeAndDemandVersion(demandCode, parseInt(demandVersion)).then((response: any) => {

            setDemand(response);

            // Verificar se o usuário é o solicitante
            if (office === "requester") {
                // Verificar se o usuário é o solicitante
                if (response.requesterRegistration.workerCode === workerId) {
                    // Seta botões superiores para o solicitante
                    setActionsDemand(1);
                } else {
                    // Deixa os botões superiores vazios
                    setActionsDemand(0)
                }
            }

            // Verifica se o usuário é o analista
            if (office === "analyst") {
                // Verificações do status da demanda
                if (response.demandStatus === "Backlog" && response.classification !== undefined) {
                    // Seta botões superiores de Reprovar ou Classificar para o analista
                    setActionsDemand(2)
                } else if (response.demandStatus === "BacklogRankApproved") {
                    // Seta botões superiores de Complementar para o analista
                    setActionsDemand(4)
                } else if (response.demandStatus === "BacklogComplement") {
                    // Seta botões superiores de Gerar Proposta para o analista
                    setActionsDemand(5)
                } else {
                    setActionsDemand(6)
                }
            }

            // Verifica se o usuário é o gerente de negócios
            if (office === "business") {
                // Verificar se a demanda foi classificada
                if (response.demandStatus === "BacklogRanked") {
                    // Seta botões superiores de Reprovar ou Aprovar para o gerente de negócios
                    setActionsDemand(3)
                }
            }

            // Verificar se a demanda foi classificada
            if (response?.classification !== "" || response?.classification !== null) {
                beneficiaryBus(response?.classification?.beneficiaryBu)
                setClassification(response?.classification)
            }


            if (response?.demandStatus === "Backlog") {
                setStepDemand(0);
            } else if (response?.demandStatus === "BacklogRanked" || response?.demandStatus === "BacklogRankApproved") {
                setStepDemand(1);
            } else if (response?.demandStatus === "BacklogComplement" || response?.demandStatus === "Assesment") {
                setStepDemand(2);

                if (response?.demandStatus === "Assesment") {
                    ServicesProposal.findByDemandCode(demandCode).then((response: any) => {
                        setProposal(response)
                    })
                }

            }
            setLoad(false);
        })
    }

    const [proposalExpense, setProposalExpense]: any = useState([]);
    const [proposalExpenseValue, setProposalExpenseValue]: any = useState(0);
    const [proposalExpenseRecurrent, setProposalExpenseRecurrent]: any = useState(0);
    const [proposalExpenseInternal, setProposalExpenseInternal]: any = useState(0);

    const [initialRunPeriod, setInitialRunPeriod]: any = useState(0);
    const [finalExecutionPeriod, setFinalExecutionPeriod]: any = useState(0);
    const [payBack, setPayBack]: any = useState(0);
    const [responsibleBussiness, setResponsibleBussiness]: any = useState("");


    // Buscar proposta
    function getProposal() {

        ServicesProposal.findById(demandCode).then((response: any) => {
            setProposal(response)

            setResponsibleBussiness(response?.workers) // Seta o responsável de negócios da proposta


            ServicesDemand.findById(response.demand.demandCode).then((demand: any) => {
                setDemand(demand); // Seta a demanda da proposta

                setStepDemand(2) // Seta o passo da demanda
                setClassification(demand.classification) // Seta a classificação da demanda
                beneficiaryBus(demand?.classification?.beneficiaryBu)

                setCenterCost(demand.costCenter) // Seta o centro de custo da demanda

            })

            if (response.proposalStatus === "Pending") {
                setActionsDemand(7);
            }

            ServicesExpenses.findByProposal(response.proposalCode).then((expenses: any) => {
                let expense: any = [];


                if (expenses.length > 0) {

                    for (let i = 0; i < expenses.length; i++) {

                        if (expenses[i].proposal.proposalCode === demandCode) {
                            expense.push(expenses[i])

                            if (expenses[i].expensesType === "recurrent") {
                                setProposalExpenseRecurrent(expenses[i]);
                                setProposalExpense(1)

                            } else if (expenses[i].expensesType === "internal") {
                                setProposalExpenseInternal(expenses[i]);
                                setProposalExpense(1)


                            } else if (expenses[i].expensesType === "expenses") {
                                setProposalExpense(1)
                                setProposalExpenseValue(expenses[i]);
                            }

                        }
                    }

                    if (expense.length > 0) {
                        setInitialRunPeriod(dateFormat(expense[0].proposal.initialRunPeriod));
                        setFinalExecutionPeriod(dateFormat(expense[0].proposal.finalExecutionPeriod));
                        setPayBack(payback(expense[0].proposal.initialRunPeriod, expense[0].proposal.finalExecutionPeriod));
                    }

                    setLoad(false);
                }
            })
        })
    }

    // Buscar proposta específica
    function getProposalSpecific() {

        ServicesAgenda.findById(demandCode).then(async (response: any) => {
            let proposals: any = [];
            let proposalsPublished: any = []
            setComission(response[0].commission)

            for (let i = 0; i < response[0].proposals.length; i++) {
                await ServicesDemand.findById(response[0].proposals[i].demand.demandCode).then((demand: any) => {
                    response[0].proposals[i].demand = demand;
                })

                if (response[0].proposals[i].published === true) {
                    proposalsPublished.push(response[0].proposals[i])
                }

                proposals.push(response[0].proposals[i])
            }
            setProposalSpecific(proposals)
            setProposalPublished(proposalsPublished)




            ServicesMinute.findByAgenda(response[0].agendaCode).then((minute: any) => {

                response[0].minutePublished = minute[1];
                response[0].minuteNotPublished = minute[0];
                response[0].minuteDG = minute[2];

                setAgenda(response[0])

            })

            proposals.map((val: any) => (
                val.proposalStatus === "Pending" ? (
                    setPendingMinute(pendingMinute + 1)
                ) : (
                    null
                )
            ))


            proposals.map((val: any) => (
                val.proposalStatus === "ApprovedDG" ? (
                    setApprovedDG(approvedDG + 1)
                ) : (
                    null
                )
            ))


        })


        ServicesMinute.findAll().then((response: any) => {
            let minutes: any = [];
            for (let i = 0; i < response.length; i++) {
                if (response[i].agenda.agendaCode === demandCode) {
                    minutes.push(response[i]);
                }
            }
            setMinute(minutes)
            setLoad(false);
        })
    }


    // Buscar ata
    function getMinute() {
        ServicesMinute.findById(demandCode).then(async (response: any) => {

            for (let i = 0; i < response?.agenda?.proposals.length; i++) {


                await ServicesExpenses.findByProposal(response?.agenda?.proposals[i]?.proposalCode).then((expenses: any) => {

                    if (expenses.length > 0) {
                        for (let j = 0; j < expenses.length; j++) {

                            console.log("expenses ==> ", expenses[j])

                            if (expenses[j].proposal.proposalCode === response?.agenda?.proposals[i].proposalCode) {
                                if (expenses[j].expensesType === "recurrent") {
                                    response.agenda.proposals[i].expenseRecurrent = expenses[j];
                                } else if (expenses[j].expensesType === "internal") {
                                    response.agenda.proposals[i].expenseInternal = expenses[j];
                                } else if (expenses[j].expensesType === "expenses") {
                                    response.agenda.proposals[i].expenseValue = expenses[j];
                                }
                            }
                        }
                    }
                })
            }

            setMinute(response);
            setActionsDemand(1)
            setLoad(false);

        })
    }



    // Aprovar demanda (Gerente de Negócios)
    function approveDemand() {
        ServicesDemand.updateStatus(demandCode, "BacklogRankApproved").then((response: any) => {
            ServicesDemand.approve(demandCode, worker.id);
            send("/api/worker/" + demand.requesterRegistration.workerCode, setDefaultNotification());
            notifyUtil.success(t("demandApproved"));
            setActionsDemand(0);
            getDemand();
        }).catch((error: any) => {
            notifyUtil.error(t("somethingWrong"));
        })
    }

    const setDefaultNotification = () => {
        return notification = {
            date: new Date(),
            description: "BusinesManagerApprove " + demand.demandCode,
            worker: { workerCode: JSON.parse(demand.requesterRegistration.workerCode) },
            icon: "done",
            type: "demand",
        }
    }

    // Devolver demanda (Analista)
    function giveBack() {
        ServicesDemand.updateStatus(demandCode, "BacklogEdit").then((response: any) => {
            console.log(setGiveBackNotification());
            send("/api/worker/" + demand.requesterRegistration.workerCode, setGiveBackNotification());
            notifyUtil.success(t("demandReturned"));
            getDemand();
        }).catch((error: any) => {
            notifyUtil.error(t("somethingWrong"));
        })
    }

    const setGiveBackNotification = () => {
        return notification = {
            date: new Date(),
            description: "AnalystGiveBack " + demand.demandCode,
            worker: { workerCode: JSON.parse(demand.requesterRegistration.workerCode) },
            icon: "info",
            type: "demand",
        };
    }

    // Gerar PDF

    const generatePDF = async () => {
        if (url === "demand") {
            window.open("http://localhost:8443/api/demand/pdf/" + demandCode, "_blank");
        } else if (url === "proposal") {
            window.open("http://localhost:8443/api/proposal/pdf/" + demandCode, "_blank");
        } else if (url === "minute") {
            window.open("http://localhost:8443/api/minutes/pdf/" + demandCode, "_blank");
        }
    };


    const attatchmentType = (type: string, demandParam: any) => {
        if (type === "demand") {
            if (demandParam.type === "image/png" || demandParam.type === "image/jpeg") {
                return "png";
            } else if (demandParam.type === "application/pdf") {
                return "pdf";
            } else if (demandParam.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
                return "word";
            } else if (demandParam.type === "application/msword" || demandParam.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
                demandParam.type === "application/vnd.ms-excel") {
                return "excel";
            } else if (demandParam.type === "application/zip") {
                return "zip";
            } else if (demandParam.type === "application/x-rar-compressed") {
                return "rar";
            } else {
                return "others";
            }
        } else if (type === "classification") {
            if (classification.classificationAttachment.type === "image/png" || classification.classificationAttachment.type === "image/jpeg") {
                return "png";
            } else if (classification.classificationAttachment.type === "application/pdf") {
                return "pdf";
            } else if (classification.classificationAttachment.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
                return "word";
            } else if (classification.classificationAttachment.type === "application/msword" || classification.classificationAttachment.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
                classification.classificationAttachment.type === "application/vnd.ms-excel") {
                return "excel";
            } else if (classification.classificationAttachment.type === "application/zip") {
                return "zip";
            } else if (classification.classificationAttachment.type === "application/x-rar-compressed") {
                return "rar";
            }
        }
    }

    function donwloadAttachment(base64: any, type: any, name: any) {
        const buffer = base64ToArrayBuffer(base64);
        const blob = new Blob([buffer], { type: type });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.href = url;
        a.download = name;
        a.click();
        URL.revokeObjectURL(url);
    }


    function base64ToArrayBuffer(base64: string): ArrayBuffer {
        const binaryString = window.atob(base64);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes.buffer;
    }


    const dateFormat = (date: any) => {
        const year = date.slice(0, 4);
        const month = date.slice(5, 7) - 1;
        const day = date.slice(8, 10);

        return day + "/" + month + "/" + year;
    }

    const payback = (dateInit: any, dateEnd: any) => {
        const date1: any = new Date(dateInit);
        const date2: any = new Date(dateEnd);

        const diffInMs = Math.abs(date2 - date1); // obtém a diferença em milissegundos
        const diffInMonths = diffInMs / (1000 * 60 * 60 * 24 * 30); // converte para meses

        if (diffInMonths.toFixed(0) === "1") {
            return diffInMonths.toFixed(0) + " mês";
        } else {
            return diffInMonths.toFixed(0) + " meses";
        }
    }

    function beneficiaryBus(beneficiaryBu: any) {
        let bus: any = [];

        if (beneficiaryBu !== undefined) {
            for (let i = 0; i < beneficiaryBu.length; i++) {

                bus.push(beneficiaryBu[i].bu.split(" –")[0]);

                if (i === beneficiaryBu.length - 1) {
                    bus = bus.join(", ");
                }
            }
        }
        setBeneficiariesBu(bus);
    }


    const [situationCorrentOpen, setSituationCorrentOpen] = useState(false);
    const [benefitRealOpen, setBenefitRealOpen] = useState(false);
    const [benefitPotentialOpen, setBenefitPotentialOpen] = useState(false);
    const [benefitQualitativeOpen, setBenefitQualitativeOpen] = useState(false);
    const [proposalScopeOpen, setProposalScopeOpen] = useState(false);
    const [complementOpen, setComplementOpen] = useState(false);



    return (
        <div className="view-demand">

            {load ?
                <div>
                    <div className="container">

                        <div className="background-title">

                            { /* Verifica se é uma demanda ou uma proposta */  url === "demand" ? (
                                <Title nav={t("demandViewDemand")} title="viewDemand" />
                            ) : (
                                <Title nav={t("proposalViewProposal")} title="viewProposal" />

                            )}

                        </div>

                        <div className="box h100vh">
                            <Load />
                        </div>
                    </div>
                </div>
                : (
                    <>
                        {
                            url === "demand" || url === "proposal" ? (
                                <div>
                                    <div className="container">

                                        <div className="background-title">

                                            { /* Verifica se é uma demanda ou uma proposta */  url === "demand" ? (
                                                <Title nav={t("demandViewDemand")} title="viewDemand" />
                                            ) : (
                                                <Title nav={t("proposalViewProposal")} title="viewProposal" />

                                            )}

                                            <div className="display-flex">
                                                {url === "demand" && (proposal?.demand?.demandCode !== undefined && proposal?.demand?.demandCode !== null && proposal?.demand?.demandCode !== "") && (worker.office !== "requester") && (
                                                    <div className="openProposal">
                                                        <Link to={"/proposal/view/" + proposal?.demand?.demandCode}>
                                                            <Tooltip title={t("openProposal")} placement="left" arrow>
                                                                <button className="btn-secondary btn-unique">
                                                                    <span className="material-symbols-outlined">
                                                                        open_in_new
                                                                    </span>
                                                                </button>
                                                            </Tooltip>
                                                        </Link>
                                                    </div>
                                                )
                                                }

                                                {viewDemand === "view" || demandVersion === "view" ? (
                                                    <Tooltip className="display-flex-end" title={t("devisualizeDemand")} placement="bottom" arrow>

                                                        <Link to={url === "demand" ? "/demand/rank/" + demand.demandCode + "?" + demand.demandVersion + "?view" : "/demand/rank/" + demand.demandCode + "?" + demand.demandVersion + "?edit"}>
                                                            <div className="visibility-demand">
                                                                <span className="material-symbols-outlined">
                                                                    visibility_off
                                                                </span>
                                                            </div>
                                                        </Link>
                                                    </Tooltip>) :
                                                    (demand?.activeVersion === true) ? (
                                                        (demand.demandStatus !== "Cancelled") ? (
                                                            <ButtonsActions demand={demand} proposal={proposal} workerId={workerId} actionsDemand={actionsDemand} approveDemand={approveDemand} giveBack={giveBack} generatePDF={generatePDF} />
                                                        ) : (
                                                            <div className="display-flex">
                                                                <button className="btn-secondary btn-unique" onClick={() => setModalCancelled(!modalCancelled)}>
                                                                    <span className="material-symbols-outlined">
                                                                        info
                                                                    </span>
                                                                </button>

                                                                <button className="btn-primary mw100">
                                                                    <span className="material-symbols-outlined">
                                                                        download
                                                                    </span>
                                                                    <span>{t("generatePDF")}</span>
                                                                </button>

                                                                {modalCancelled &&
                                                                    <ModalInfoCancelled setModalCancelled={setModalCancelled} title={"reasonForDisapproval"} type="dissapproval" />
                                                                }

                                                            </div>
                                                        )
                                                    ) : demand?.demandCode !== 0 ? (
                                                        <button className="btn-primary mw100">
                                                            <span className="material-symbols-outlined">
                                                                download
                                                            </span>
                                                            <span>{t("generatePDF")}</span>
                                                        </button>
                                                    ) : null
                                                }
                                            </div>

                                        </div>

                                        <div className="box" id="box">
                                            <div>
                                                <div className="display-flex-space-between display-solicitation-demand">

                                                    <p className="title">{demand.demandTitle}</p>


                                                    { /* Verifica se é uma demanda ou uma proposta */  url === "demand" ? (
                                                        <div className="display-flex-align-center h50">
                                                            {/* <Situation type="demand" situation={demand.demandStatus} demandCode={demand.demandCode} /> */}
                                                            <div className="code-date">{t("date")}: {othersUtil.formatDate(demand?.demandDate)}</div>
                                                            <div className="code">{demand.demandCode}</div>
                                                        </div>
                                                    ) : (
                                                        <div className="display-flex-align-center h50">
                                                            <div className="code-date">{t("date")}:  {othersUtil.addZeroDate(proposal?.proposalDate)}</div>
                                                            <div className="code">{proposal.proposalCode}</div>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className={"situation-current " + situationCorrentOpen}>


                                                    <div className="display-flex-space-between header-table">
                                                        <div className="display-flex-align-center">
                                                            <p className="title" >{t("requester")}:</p>
                                                            <Link to={"/profile/" + demand.requesterRegistration.workerCode} className="text-information workerName">
                                                                <div className="profile-worker">
                                                                    {demand.requesterRegistration.workerName.split(" ")[0].charAt(0)}
                                                                </div>
                                                                {demand.requesterRegistration.workerName}
                                                            </Link>
                                                        </div>

                                                        <span onClick={() => setSituationCorrentOpen(!situationCorrentOpen)} className="material-symbols-outlined arrow-expend">
                                                            expand_more
                                                        </span>
                                                    </div>

                                                    {
                                                        proposal.responsibleAnalyst.workerName !== "" ? (
                                                            <div className="responsibleAnalyst">
                                                                <div className="display-flex">

                                                                    <p className="title">{t("responsibleAnalyst")}:</p>
                                                                    <Link to={"/profile/" + proposal.responsibleAnalyst.workerCode} className="text-information workerName">
                                                                        <div className="profile-worker">
                                                                            {proposal.responsibleAnalyst.workerName.split(" ")[0].charAt(0)}
                                                                        </div>
                                                                        {proposal.responsibleAnalyst.workerName}
                                                                    </Link>

                                                                </div>
                                                            </div>
                                                        ) : (
                                                            null
                                                        )
                                                    }


                                                    <div className="display-grid">
                                                        <p className="title">{t("currentSituation")}:</p>
                                                        {demand.currentProblem ? (
                                                            <div className="text-information" >{HtmlReactParser(demand.currentProblem)}</div>
                                                        ) : (
                                                            null
                                                        )}
                                                    </div>

                                                    <div className="display-grid">
                                                        <p className="title objective">{t("objective")}:</p>
                                                        {demand.demandObjective ? (
                                                            <div className="text-information">{HtmlReactParser(demand.demandObjective)}</div>
                                                        ) : (
                                                            null
                                                        )}
                                                    </div>
                                                </div>

                                                {
                                                    (url === "proposal") ? (
                                                        <div className={"proposalScope " + proposalScopeOpen} >
                                                            <div className="display-flex-space-between header-table">

                                                                <p className="title">{t("proposalScope")}</p>
                                                                <span onClick={() => setProposalScopeOpen(!proposalScopeOpen)} className="material-symbols-outlined arrow-expend">
                                                                    expand_more
                                                                </span>
                                                            </div>


                                                            {proposal.descriptiveProposal ? (
                                                                <div className="descriptiveProposal text-information">
                                                                    {HtmlReactParser(proposal.descriptiveProposal)}
                                                                </div>
                                                            ) : (
                                                                null
                                                            )}

                                                        </div>
                                                    ) : (
                                                        null
                                                    )
                                                }

                                                <div className={"real-benefit " + benefitRealOpen}>

                                                    <div className="display-flex-space-between header-table">
                                                        <p className="title">{t("benefitReal")}</p>

                                                        <span onClick={() => setBenefitRealOpen(!benefitRealOpen)} className="material-symbols-outlined arrow-expend">
                                                            expand_more
                                                        </span>
                                                    </div>


                                                    <div className="infos">

                                                        <div className="display-flex-center">
                                                            <span className="bold-text">{t("monthlyValue")}:  </span>
                                                            {demand.realBenefit.realCurrency === "R$" ? (
                                                                <span>R$</span>
                                                            ) : (demand.realBenefit.realCurrency === "$") ? (
                                                                <span>$</span>
                                                            ) : (
                                                                <span>€</span>
                                                            )}

                                                            <div className="text-information">{demand.realBenefit.realMonthlyValue.toLocaleString()}</div>
                                                        </div>
                                                    </div>

                                                    <div className="display-grid description">
                                                        <span className="desc">{t("description")}:</span>
                                                        <div className="text-information">{demand.realBenefit.realBenefitDescription}</div>

                                                    </div>
                                                </div>


                                                <div className={"potential-benefit " + benefitPotentialOpen}>
                                                    <div className="display-flex-space-between header-table">
                                                        <p className="title">{t("benefitPotential")}</p>

                                                        <span onClick={() => setBenefitPotentialOpen(!benefitPotentialOpen)} className="material-symbols-outlined arrow-expend">
                                                            expand_more
                                                        </span>
                                                    </div>

                                                    <div className="infos">

                                                        <div className="display-flex-center">
                                                            <span className="bold-text">{t("monthlyValue")}: </span>

                                                            <span>
                                                                {demand.potentialBenefit.potentialCurrency}
                                                            </span>


                                                            <div className="text-information">{demand.potentialBenefit.potentialMonthlyValue.toLocaleString()}</div>

                                                        </div>
                                                    </div>

                                                    <div className="infos">
                                                        <span>{t("legalObligation")}: {
                                                            (demand.potentialBenefit.legalObrigation === true) ? (<span>Sim</span>) : (<span>Não</span>)}</span>
                                                    </div>

                                                    <div className="display-grid description">

                                                        <span className="desc">{t("description")}:</span>

                                                        {demand.potentialBenefit.potentialBenefitDescription !== "" && (
                                                            <div className="text-information">{HtmlReactParser(demand.potentialBenefit.potentialBenefitDescription)}</div>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className={"qualitative-benefit " + benefitQualitativeOpen}>

                                                    <div className="display-flex-space-between header-table">
                                                        <p className="title">{t("benefitQualitative")}</p>

                                                        <span onClick={() => setBenefitQualitativeOpen(!benefitQualitativeOpen)} className="material-symbols-outlined arrow-expend">
                                                            expand_more
                                                        </span>
                                                    </div>

                                                    <div className="infos">
                                                        <span>{t("internalControlRequirements")}: {(demand.qualitativeBenefit.interalControlsRequirements === true) ? (<span>Sim</span>) : <span>Não</span>}</span>
                                                    </div>

                                                    <div className="infos">
                                                        <span>{t("frequencyUse")}: {demand.qualitativeBenefit.frequencyOfUse}</span>
                                                    </div>

                                                    <div className="description display-grid">

                                                        <span className="desc">{t("description")}:</span>
                                                        {demand.qualitativeBenefit.qualitativeBenefitDescription ? (
                                                            <div className="text-information">{HtmlReactParser(demand.qualitativeBenefit.qualitativeBenefitDescription)}</div>
                                                        ) : (
                                                            null
                                                        )}

                                                    </div>
                                                </div>

                                                {centerCost && (
                                                    <Table title="costCenter" demandCode={demand?.demandCode} proposalCode={proposal?.proposalCode} headers={["costCenterCode", "costCenter"]} items={centerCost} />
                                                )
                                                }

                                            </div>


                                            {(stepDemand === 1 || stepDemand === 2) ? (

                                                (classification) ? (


                                                    (classification.epicJiraLink) ?
                                                        <Table title="classification" demandCode={demand?.demandCode} proposalCode={proposal?.proposalCode} headers={["size", "requesterBU", "buBenefited", "responsibleItSession", "ppmCode", "linkEpicJira"]} items={[classification.classificationSize, classification.requesterBu.bu, beneficiariesBu, classification.itSection, classification.ppmCode, classification.epicJiraLink]} />
                                                        :
                                                        <Table title="classification" demandCode={demand?.demandCode} proposalCode={proposal?.proposalCode} headers={["size", "requesterBU", "buBenefited", "responsibleItSession"]} items={[classification.classificationSize, classification.requesterBu.bu, beneficiariesBu, classification.itSection]} />
                                                ) : (null)
                                            ) : (null)
                                            }

                                            {proposalExpenseValue?.expensesCode > 0 ? (<Expenses type="expenses" proposalExpense={proposalExpenseValue} realCurrency={demand.realBenefit.realCurrency} />) : (null)}

                                            {proposalExpenseRecurrent?.expensesCode > 0 ? (<Expenses type="recurrent" proposalExpense={proposalExpenseRecurrent} realCurrency={demand.realBenefit.realCurrency} />) : (null)}

                                            {proposalExpenseInternal?.expensesCode > 0 ? (<Expenses type="internal" proposalExpense={proposalExpenseInternal} realCurrency={demand.realBenefit.realCurrency} />) : (null)}


                                            {proposalExpense > 0 ? (
                                                <div className={"complement "} >
                                                    <div className="display-block">
                                                        <div className="display-flex-align-center">
                                                            <p className="title">{t("deadline")}:</p>
                                                            <div>
                                                                <span>{initialRunPeriod}</span>
                                                                <span>&nbsp; à &nbsp;</span>
                                                                <span>{finalExecutionPeriod}</span>
                                                            </div>

                                                        </div>
                                                        <div className="display-flex-align-center">
                                                            <p className="title">{t("Payback")}:</p>
                                                            <span> {payBack}</span>
                                                        </div>
                                                        <div className="display-flex-align-center">
                                                            <p className="title">{t("responsibleBussiness")}:</p>
                                                            {responsibleBussiness.map((val: any, index: any) => (


                                                                <Link to={"/profile/" + val.workerCode} className="text-information workerName">
                                                                    <div className="profile-worker">
                                                                        {val.workerName.split(" ")[0].charAt(0)}
                                                                    </div>
                                                                    {val.workerName}
                                                                </Link>

                                                            ))}
                                                        </div>

                                                    </div>
                                                </div>
                                            ) : (null)}


                                            {demand?.demandAttachments?.length > 0 ? (
                                                <div className="attachments">

                                                    <p className="title">{t("attachments")}</p>

                                                    <div className="display-flex">

                                                        {
                                                            demand.demandAttachments.map((val: any, index: any) => (
                                                                <Tooltip title={val.name} arrow>
                                                                    <a onClick={() => donwloadAttachment(val.dice, val.type, val.name)} download={"teste.jpg"} target="_blank">
                                                                        <div className="attachment">
                                                                            <div className="attachment-image">
                                                                                <img src={"/attachment/" + attatchmentType("demand", val) + ".png"} alt="" />
                                                                            </div>
                                                                            <span>{val.name}</span>
                                                                        </div>
                                                                    </a>
                                                                </Tooltip>
                                                            ))
                                                        }



                                                        {classification?.classificationAttachment ? (
                                                            <Tooltip title={classification.classificationAttachment.name} arrow>
                                                                <a onClick={() => donwloadAttachment(classification.classificationAttachment.dice, classification.classificationAttachment.type, classification.classificationAttachment.name)} download={"teste.jpg"} target="_blank">
                                                                    <div className="attachment">
                                                                        <div className="attachment-image">
                                                                            <img src={"/attachment/" + attatchmentType("classification", classification) + ".png"} alt="" />
                                                                        </div>
                                                                        <span>{classification.classificationAttachment.name}</span>
                                                                    </div>
                                                                </a>
                                                            </Tooltip>
                                                        ) : (null)
                                                        }


                                                    </div>

                                                </div>
                                            ) : (null)
                                            }

                                        </div>
                                    </div>
                                </div>
                            ) : url === "agenda" ? (
                                <div>
                                    <div className="container">


                                        <div className="background-title">

                                            <Title nav={t("agendaAgendaName")} title="viewAgenda" />


                                            <div className="display-flex-end">
                                                {pendingMinute < proposalSpecific.length && minute.length === 0 ? (
                                                    <div className="display-flex-end">
                                                        <Link to={"/minutes/create/" + demandCode}>
                                                            <button className="btn-primary">{t("finish")}</button>
                                                        </Link>
                                                    </div>
                                                ) : (null)
                                                }

                                                {proposalPublished.length < approvedDG && proposalPublished.length !== 0 && !(minute[0]?.minuteType === "DG" || minute[1]?.minuteType === "DG" || minute[2]?.minuteType === "DG") ? (

                                                    <div className="display-flex-end">
                                                        <Link to={"/minutes/create/" + demandCode + "?dg"}>
                                                            <button className="btn-primary">{t("generateMinuteDG")}</button>
                                                        </Link>

                                                    </div>
                                                ) : (null)
                                                }

                                                <ButtonActionAnalyst agenda={agenda} />
                                            </div>

                                        </div>

                                        <div className="box">

                                            {agenda ? (
                                                <>
                                                    <div className="display-solicitation-demand">

                                                        <p className="title">{agenda?.commission?.commissionName?.toUpperCase() + " – " + agenda?.agendaDate}</p>

                                                    </div>

                                                    <div className="box">

                                                        <div className="agendaDate">
                                                            <p>{t("dateMeeting")}</p>
                                                            <span>{agenda?.agendaDate}
                                                                &nbsp;às&nbsp;
                                                                {agenda?.initialDate?.split("T")[1]}
                                                            </span>

                                                            &nbsp;até&nbsp;

                                                            <span>{agenda.finalDate?.split("T")[1]}</span>

                                                        </div>
                                                    </div>
                                                </>
                                            ) : (null)}



                                            <div className={"complement " + complementOpen} >
                                                <div className="display-flex-space-between">
                                                    <p className="title">{t("comission")}</p>

                                                    <span onClick={() => setComplementOpen(!complementOpen)} className="material-symbols-outlined arrow-expend">
                                                        expand_more
                                                    </span>
                                                </div>

                                                <table>
                                                    <tbody>

                                                        <tr>
                                                            <td className="display-flex-start pl20">
                                                                {comission.commissionName}
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>


                                            <div className={"proposals-view " + benefitQualitativeOpen} >
                                                <div className="display-flex-space-between header-proposals-view">
                                                    <p className="title">{t("proposals")}</p>

                                                    <span onClick={() => setBenefitQualitativeOpen(!benefitQualitativeOpen)} className="material-symbols-outlined arrow-expend">
                                                        expand_more
                                                    </span>
                                                </div>

                                                <table>
                                                    <tbody>
                                                        {proposalSpecific.map((val: any, index: any) => {

                                                            if (proposalSpecific.length !== index + 1) {
                                                                return (
                                                                    <div className="h50px display-flex tr" key={index}>
                                                                        <div className="display-flex-start pl20 display-flex-center">
                                                                            <div className="code">
                                                                                {val.proposalCode}
                                                                            </div>

                                                                            <span>
                                                                                {val.demand.demandTitle}
                                                                            </span>


                                                                        </div>

                                                                        <div className="w20 display-flex-align-center">

                                                                            <div className="proposal-view-buttons">
                                                                                {val?.proposalStatus === "Pending" ? (
                                                                                    <Link to={"/proposal/comission-opinion/" + val.proposalCode + "?" + agenda.agendaCode}>
                                                                                        <button className="btn-primary">{t("insertCommissionOpinion")}</button>
                                                                                    </Link>
                                                                                ) : val?.proposalStatus === "ApprovedComission" && val?.published === true && minute.length !== 0 ? (
                                                                                    <div className="display-flex-align-center">

                                                                                        <Link to={"/proposal/dg-opinion/" + val.proposalCode + "?" + agenda.agendaCode} className="mr20">
                                                                                            <button className="btn-primary">{t("insertDGOpnion")}</button>
                                                                                        </Link>

                                                                                        <div className="display-flex-space-between w320px">

                                                                                            <div className="proposal-status mr20">
                                                                                                <span>
                                                                                                    {t("status")}: {t(val?.proposalStatus)}
                                                                                                </span>
                                                                                            </div>

                                                                                            <div className="proposal-status mr20">
                                                                                                <span>
                                                                                                    {t("published")}: {val?.published === true ? t("yes") : t("no")}
                                                                                                </span>
                                                                                            </div>
                                                                                        </div>

                                                                                    </div>
                                                                                ) : (
                                                                                    <div className="display-flex-space-between w320px">

                                                                                        <div className="proposal-status">
                                                                                            <span>
                                                                                                {t("status")}: {t(val?.proposalStatus)}
                                                                                            </span>
                                                                                        </div>

                                                                                        <div className="proposal-status ml20 mr20">
                                                                                            <span>
                                                                                                {t("published")}: {val?.published === true ? t("yes") : t("no")}
                                                                                            </span>
                                                                                        </div>
                                                                                    </div>
                                                                                )}
                                                                            </div>

                                                                        </div>

                                                                        {val?.commissionOpinion &&

                                                                            <>
                                                                                <div className="w20px ml10 display-flex-align-center">
                                                                                    <button className="btn-secondary btn-unique" onClick={() => setModalCancelled(!modalCancelled)}>
                                                                                        <span className="material-symbols-outlined">
                                                                                            description
                                                                                        </span>
                                                                                    </button>
                                                                                </div>

                                                                                {modalCancelled &&
                                                                                    <ModalInfoCancelled setModalCancelled={setModalCancelled} title={"commissionOpinion"} descriptive={val?.commissionOpinion} type="opinion" />
                                                                                }
                                                                            </>
                                                                        }

                                                                        <div className="w20px ml10 display-flex-align-center">
                                                                            <Link to={"/proposal/view/" + val.proposalCode}>
                                                                                <button className="btn-secondary btn-unique">
                                                                                    <span className="material-symbols-outlined">
                                                                                        open_in_new
                                                                                    </span>
                                                                                </button>
                                                                            </Link>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            } else {
                                                                return (
                                                                    <div className="h50px noBorder display-flex tr" key={index}>
                                                                        <div className="display-flex-start pl20 display-flex-center">
                                                                            <div className="code">
                                                                                {val.proposalCode}
                                                                            </div>

                                                                            <span>
                                                                                {val.demand.demandTitle}
                                                                            </span>


                                                                        </div>

                                                                        <div className="w20 display-flex-align-center">

                                                                            <div className="proposal-view-buttons">
                                                                                {val?.proposalStatus === "Pending" ? (
                                                                                    <Link to={"/proposal/comission-opinion/" + val.proposalCode + "?" + agenda.agendaCode}>
                                                                                        <button className="btn-primary">{t("insertCommissionOpinion")}</button>
                                                                                    </Link>
                                                                                ) : val?.proposalStatus === "ApprovedComission" && val?.published === true && minute.length !== 0 ? (
                                                                                    <div className="display-flex-align-center">

                                                                                        <Link to={"/proposal/dg-opinion/" + val.proposalCode + "?" + agenda.agendaCode} className="mr20">
                                                                                            <button className="btn-primary">{t("insertDGOpnion")}</button>
                                                                                        </Link>

                                                                                        <div className="display-flex-space-between w320px">
                                                                                            <div className="proposal-status mr20">
                                                                                                <span>
                                                                                                    {t("published")}: {val?.published === true ? t("yes") : t("no")}
                                                                                                </span>
                                                                                            </div>

                                                                                            <div className="proposal-status mr20">
                                                                                                <span>
                                                                                                    {t("status")}: {t(val?.proposalStatus)}
                                                                                                </span>
                                                                                            </div>
                                                                                        </div>

                                                                                    </div>
                                                                                ) : (
                                                                                    <div className="display-flex-space-between w320px">

                                                                                        <div className="proposal-status">
                                                                                            <span>
                                                                                                {t("status")}: {t(val?.proposalStatus)}
                                                                                            </span>
                                                                                        </div>

                                                                                        <div className="proposal-status ml20 mr20">
                                                                                            <span>
                                                                                                {t("published")}: {val?.published === true ? t("yes") : t("no")}
                                                                                            </span>
                                                                                        </div>
                                                                                    </div>
                                                                                )}
                                                                            </div>

                                                                        </div>


                                                                        {val?.commissionOpinion &&
                                                                            <>
                                                                                <div className="w20px ml10 display-flex-align-center">
                                                                                    <button className="btn-secondary btn-unique" onClick={() => setModalCancelled(!modalCancelled)}>
                                                                                        <span className="material-symbols-outlined">
                                                                                            description
                                                                                        </span>
                                                                                    </button>
                                                                                </div>

                                                                                {modalCancelled &&
                                                                                    <ModalInfoCancelled setModalCancelled={setModalCancelled} title={"commissionOpinion"} descriptive={val?.commissionOpinion} type="opinion" />
                                                                                }
                                                                            </>
                                                                        }

                                                                        <div className="w20px ml10 display-flex-align-center">
                                                                            <Link to={"/proposal/view/" + val.proposalCode}>
                                                                                <button className="btn-secondary btn-unique">
                                                                                    <span className="material-symbols-outlined">
                                                                                        open_in_new
                                                                                    </span>
                                                                                </button>
                                                                            </Link>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            }

                                                        })}
                                                    </tbody>
                                                </table>
                                            </div>
                                            {agenda?.minutePublished ||
                                                agenda?.minuteNotPublished ? (

                                                <div className={"complement " + situationCorrentOpen} >
                                                    <div className="display-flex-space-between">
                                                        <p className="title">{t("minutes")}</p>

                                                        <span onClick={() => setSituationCorrentOpen(!situationCorrentOpen)} className="material-symbols-outlined arrow-expend">
                                                            expand_more
                                                        </span>
                                                    </div>

                                                    <table>
                                                        <tbody>
                                                            {agenda?.minutePublished ? (
                                                                <tr className="h50px">
                                                                    <td className="display-flex-space-between pl20">
                                                                        {t(agenda.minutePublished.minuteName)}

                                                                        <Link to={"/minute/view/" + agenda.minutePublished.minuteCode}>
                                                                            <div className="btn-secondary btn-unique">
                                                                                <span className="material-symbols-outlined">
                                                                                    open_in_new
                                                                                </span>
                                                                            </div>
                                                                        </Link>
                                                                    </td>
                                                                </tr>
                                                            ) : null
                                                            }

                                                            {agenda?.minuteNotPublished ? (
                                                                <tr className="h50px">
                                                                    <td className="display-flex-space-between pl20">
                                                                        {t(agenda.minuteNotPublished.minuteName)}

                                                                        <Link to={"/minute/view/" + agenda.minuteNotPublished.minuteCode}>
                                                                            <div className="btn-secondary btn-unique">
                                                                                <span className="material-symbols-outlined">
                                                                                    open_in_new
                                                                                </span>
                                                                            </div>
                                                                        </Link>
                                                                    </td>
                                                                </tr>
                                                            ) : null
                                                            }

                                                            {agenda?.minuteDG ? (
                                                                <tr className="h50px">
                                                                    <td className="display-flex-space-between pl20">
                                                                        {t(agenda.minuteDG.minuteName)}

                                                                        <Link to={"/minute/view/" + agenda.minuteDG.minuteCode}>
                                                                            <div className="btn-secondary btn-unique">
                                                                                <span className="material-symbols-outlined">
                                                                                    open_in_new
                                                                                </span>
                                                                            </div>
                                                                        </Link>
                                                                    </td>
                                                                </tr>
                                                            ) : null
                                                            }

                                                        </tbody>
                                                    </table>
                                                </div>

                                            ) : (null)
                                            }

                                        </div>
                                        < Footer />
                                    </div>
                                </div>
                            ) : url === "minute" ? (
                                <div className="minute-box">

                                    <div className="container">

                                        <div className="background-title">

                                            <Title nav={t("minute")} title="viewMinute" />

                                            <ButtonsActions demand={demand} proposal={proposal} minute={minute} workerId={workerId} actionsDemand={actionsDemand} approveDemand={approveDemand} giveBack={giveBack} generatePDF={generatePDF} />


                                        </div>

                                        <div className="box">


                                            {minute?.agenda ? (

                                                <div className="display-block">


                                                    <div className="display-flex-space-between w100">

                                                        <p className="title">{(t("minute") + " REUNIÃO " + minute.agenda.commission.commissionName.split("–")[1]).toUpperCase()}</p>

                                                        <img className="logo-weg" src="/images/weg-blue.png" alt="" />
                                                    </div>


                                                    <div className="display-grid display-flex-end minute-date">
                                                        <div className="display-flex-space-between w100">
                                                            <span>ATA Nº:&nbsp;</span>
                                                            <span>
                                                                {minute.agenda.sequentialNumber + "/" + minute.agenda.agendaDate.split("/")[2]}
                                                            </span>
                                                        </div>

                                                        <div className="display-flex-space-between w100">
                                                            <span>Data:&nbsp;</span>
                                                            <span>{minute.agenda.agendaDate}</span>
                                                        </div>

                                                        <div className="display-flex-space-between w100">
                                                            <span>Início:&nbsp;</span>
                                                            <span>{minute.agenda.initialDate.split("T")[1]}</span>
                                                        </div>

                                                        <div className="display-flex-space-between w100">
                                                            <span>Término:&nbsp;</span>
                                                            <span>{minute.agenda.finalDate.split("T")[1]}</span>
                                                        </div>
                                                    </div>

                                                    {minute?.agenda?.proposals.map((val: any, index: any) => (
                                                        <>
                                                            {(val.published === true && minute.minuteType === "Published" || val.published === true && minute.minuteType === "DG"
                                                                || val.published === null && minute.minuteType === "Not Published") &&
                                                                <>
                                                                    <p>{val.proposalName} - {val.proposalCode}</p>

                                                                    <div className="text-information">
                                                                        <b> {t("objective")}:</b>
                                                                        {HtmlReactParser(val.demand.demandObjective)}
                                                                    </div>

                                                                    <div className="text-information">
                                                                        <b> {t("proposalScope")}:</b>
                                                                        {HtmlReactParser(val.descriptiveProposal)}
                                                                    </div>

                                                                    <div className="text-information display-flex">
                                                                        <b>{t("totalsCosts")}:</b>
                                                                        {"R$" + val.totalCosts.toLocaleString()}
                                                                    </div>

                                                                    {val?.expenseRecurrent?.expensesCode > 0 ? (<Expenses type="recurrent" proposalExpense={val?.expenseRecurrent} />) : (null)}

                                                                    {val?.expenseValue?.expensesCode > 0 ? (<Expenses type="expenses" proposalExpense={val?.expenseValue} />) : (null)}

                                                                    {val?.expenseInternal?.expensesCode > 0 ? (<Expenses type="internal" proposalExpense={val?.expenseInternal} />) : (null)}




                                                                    <div className="text-information display-flex">
                                                                        <b>{t("periodOfExecution")}: </b>
                                                                        {val.initialRunPeriod.split("T")[0] + " à " + val.finalExecutionPeriod.split("T")[0]}
                                                                    </div>

                                                                    <div className="text-information display-flex">
                                                                        <b>{t("Payback")}: </b>
                                                                        {payback(val.initialRunPeriod, val.finalExecutionPeriod)}
                                                                    </div>

                                                                    <div className="text-information display-flex">
                                                                        <b>{t("responsibleBussiness")}: </b>
                                                                        {val.workers[0].workerName}
                                                                    </div>

                                                                    <div className="text-information display-flex">
                                                                        <b className="label">{t("commissionOpinion")}: </b>
                                                                        {t(val.proposalStatus)}
                                                                    </div>

                                                                    {val.commissionOpnion &&
                                                                        <div className="text-information display-flex">
                                                                            <b>Obs:</b>
                                                                            {val.commissionOpnion}
                                                                        </div>
                                                                    }


                                                                </>
                                                            }

                                                        </>
                                                    ))}

                                                    <div className="hr" />

                                                    <div className="text-information display-grid workers">
                                                        <b className="label">{t("Participantes")}</b>
                                                        {minute.agenda.commission.commissionName}
                                                    </div>

                                                    <div className="text-information display-flex-center workers">
                                                        <div className="display-grid mr20">
                                                            Joaozinho da Silva
                                                            <b>Coordenador</b>
                                                        </div>

                                                        <div className="display-grid">
                                                            Cicrano Padilha
                                                            <b>Diretor Responsável</b>
                                                        </div>
                                                    </div>

                                                </div>
                                            ) : (null)
                                            }

                                        </div>

                                    </div>

                                </div>

                            ) : null
                        }
                    </>
                )}

            {url !== "agenda" ? (<Footer />) : null}

            {false &&
                <CompareDemands />
            }

        </div >
    );
}