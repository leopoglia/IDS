import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ToastContainer } from 'react-toastify';


import Title from "../../../Fixed/Search/Title";
import ServicesDemand from "../../../../services/demandService";
import ServicesProposal from "../../../../services/proposalService";
import ServicesNotification from "../../../../services/notificationService";
import ServicesAgenda from "../../../../services/agendaService";
import ServicesExpense from "../../../../services/expenseService";
import ServicesMinute from "../../../../services/minuteService";
import Footer from "../../../Fixed/Footer";
import "react-toastify/dist/ReactToastify.css";
import PDF from "./Others/PDF";
import HtmlReactParser from 'html-react-parser';
import UserContext from "../../../../context/userContext";
import Tooltip from '@mui/material/Tooltip';
import Expenses from "./Others/Expenses";
import "./style.css";
import Table from "./Others/Table";
import ButtonsActions from "./Others/ButtonsActions";
import notifyUtil from "../../../../utils/notifyUtil";


export default function ViewDemand() {

    const { t } = useTranslation();

    const worker: any = useContext(UserContext).worker; // Buscar dados do usuário
    const office = worker.office; // Buscar tipo de usuário
    const workerName = worker.name; // Buscar nome do usuário
    const workerId = worker.id; // Buscar código do usuário
    const url = window.location.href.split("/")[3]; // Buscar tipo da demanda
    const demandCode = parseInt(window.location.href.split("/")[5]); // Buscar código da demanda
    let pendingMinute: any = 0;
    const demandVersion = parseInt(window.location.href.split("?")[1]); // Buscar versão da demanda

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
    const [comission, setComission] = useState([]); // Dados da comissão

    // Dados da demanda
    const [demand, setDemand]: any = useState({
        requesterRegistration: { workerCode: "", workerName: "" },
        demandStatus: "", demandType: "", demandDescription: "", demandDate: "",
        classification: { classificationCode: "", classificationName: "" },
        realBenefit: { realBenefitCode: "", realCurrency: 0, realMonthlyValue: 0 },
        potentialBenefit: { potencialBenefitCode: "", potentialCurrency: 0, potentialMonthlyValue: 0 },
        qualitativeBenefit: { qualitativeBenefitCode: "", qualitativeBenefitDescription: "" },
        demandAttachment: { demandAttachmentCode: "", dice: "", type: "", name: "" }
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

    // Chama função ao entrar na página
    useEffect(() => {
        // Buscar dados da demanda

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

    }, [url, demand.demandStatus, proposal.proposalStatus, proposalSpecific[0].proposalStatus]);

    function getDemand() {
        ServicesDemand.findByDemandCodeAndDemandVersion(demandCode, demandVersion).then((response: any) => {
            console.log("version: " + demandVersion);
            console.log(response);


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
            }
        })
    }

    const [proposalExpense, setProposalExpense]: any = useState([]);
    const [proposalExpenseValue, setProposalExpenseValue]: any = useState(0);
    const [proposalExpenseRecurrent, setProposalExpenseRecurrent]: any = useState(0);
    const [proposalExpenseInternal, setProposalExpenseInternal]: any = useState(0);

    proposalSpecific.map((val: any) => (
        val.proposalStatus === "Pending" ? (
            pendingMinute += 1
        ) : (
            null
        )
    ))

    // Buscar proposta
    function getProposal() {

        ServicesProposal.findById(demandCode).then((response: any) => {
            setProposal(response)

            setResponsibleBussiness(response?.responsibleAnalyst.workerName) // Seta o responsável de negócios da proposta


            ServicesDemand.findById(response.demand.demandCode).then((demand: any) => {
                console.log("DEMAND ----> ", demand)
                setDemand(demand); // Seta a demanda da proposta




                setStepDemand(2) // Seta o passo da demanda
                setClassification(demand.classification) // Seta a classificação da demanda
                beneficiaryBus(demand?.classification?.beneficiaryBu)

                setCenterCost(demand.costCenter) // Seta o centro de custo da demanda

            })

            if (response.proposalStatus === "Pending") {
                setActionsDemand(7);
            }

            ServicesExpense.findAll().then((response: any) => {
                let expense: any = [];

                for (let i = 0; i < response.length; i++) {
                    if (response[i].proposal.proposalCode === demandCode) {
                        expense.push(response[i])

                        if (response[i].expenseType === "recurrent") {
                            setProposalExpenseRecurrent(proposalExpenseRecurrent + 1);
                        } else if (response[i].expenseType === "internal") {
                            setProposalExpenseInternal(proposalExpenseInternal + 1);
                        } else if (response[i].expenseType === "expenses") {
                            setProposalExpenseValue(proposalExpenseValue + 1);
                        }
                    }
                }

                if (expense.length !== 0) {
                    setProposalExpense(expense);
                }

                setInitialRunPeriod(dateFormat(expense[0].proposal.initialRunPeriod));
                setFinalExecutionPeriod(dateFormat(expense[0].proposal.finalExecutionPeriod));
                setPayBack(payback(expense[0].proposal.initialRunPeriod, expense[0].proposal.finalExecutionPeriod));
            })
        })
    }

    ServicesMinute.findAll().then((response: any) => {
        let minutes: any = [];
        for (let i = 0; i < response.length; i++) {
            if (response[i].agenda.agendaCode === demandCode) {
                minutes.push(response[i]);
            }
        }
        setMinute(minutes)
    })

    // Buscar proposta específica
    function getProposalSpecific() {

        ServicesAgenda.findById(demandCode).then((response: any) => {
            let proposals: any = [];
            setComission(response[0].commission)


            for (let i = 0; i < response[0].proposals.length; i++) {
                proposals.push(response[0].proposals[i])
            }
            setProposalSpecific(proposals)


            ServicesMinute.findByAgenda(response[0].agendaCode).then((minute: any) => {
                response[0].minutePublished = minute[1];
                response[0].minuteNotPublished = minute[0];

                setAgenda(response[0])

            })

        })
    }

    // Buscar ata
    function getMinute() {
        ServicesMinute.findById(demandCode).then((response: any) => {
            setMinute(response)
        })
    }

    // Aprovar demanda (Gerente de Negócios)
    function approveDemand() {
        ServicesDemand.updateStatus(demandCode, "BacklogRankApproved").then((response: any) => {
            // Notificação para o solicitante
            ServicesNotification.save("Um gerente de Negócio aprovou a sua demanda de código  " + demand.demandCode, demand.requesterRegistration.workerCode, "done", "demand");
            ServicesDemand.approve(demandCode);
            notifyUtil.success(t("demandApproved"));
            getDemand();
            setActionsDemand(0);
        }).catch((error: any) => {
            notifyUtil.error(t("somethingWrong"));
        })
    }

    // Devolver demanda (Analista)
    function giveBack() {

        ServicesDemand.updateStatus(demandCode, "BacklogEdit").then((response: any) => {
            // Notificação para o solicitante
            ServicesNotification.save("Um analista devolveu a sua demanda de código  " + demand.demandCode, demand.requesterRegistration.workerCode, "info", "demand");
            notifyUtil.success(t("demandReturn"));

            getDemand();
        }).catch((error: any) => {
            notifyUtil.error(t("somethingWrong"));
        })
    }

    // Abrir modal de PDF
    const [pdf, setPdf] = useState(false);
    const generatePDF = () => {
        setPdf(true);
    }

    const attatchmentType = (type: string) => {
        if (type === "demand") {
            if (demand.demandAttachment.type === "image/png" || demand.demandAttachment.type === "image/jpeg") {
                return "png";
            } else if (demand.demandAttachment.type === "application/pdf") {
                return "pdf";
            } else if (demand.demandAttachment.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
                return "word";
            } else if (demand.demandAttachment.type === "application/msword" || demand.demandAttachment.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
                demand.demandAttachment.type === "application/vnd.ms-excel") {
                return "excel";
            } else if (demand.demandAttachment.type === "application/zip") {
                return "zip";
            } else if (demand.demandAttachment.type === "application/x-rar-compressed") {
                return "rar";
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

    const [initialRunPeriod, setInitialRunPeriod]: any = useState(0);
    const [finalExecutionPeriod, setFinalExecutionPeriod]: any = useState(0);
    const [payBack, setPayBack]: any = useState(0);
    const [responsibleBussiness, setResponsibleBussiness]: any = useState("");


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

            {pdf ? <PDF requester={workerName} demandTitle={demand.demandTitle} demandCode={demand.demandCode} /> : null}

            { /* Verifica se é uma demanda ou uma proposta */  url === "demand" || url === "proposal" ? (
                <div>


                    <div className="container">

                        <div className="background-title">

                            { /* Verifica se é uma demanda ou uma proposta */  url === "demand" ? (
                                <Title nav={t("demandViewDemand")} title="viewDemand" />
                            ) : (
                                <Title nav={t("proposalViewProposal")} title="viewProposal" />

                            )}

                            {
                                (demand.activeVersion === true) ? (
                                    (demand.demandStatus != "Cancelled") ? (
                                        <ButtonsActions demand={demand} proposal={proposal} workerId={workerId} actionsDemand={actionsDemand} approveDemand={approveDemand} giveBack={giveBack} generatePDF={generatePDF} />
                                    ) : (
                                        <button className="btn-primary">
                                            <span className="material-symbols-outlined">
                                                download
                                            </span>
                                            <span>{t("generatePDF")}</span>
                                        </button>
                                    )
                                ) : (
                                    <button className="btn-primary">
                                        <span className="material-symbols-outlined">
                                            download
                                        </span>
                                        <span>{t("generatePDF")}</span>
                                    </button>
                                )
                            }

                        </div>

                        <div className="box" id="box">
                            <div>
                                <div className="display-flex-space-between display-solicitation-demand">
                                    <p className="title">{demand.demandTitle}</p>
                                    { /* Verifica se é uma demanda ou uma proposta */  url === "demand" ? (
                                        <div className="code">{demand.demandCode}</div>
                                    ) : (
                                        <div className="code">{proposal.proposalCode}</div>
                                    )}
                                </div>

                                <div className={"situation-current " + situationCorrentOpen}>


                                    <div className="display-flex header-table">
                                        <p className="title" >{t("requester")}:</p>
                                        <div className="text-information workerName">{demand.requesterRegistration.workerName}</div>

                                        <span onClick={() => setSituationCorrentOpen(!situationCorrentOpen)} className="material-symbols-outlined arrow-expend">
                                            expand_more
                                        </span>
                                    </div>

                                    {
                                        proposal.responsibleAnalyst.workerName !== "" ? (
                                            <div className="responsibleAnalyst">
                                                <div className="display-flex">

                                                    <p className="title">{t("responsibleAnalyst")}:</p>
                                                    <div className="text-information workerName">{proposal.responsibleAnalyst.workerName}</div>
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
                                            {demand.realBenefit.realCurrency === "real" ? (
                                                <span>R$</span>
                                            ) : (demand.realBenefit.realCurrency === "dollar") ? (
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
                                            {demand.potentialBenefit.potentialCurrency === "real" ? (
                                                <span>R$</span>
                                            ) : (demand.potentialBenefit.potentialCurrency === "dollar") ? (
                                                <span>$</span>
                                            ) : (
                                                <span>€</span>
                                            )}

                                            <div className="text-information">{demand.potentialBenefit.potentialMonthlyValue.toLocaleString()}</div>

                                        </div>
                                    </div>

                                    <div className="infos">
                                        <span>{t("legalObligation")}: {
                                            (demand.potentialBenefit.legalObrigation === true) ? (<span>Sim</span>) : (<span>Não</span>)}</span>
                                    </div>

                                    <div className="display-grid description">

                                        <span className="desc">{t("description")}:</span>

                                        <div className="text-information">{demand.potentialBenefit.potentialBenefitDescription}</div>
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

                                        <div>
                                            <span>{t("legalObligation")}: {demand.qualitativeBenefit.frequencyOfUse}</span>
                                        </div>

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
                            {/* 
                            {(stepDemand === 2) ? (
                                <Table title="complements" demandCode={demand?.demandCode}  proposalCode={proposal?.proposalCode} headers={["ppmCode", "linkEpicJira"]} items={[classification.ppmCode, classification.epicJiraLink]} />
                            ) : (null)
                            } */}

                            {proposalExpenseValue !== 0 ? (<Expenses type="expenses" proposalExpense={proposalExpense} />) : (null)}

                            {proposalExpenseRecurrent !== 0 ? (<Expenses type="recurrent" proposalExpense={proposalExpense} />) : (null)}

                            {proposalExpenseInternal !== 0 ? (<Expenses type="internal" proposalExpense={proposalExpense} />) : (null)}


                            {proposalExpense.length !== 0 ? (
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
                                            <span> {responsibleBussiness}</span>
                                        </div>
                                    </div>
                                </div>
                            ) : (null)}


                            {demand.demandAttachment ? (
                                <div className="attachments">

                                    <p className="title">{t("attachments")}</p>

                                    <div className="display-flex">
                                        <Tooltip title={demand.demandAttachment.name} arrow>
                                            <a onClick={() => donwloadAttachment(demand.demandAttachment.dice, demand.demandAttachment.type, demand.demandAttachment.name)} download={"teste.jpg"} target="_blank">
                                                <div className="attachment">
                                                    <div className="attachment-image">
                                                        <img src={"/attachment/" + attatchmentType("demand") + ".png"} alt="" />
                                                    </div>
                                                    <span>{demand.demandAttachment.name}</span>
                                                </div>
                                            </a>
                                        </Tooltip>
                                        {classification?.classificationAttachment ? (
                                            <Tooltip title={classification.classificationAttachment.name} arrow>
                                                <a onClick={() => donwloadAttachment(classification.classificationAttachment.dice, classification.classificationAttachment.type, classification.classificationAttachment.name)} download={"teste.jpg"} target="_blank">
                                                    <div className="attachment">
                                                        <div className="attachment-image">
                                                            <img src={"/attachment/" + attatchmentType("classification") + ".png"} alt="" />
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
                        </div>

                        <div className="box">

                            {agenda ? (
                                <>
                                    <div className="display-solicitation-demand">
                                        <p className="title">{t("meetingAgenda")} {agenda.agendaCode}</p>
                                    </div>

                                    <div className="box">

                                        <div className="agendaDate">
                                            <p>{t("dateMeeting")}</p>
                                            <span>{agenda.agendaDate}</span>
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
                                        {comission.map((val: any, index: any) => (
                                            <tr key={index}>
                                                <td className="display-flex-start pl20">
                                                    {val.commissionName}
                                                </td>
                                            </tr>

                                        ))}
                                    </tbody>
                                </table>
                            </div>


                            <div className={"proposals-view " + benefitQualitativeOpen} >
                                <div className="display-flex-space-between">
                                    <p className="title">{t("proposals")}</p>

                                    <span onClick={() => setBenefitQualitativeOpen(!benefitQualitativeOpen)} className="material-symbols-outlined arrow-expend">
                                        expand_more
                                    </span>
                                </div>

                                <table>
                                    <tbody>
                                        {proposalSpecific.map((val: any, index: any) => (
                                            <div className="h50px display-flex">
                                                <div className="display-flex-start pl20 display-flex-center">
                                                    <div className="code">
                                                        {val.proposalCode}
                                                    </div>

                                                    <span>
                                                        {val.proposalName}
                                                    </span>


                                                </div>

                                                <div className="w20 display-flex-align-center">

                                                    <div className="proposal-view-buttons">
                                                        {val.proposalStatus === "Pending" ? (
                                                            <Link to={"/proposal/comission-opinion/" + val.proposalCode + "?" + agenda.agendaCode}>
                                                                <button className="btn-primary">{t("insertCommissionOpinion")}</button>
                                                            </Link>
                                                        ) : (
                                                            <div>
                                                                Status: {val.proposalStatus}
                                                            </div>
                                                        )}
                                                    </div>

                                                </div>

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

                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {agenda?.minutePublished ? (

                                <div className={"complement " + situationCorrentOpen} >
                                    <div className="display-flex-space-between">
                                        <p className="title">{t("minutes")}</p>

                                        <span onClick={() => setSituationCorrentOpen(!situationCorrentOpen)} className="material-symbols-outlined arrow-expend">
                                            expand_more
                                        </span>
                                    </div>

                                    <table>
                                        <tbody>
                                            <tr className="h50px">
                                                <td className="display-flex-space-between pl20">
                                                    {agenda.minutePublished.minuteName}

                                                    <Link to={"/minute/view/" + agenda.minutePublished.minuteCode}>
                                                        <div className="btn-secondary btn-unique">
                                                            <span className="material-symbols-outlined">
                                                                open_in_new
                                                            </span>
                                                        </div>
                                                    </Link>
                                                </td>


                                            </tr>

                                            <tr className="h50px">
                                                <td className="display-flex-space-between pl20">
                                                    {agenda.minuteNotPublished.minuteName}

                                                    <Link to={"/minute/view/" + agenda.minuteNotPublished.minuteCode}>
                                                        <div className="btn-secondary btn-unique">
                                                            <span className="material-symbols-outlined">
                                                                open_in_new
                                                            </span>
                                                        </div>
                                                    </Link>
                                                </td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </div>

                            ) : (null)
                            }

                        </div>



                        {pendingMinute < proposalSpecific.length && minute.length === 0 ? (
                            <div className="display-flex-end">
                                <Link to={"/minutes/create/" + demandCode}>
                                    <button className="btn-primary">{t("finish")}</button>
                                </Link>
                            </div>
                        ) : (null)
                        }

                        < Footer />
                    </div>
                </div>
            ) : url === "minute" ? (
                <div>

                    <div className="container">

                        <div className="background-title">

                            <Title nav={t("minute")} title="viewMinute" />

                        </div>

                        <div className="box">

                            {minute ? (

                                <div className="display-solicitation-demand">
                                    <p className="title">{minute.minuteName}</p>
                                </div>
                            ) : (null)
                            }

                        </div>

                    </div>

                </div>

            ) : null
            }

            {url !== "agenda" ? (<Footer />) : null}

            <ToastContainer position="bottom-right" newestOnTop />

        </div >
    );
}