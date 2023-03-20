import { useEffect, useState, useContext } from "react";
import "./style.css"
import Header from "../../../Fixed/Header"
import Nav from "../../../Fixed/Nav"
import Title from "../../../Fixed/Search/Title";
import ButtonActionAnalyst from "./ButtonActionAnalyst";
import ServicesDemand from "../../../../services/demandService";
import ServicesProposal from "../../../../services/proposalService";
import ServicesNotification from "../../../../services/notificationService";
import ServicesAgenda from "../../../../services/agendaService";
import ServicesExpense from "../../../../services/expenseService";
import Footer from "../../../Fixed/Footer";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import PDF from "./PDF";
import HtmlReactParser from 'html-react-parser';
import UserContext from "../../../../context/userContext";
import Tooltip from '@mui/material/Tooltip';


export default function ViewDemand() {

    const { t } = useTranslation();
    const navigate = useNavigate();

    const worker: any = useContext(UserContext).worker; // Buscar dados do usuário
    const office = worker.office; // Buscar tipo de usuário
    const workerName = worker.name; // Buscar nome do usuário
    const workerId = worker.id; // Buscar código do usuário
    const url = window.location.href.split("/")[3]; // Buscar tipo da demanda
    const demandCode = parseInt(window.location.href.split("/")[5]); // Buscar código da demanda


    // Botões superiores
    // 0 - Sem botões  
    // 1 - Gerar PDF e Editar (Solicitante) 
    // 2 - Reprovar ou Classificar (Analista)
    // 3 - Reprovar ou Aprovar (Gerente de Negócios)
    // 4 - Complementar (Analista)
    // 5 - Gerar Proposta (Analista)
    const [actionsDemand, setActionsDemand] = useState(0);

    // Situação da Demanda
    // 0 - Demanda criada
    // 1 - Demanda Classificada
    // 2 - Demanda Complementada
    const [stepDemand, setStepDemand] = useState(0);
    const [editDemand, setEditDemand] = useState(true); // Habilitar ou desabilitar edição da demanda
    const [centerCost, setCenterCost] = useState([]); // Dados do centro de custo
    const [classification, setClassification]: any = useState({}); // Dados da classificação
    const [comission, setComission] = useState([]); // Dados da comissão

    // Dados da demanda
    const [demand, setDemand]: any = useState({
        requesterRegistration: {
            workerCode: "",
            workerName: "",
        },
        demandStatus: "",
        demandType: "",
        demandDescription: "",
        demandDate: "",
        classification: {
            classificationCode: "",
            classificationName: "",
        },
        realBenefit: {
            realBenefitCode: "",
            realCurrency: 0,
            realMonthlyValue: 0
        },
        potentialBenefit: {
            potencialBenefitCode: "",
            potentialCurrency: 0,
            potentialMonthlyValue: 0
        },
        qualitativeBenefit: {
            qualitativeBenefitCode: "",
            qualitativeBenefitDescription: ""
        },
        demandAttachment: {
            demandAttachmentCode: "",
            dice: "",
            type: "",
            name: ""
        }
    });

    // Dados da proposta
    const [proposal, setProposal]: any = useState({
        responsibleAnalyst: {
            workerCode: "",
            workerName: "",
        }
    });

    // Dados da proposta específica
    const [proposalSpecific, setProposalSpecific]: any = useState([{
        proposalName: "",
        proposalCode: "",
        proposalStatus: "",
        proposalDate: "",
        proposalDescription: "",
        demand: {
            demandCode: "",
            demandDescription: "",
            demandObjective: ""
        }
    }]);


    // Chama função ao entrar na página
    useEffect(() => {
        // Buscar dados da demanda
        if (url === "demand") {
            getDemand();
        } else if (url === "proposal") {
            getProposal();
            localStorage.removeItem('proposalScope');
            localStorage.removeItem('demand');
            localStorage.removeItem('proposalScope');
            localStorage.removeItem('classification')
        } else if (url === "agenda") {
            getProposalSpecific();
        }

        // Verificações para notificações
        if (localStorage.getItem("route") === "classification") {
            notify();
            localStorage.removeItem("route");
        } else if (localStorage.getItem("route") === "complement") {
            notifyComplement();
            localStorage.removeItem("route");
        } else if (localStorage.getItem("route") === "reprove") {
            notifyReproved();
            localStorage.removeItem("route");
        } else if (localStorage.getItem("route") === "edit") {
            notifyEdit();
            localStorage.removeItem("route");
        }

    }, [url, demand.demandStatus]);

    function getDemand() {
        ServicesDemand.findById(demandCode).then((response: any) => {
            setDemand(response)

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
            if (response.classification !== "") {
                setClassification(response.classification)
            }


            if (response?.demandStatus === "Backlog") {
                setStepDemand(0)
            } else if (response?.demandStatus === "BacklogRanked") {
                setStepDemand(1)
            } else if (response?.demandStatus === "BacklogRankApproved") {
                setStepDemand(1)
            } else if (response?.demandStatus === "BacklogComplement") {
                setStepDemand(2)
            } else {
                setStepDemand(0)
            }

            setCenterCost(response.costCenter)
        })
    }

    const [proposalExpense, setProposalExpense]: any = useState([]);


    // Buscar proposta
    function getProposal() {
        ServicesProposal.findById(demandCode).then((response: any) => {
            setProposal(response)
            setDemand(response.demand); // Seta a demanda da proposta
            setStepDemand(2) // Seta o passo da demanda
            setClassification(response.demand.classification) // Seta a classificação da demanda
            setCenterCost(response.demand.costCenter) // Seta o centro de custo da demanda


            ServicesExpense.findAll().then((response: any) => {
                let expense: any = [];

                for (let i = 0; i < response.length; i++) {
                    if (response[i].proposal.proposalCode === demandCode) {
                        expense.push(response[i])

                    }
                }

                if (expense.length !== 0) {
                    setProposalExpense(expense)
                }

            })
        })
    }

    // Buscar proposta específica
    function getProposalSpecific() {

        ServicesAgenda.findById(demandCode).then((response: any) => {
            let proposals: any = [];
            setComission(response[0].commission)

            for (let i = 0; i < response[0].proposals.length; i++) {
                proposals.push(response[0].proposals[i])
            }
            setProposalSpecific(proposals)
        })


    }


    // Função para criar tabela (tr)
    const tr = (dataOne: any, dataTwo: any, index: any) => {
        return (
            <tr key="index">
                <td>{t(dataOne)}</td>
                <td>{t(dataTwo)}</td>
            </tr>
        )
    }

    // Aprovar demanda (Gerente de Negócios)
    function approveDemand() {
        ServicesDemand.updateStatus(demandCode, "BacklogRankApproved").then((response: any) => {

            // Notificação para o solicitante
            ServicesNotification.save("Um gerente de Negócio aprovou a sua demanda de código  " + demand.demandCode, demand.requesterRegistration.workerCode, "done", "demand");

            notifyApprove(); // Notificação para o gerente de negócios
            getDemand();
            setActionsDemand(0);
        }).catch((error: any) => {
            notifyError();
        })
    }

    // Devolver demanda (Analista)
    function giveBack() {

        ServicesDemand.updateStatus(demandCode, "BacklogEdit").then((response: any) => {
            // Notificação para o solicitante
            ServicesNotification.save("Um analista devolveu a sua demanda de código  " + demand.demandCode, demand.requesterRegistration.workerCode, "info", "demand");
            notifyGiveBack(); // Notificação para o analista
            getDemand();
        }).catch((error: any) => {
            notifyError();
        })
    }

    // Abrir modal de PDF
    const [pdf, setPdf] = useState(false);
    const generatePDF = () => {
        setPdf(true);
    }

    const attatchmentType = () => {
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

    const [situationCorrentOpen, setSituationCorrentOpen] = useState(false);
    const [benefitRealOpen, setBenefitRealOpen] = useState(false);
    const [benefitPotentialOpen, setBenefitPotentialOpen] = useState(false);
    const [benefitQualitativeOpen, setBenefitQualitativeOpen] = useState(false);
    const [costCenterOpen, setCostCenterOpen] = useState(false);
    const [classificationOpen, setClassificationOpen] = useState(false);
    const [complementOpen, setComplementOpen] = useState(false);
    const [expenseOpen, setExpenseOpen] = useState(false);
    const [proposalScopeOpen, setProposalScopeOpen] = useState(false);

    return (

        <div className="view-demand">

            {pdf ? <PDF requester={workerName} demandTitle={demand.demandTitle} demandCode={demand.demandCode} /> : null}



            { /* Verifica se é uma demanda ou uma proposta */  url === "demand" || url === "proposal" ? (
                <div>

                    <Header />

                    <Nav />

                    <div className="container">

                        <div className="background-title">

                            { /* Verifica se é uma demanda ou uma proposta */  url === "demand" ? (
                                <Title nav={t("demandViewDemand")} title="viewDemand" />
                            ) : (
                                <Title nav={t("proposalViewProposal")} title="viewProposal" />

                            )}


                            {  /* Botões superiores 1 - Download e Edit */  demand.requesterRegistration.workerCode === workerId ? (
                                <div className="display-flex">
                                    <button className="btn-primary" onClick={generatePDF}>
                                        <span className="material-symbols-outlined">
                                            download
                                        </span>
                                        <span>{t("generatePDF")}</span>
                                    </button>

                                    {demand.demandStatus === "BacklogEdit" &&
                                            <button onClick={()=> {navigate("/demand/edit/" + demandCode)}} className="btn-primary btn-download btn-mini">
                                                <span className="material-symbols-outlined">
                                                    edit
                                                </span>
                                            </button>
                                    }
                                </div>
                            ) :/* Botões superiores 2 - Reprovar e Classificar */  (actionsDemand === 2) ? (
                                <div className="display-flex">

                                    <Link to={"/demand/disapprove/" + demandCode}>
                                        <button className="btn-secondary">
                                            <span>{t("fail")}</span>
                                        </button>
                                    </Link>

                                    <button onClick={() => giveBack()} className="btn-secondary">
                                        <span>{t("giveback")}</span>
                                    </button>


                                    <Link to={"/demand/rank/" + demandCode}>
                                        <button className="btn-primary">
                                            <span>{t("toRank")}</span>
                                        </button>
                                    </Link>


                                    <ButtonActionAnalyst />
                                </div>

                            ) : /* Botões superiores 3 - Reprovar e Aprovar */ (actionsDemand === 3) ? (
                                <div className="display-flex">

                                    <Link to={"/demand/disapprove/" + demandCode}>
                                        <button className="btn-secondary">
                                            <span>{t("fail")}</span>
                                        </button>
                                    </Link>

                                    <button onClick={() => { approveDemand() }} className="btn-primary">
                                        <span>{t("approve")}</span>
                                    </button>


                                    <ButtonActionAnalyst />
                                </div>

                            ) : /* Botões superiores 4 - Complementar*/ (actionsDemand === 4) ? (
                                <div className="display-flex">
                                    <Link to={"/demand/complement/" + demandCode} >
                                        <button className="btn-primary">
                                            <span>{t("complementary")}</span>
                                        </button>
                                    </Link>

                                    <ButtonActionAnalyst />
                                </div>
                            ) : /* Botões superiores 5 - Gerar Proposta */ (actionsDemand === 5) ? (
                                <div className="display-flex">
                                    <Link to={"/proposal/demand/" + demandCode} >
                                        <button className="btn-primary">
                                            <span>{t("generateProposal")}</span>
                                        </button>
                                    </Link>

                                    <ButtonActionAnalyst />
                                </div>
                            ) : (
                                null
                            )}

                        </div>

                        <div className="box" id="box">
                            <div>
                                <div className="display-flex-space-between display-solicitation-demand">
                                    <p className="title">{demand.demandTitle}</p>
                                    <div className="code">{demand.demandCode}</div>
                                </div>

                                <div className={"situation-current " + situationCorrentOpen}>


                                    <div className="display-flex">
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
                                        <div className="text-information" >{demand.currentProblem}</div>

                                    </div>

                                    <div className="display-grid">
                                        <p className="title objective">{t("objective")}:</p>
                                        <div className="text-information">{demand.demandObjective}</div>
                                    </div>
                                </div>

                                {
                                    (url === "proposal") ? (
                                        <div className={"proposalScope " + proposalScopeOpen} >
                                            <div className="display-flex-space-between">

                                                <p className="title">{t("proposalScope")}</p>
                                                <span onClick={() => setProposalScopeOpen(!proposalScopeOpen)} className="material-symbols-outlined arrow-expend">
                                                    expand_more
                                                </span>
                                            </div>


                                            {proposal.descriptiveProposal ? (
                                                <div className="descriptiveProposal">
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

                                    <div className="display-flex-space-between ">
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


                                    <div className="description">
                                        <div className="display-flex-start">
                                            <span className="desc">Descrição:</span>
                                            <div className="text-information">{demand.realBenefit.realBenefitDescription}</div>

                                        </div>
                                    </div>
                                </div>


                                <div className={"potential-benefit " + benefitPotentialOpen}>
                                    <div className="display-flex-space-between">
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


                                    <div className="description">
                                        <div className="display-flex-start">

                                            <span className="desc">Descrição:</span>

                                            <div className="text-information">{demand.potentialBenefit.potentialBenefitDescription}</div>

                                        </div>

                                    </div>
                                </div>

                                <div className={"qualitative-benefit " + benefitQualitativeOpen}>

                                    <div className="display-flex-space-between">
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


                                    <div className="description">
                                        <div className="display-flex-start">

                                            <span className="desc">Descrição:</span>
                                            <div className="text-information">{demand.qualitativeBenefit.qualitativeBenefitDescription}</div>


                                        </div>
                                    </div>
                                </div>

                                <div className={"cost-center " + costCenterOpen}>
                                    <div className="display-flex-space-between">
                                        <p className="title">{t("costCenter")}</p>

                                        <span onClick={() => setCostCenterOpen(!costCenterOpen)} className="material-symbols-outlined arrow-expend">
                                            expand_more
                                        </span>
                                    </div>

                                    <table>
                                        <tbody>
                                            {tr("costCenter", "nameCostCenter", "index")}
                                            {
                                                centerCost.map((item: any, index: any) => {
                                                    return (
                                                        tr(item.costCenterCode, item.costCenter, index)
                                                    )
                                                }
                                                )
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>




                            {(stepDemand === 1 || stepDemand === 2) ? (

                                (classification) ? (
                                    < div className={"classification " + classificationOpen} >
                                        <div className="display-flex-space-between">

                                            <p className="title">{t("classification")}</p>

                                            <span onClick={() => setClassificationOpen(!classificationOpen)} className="material-symbols-outlined arrow-expend">
                                                expand_more
                                            </span>
                                        </div>


                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td>{t("size")}</td>
                                                    <td>{t("requesterBU")}</td>
                                                    <td>{t("buBenefited")}</td>
                                                    <td>{t("responsibleItSession")}</td>
                                                </tr>

                                                <tr>
                                                    <Tooltip title={classification.classificationSize} arrow>
                                                        <td>{classification.classificationSize}</td>
                                                    </Tooltip>

                                                    <Tooltip title={classification.requesterBu.bu} arrow>
                                                        <td>{classification.requesterBu.bu}</td>
                                                    </Tooltip>

                                                    <Tooltip title={classification.beneficiaryBu.map((bu: any) => bu.bu)} arrow>
                                                        <td>
                                                            {classification.beneficiaryBu.map((bu: any) => {
                                                                return (
                                                                    <div>{bu.bu}</div>
                                                                )
                                                            })

                                                            }
                                                        </td>
                                                    </Tooltip>

                                                    <Tooltip title={classification.itSection} arrow>
                                                        <td>{classification.itSection}</td>
                                                    </Tooltip>

                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div></div>
                                )
                            ) : (
                                <div></div>
                            )
                            }



                            {(stepDemand === 2) ? (

                                <div className={"complement " + complementOpen} >
                                    <div className="display-flex-space-between">

                                        <p className="title">{t("complements")}</p>
                                        <span onClick={() => setComplementOpen(!complementOpen)} className="material-symbols-outlined arrow-expend">
                                            expand_more
                                        </span>
                                    </div>

                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>{t("deadline")}</td>
                                                <td>{t("ppmCode")}</td>
                                                <td>{t("linkEpicJira")}</td>

                                            </tr>



                                            <tr>
                                                <td>{classification.deadline}</td>
                                                <td>{classification.ppmCode}</td>
                                                <td><a target="_blank" href={"http://" + classification.epicJiraLink}>{classification.epicJiraLink}</a></td>

                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="null"></div>
                            )}




                            {proposalExpense.map((proposalExpense: any, index: any) => {
                                return (
                                    <div key={index} className={"complement " + expenseOpen} >
                                        <div className="display-flex-space-between">

                                            <p className="title">{t("expenseInformation")}</p>
                                            <span onClick={() => setExpenseOpen(!expenseOpen)} className="material-symbols-outlined arrow-expend">
                                                expand_more
                                            </span>
                                        </div>

                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td>{t("expenseProfile")}</td>
                                                    <td>{t("expenseType")}</td>
                                                    <td>{t("hourValue")}</td>
                                                    <td>{t("expenseTotalValue")}</td>
                                                </tr>



                                                <tr>
                                                    <td>{proposalExpense.expenseProfile}</td>
                                                    <td>{proposalExpense.expenseType}</td>
                                                    <td>{proposalExpense.hourValue}</td>
                                                    <td>{proposalExpense.totalValue}</td>

                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                )
                            })}


                            {demand.demandAttachment ? (
                                <div className="attachments">

                                    <p className="title">{t("attachments")}</p>

                                    <a onClick={() => donwloadAttachment(demand.demandAttachment.dice, demand.demandAttachment.type, demand.demandAttachment.name)} download={"teste.jpg"} target="_blank">
                                        <div className="attachment">
                                            <div className="attachment-image">
                                                <img src={"/attachment/" + attatchmentType() + ".png"} alt="" />
                                            </div>
                                            <span>{demand.demandAttachment.name}</span>
                                        </div>
                                    </a>



                                </div>
                            ) : (
                                <div className="null"></div>
                            )}


                        </div>

                    </div>
                </div>
            ) : url === "agenda" ? (
                <div>
                    <Header />

                    <Nav />

                    <div className="container">


                        <div className="background-title">

                            <Title nav={t("agendaAgendaName")} title="viewAgenda" />
                        </div>

                        <div className="box">

                            <p>{t("proposal")}</p>



                            {
                                proposalSpecific.map((val: any) => (
                                    localStorage.setItem("agendaCode", window.location.pathname.split("/")[3]),
                                    <Link key={val.proposalCode} to={"/proposal/view/" + val.proposalCode}>
                                        <div className="proposal-view">

                                            <p>{val.proposalName}</p>
                                            <span>
                                                {val.demand.demandObjective}
                                            </span>

                                            <div className="proposal-view-buttons">
                                                <Link to={"/proposal/comission-opinion/" + val.proposalCode}>
                                                    <button className="btn-primary">{t("insertCommissionOpinion")}</button>
                                                </Link>
                                            </div>
                                        </div>
                                    </Link>

                                ))
                            }


                            <div className="complement">

                                <p className="title">{t("comission")}</p>

                                <table>
                                    <tbody>
                                        {comission.map((val: any, index: any) => (
                                            <tr key={index}>
                                                <td className="display-flex-start pl20">
                                                    {val.workerName}
                                                </td>
                                            </tr>

                                        ))}
                                    </tbody>
                                </table>
                            </div>


                        </div>

                        <div className="display-flex-end">
                            <Link to="/minutes/create">
                                <button className="btn-primary">{t("finish")}</button>
                            </Link>
                        </div>

                        <Footer />


                    </div>
                </div>
            ) : (
                null
            )
            }

            {
                url !== "agenda" ? (
                    <Footer />)
                    : null
            }


            <ToastContainer position="bottom-right" newestOnTop />

        </div >
    );
}

// Função para notificar o usuário que a demanda foi editada
const notifyEdit = () => {
    toast.success('Demand editada!', {
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

// Função para notificar o usuário que a classificação foi cadastrada
const notify = () => {
    toast.success('Classificação cadastrada!', {
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

const notifyComplement = () => {
    toast.success('Classificação complementada!', {
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

const notifyReproved = () => {
    toast.error('Demanda reprovada!', {
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

// Função para notificar o Gerente de Negócio que a demanda foi aprovada
const notifyApprove = () => {
    toast.success('Demanda aprovada!', {
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

function notifyGiveBack() {
    toast.success('Demanda devolvida!', {
        position: "bottom-right",
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
}

const notifyError = () => {
    toast.error('Algo deu errado!', {
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