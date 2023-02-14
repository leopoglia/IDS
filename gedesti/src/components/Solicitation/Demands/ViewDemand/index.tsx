import "./style.css"
import Header from "../../../Fixed/Header"
import Nav from "../../../Fixed/Nav"
import Title from "../../../Fixed/Search/Title";
import ButtonActionAnalyst from "./ButtonActionAnalyst";
import ServicesDemand from "../../../../services/demandService";
import ServicesProposal from "../../../../services/proposalService";
import ServicesNotification from "../../../../services/notificationService";
import Footer from "../../../Fixed/Footer";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast, ToastContainer, TypeOptions } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import PDF from "./PDF";

export default function ViewDemand() {

    const { t } = useTranslation();

    const worker: any = localStorage.getItem("worker"); // Buscar dados do usuário
    const office = JSON.parse(worker).office; // Buscar tipo de usuário
    const workerName = JSON.parse(worker).name; // Buscar nome do usuário
    const workerId = JSON.parse(worker).id; // Buscar código do usuário
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
    const [inputDiv, setInputDiv] = useState("input-disabled"); // Habilitar ou desabilitar input

    const [boxDiv, setBoxDiv] = useState("box-demand"); // Habilitar ou desabilitar box

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

    // Chama função ao entrar na página
    useEffect(() => {
        // Buscar dados da demanda
        if (url === "demand") {
            getDemand();
        } else if (url === "proposal") {
            getProposal();
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
        }

    }, [office]);


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
            } else if (response?.demandStatus === "BacklogRank") {
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

    // Buscar proposta
    function getProposal() {
        ServicesProposal.findById(demandCode).then((response: any) => {
            setProposal(response)
            setDemand(response.demand); // Seta a demanda da proposta
            setStepDemand(2) // Seta o passo da demanda
            setClassification(response.demand.classification) // Seta a classificação da demanda
            setCenterCost(response.demand.costCenter) // Seta o centro de custo da demanda
            setBoxDiv("box-proposal") // Seta o box da proposta
        })
    }


    // Função para buscar centro de custos
    const costCenter = () => {
        return (
            centerCost.map((item: any) => {
                return (
                    tr(item.costCenterCode, item.costCenter)
                )
            }
            )
        )
    }

    // Função para criar tabela (tr)
    const tr = (dataOne: any, dataTwo: any) => {
        return (
            <div>
                <tr>
                    <td>{t(dataOne)}</td>
                    <td>{t(dataTwo)}</td>
                </tr>
                <div className="hr" />
            </div>
        )
    }

    // Aprovar demanda (Gerente de Negócios)
    function approveDemand() {
        ServicesDemand.updateStatus(demandCode, "BacklogRankApproved").then((response: any) => {

            // Notificação para o solicitante
            ServicesNotification.save("Um Gerente de Negócio aprovou a sua demanda de código  " + demand.demandCode, demand.requesterRegistration.workerCode, "done", "demand");

            notifyApprove(); // Notificação para o gerente de negócios
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

    function setBoxProposal() {
        if (url === "proposal") {
            if (boxDiv === "box-proposal") {
                setBoxDiv("box-demand")
            } else {
                setBoxDiv("box-proposal")
            }
        }

    }

    return (

        <div className="view-demand">

            {pdf ? <PDF requester={workerName} demandTitle={demand.demandTitle} demandCode={demand.demandCode} /> : null}



            { /* Verifica se é uma demanda ou uma proposta */  url === "demand" || url === "proposal" ? (
                <div>

                    <Header title="viewDemand" icon="visibility" />

                    <Nav />

                    <div className="container">

                        <div className="background-title">

                            { /* Verifica se é uma demanda ou uma proposta */  url === "demand" ? (
                                <Title nav={t("demandViewDemand")} title="viewDemand" />
                            ) : (
                                <Title nav={t("proposalViewProposal")} title="viewProposal" />

                            )}


                            {  /* Botões superiores 1 - Download e Edit */  (actionsDemand === 1) ? (
                                <div className="display-flex">
                                    <button className="btn-primary" onClick={generatePDF}>
                                        <span className="material-symbols-outlined">
                                            download
                                        </span>
                                        <span>{t("generatePDF")}</span>
                                    </button>

                                    <button onClick={() => { setEditDemand(!editDemand); if (inputDiv === "") { setInputDiv("input-disabled") } else { setInputDiv("") } }} className="btn-primary btn-download btn-mini">
                                        <span className="material-symbols-outlined">
                                            edit
                                        </span>
                                    </button>
                                </div>
                            ) :/* Botões superiores 2 - Reprovar e Classificar */  (actionsDemand === 2) ? (
                                <div className="display-flex">

                                    <Link to={"/demand/disapprove/" + demandCode}>
                                        <button className="btn-secondary">
                                            <span>{t("fail")}</span>
                                        </button>
                                    </Link>

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

                        <div onClick={() => { setBoxProposal() }} className={"box " + boxDiv} id="box">
                            <div>
                                <div className="situation-current">
                                    <div className="display-flex-space-between display-solicitation-demand">
                                        <p>{demand.demandTitle}</p>
                                        <div className="code">{demand.demandCode}</div>
                                    </div>


                                    <p>{t("requester")}</p>
                                    <input className={inputDiv} type="text" value={demand.requesterRegistration.workerName} disabled={editDemand} />

                                    {
                                        proposal.responsibleAnalyst.workerName !== "" ? (
                                            <div className="responsibleAnalyst">
                                                <p>{t("responsibleAnalyst")}</p>
                                                <input className={inputDiv} type="text" value={proposal.responsibleAnalyst.workerName} disabled={editDemand} />
                                            </div>
                                        ) : (
                                            null
                                        )
                                    }

                                </div>

                                <div className="situation-current">
                                    <p className="title">{t("currentSituation")}</p>
                                    <input className={inputDiv} type="text" value={demand.currentProblem} disabled={editDemand} />
                                    <p className="title">{t("objective")}</p>
                                    <input className={inputDiv} type="text" value={demand.demandObjective} disabled={editDemand} />
                                </div>



                                <div className="real-benefit">
                                    <p className="title">{t("benefitReal")}</p>

                                    <div className="infos">


                                        <div className="display-flex-center">
                                            <span className="bold-text">{t("monthlyValue")}: </span>
                                            {demand.realBenefit.realCurrency === "real" ? (
                                                <span>R$</span>
                                            ) : (demand.realBenefit.realCurrency === "dollar") ? (
                                                <span>$</span>
                                            ) : (
                                                <span>€</span>
                                            )}

                                            <input className={inputDiv} type="text" value={demand.realBenefit.realMonthlyValue.toLocaleString()} disabled={editDemand} />
                                        </div>

                                    </div>


                                    <div className="description">
                                        <div className="display-flex-center">
                                            <span className="desc">Descrição:</span>
                                            <input className={inputDiv} type="text" value={demand.realBenefit.realBenefitDescription} disabled={editDemand} />
                                        </div>
                                    </div>
                                </div>


                                <div className="potential-benefit">
                                    <p className="title">{t("benefitPotential")}</p>

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

                                            <input className={inputDiv} type="text" value={demand.potentialBenefit.potentialMonthlyValue.toLocaleString()} disabled={editDemand} />
                                        </div>
                                    </div>


                                    <div className="infos">
                                        <span>{t("legalObligation")}: {
                                            (demand.potentialBenefit.legalObrigation === true) ? (<span>Sim</span>) : (<span>Não</span>)}</span>
                                    </div>


                                    <div className="description">
                                        <div className="display-flex-center">

                                            <span className="desc">Descrição:</span>
                                            <input className={inputDiv} type="text" value={demand.potentialBenefit.potentialBenefitDescription} disabled={editDemand} />

                                        </div>

                                    </div>
                                </div>

                                <div className="qualitative-benefit">
                                    <p className="title">{t("benefitQualitative")}</p>

                                    <div className="infos">



                                        <div>
                                            <span>{t("legalObligation")}: {demand.qualitativeBenefit.frequencyOfUse}</span>
                                        </div>

                                    </div>


                                    <div className="description">
                                        <div className="display-flex-center">

                                            <span className="desc">Descrição:</span>
                                            <input className={inputDiv} type="text" value={demand.qualitativeBenefit.qualitativeBenefitDescription} disabled={editDemand} />

                                        </div>
                                    </div>
                                </div>

                                <div className="cost-center">
                                    <p className="title">{t("costCenter")}</p>
                                    <div className="hr" />
                                    <table>
                                        {tr("costCenter", "nameCostCenter")}

                                        {costCenter()}
                                    </table>
                                </div>
                            </div>




                            {(stepDemand === 1 || stepDemand === 2) ? (
                                <div className="classification" >

                                    <p>{t("classification")}</p>


                                    <table>
                                        <div className="hr" />
                                        <tr>
                                            <td>{t("size")}</td>
                                            <td>{t("requesterBU")}</td>
                                            <td>{t("buBenefited")}</td>
                                            <td>{t("responsibleItSession")}</td>
                                        </tr>

                                        <div className="hr" />


                                        <tr>
                                            <td>{classification.classificationSize}</td>
                                            <td>{classification.requesterBu.bu}</td>
                                            <td>{classification.beneficiaryBu.bu}</td>
                                            <td>{classification.itSection}</td>

                                        </tr>

                                        <div className="hr" />


                                    </table>
                                </div>



                            ) : (
                                <div className="null"></div>
                            )}

                            {(stepDemand === 2) ? (

                                <div className="complement" >
                                    <p>{t("complements")}</p>

                                    <table>
                                        <div className="hr" />
                                        <tr>
                                            <td>{t("deadline")}</td>
                                            <td>{t("ppmCode")}</td>
                                            <td>{t("linkEpicJira")}</td>

                                        </tr>

                                        <div className="hr" />


                                        <tr>
                                            <td>{classification.deadline}</td>
                                            <td>{classification.ppmCode}</td>
                                            <td><a target="_blank" href={"http://" + classification.epicJiraLink}>{classification.epicJiraLink}</a></td>

                                        </tr>

                                        <div className="hr" />
                                    </table>
                                </div>
                            ) : (
                                <div className="null"></div>
                            )}

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


                        </div>

                    </div>
                </div>
            ) : url === "agenda" ? (
                <div>
                    <Header title="viewAgenda" icon="visibility" />

                    <Nav />

                    <div className="container">


                        <div className="background-title">

                            <Title nav={t("agendaAgendaName")} title="viewAgenda" />
                        </div>

                        <div className="box">

                            <p>{t("proposal")}</p>

                            <Link to="/proposal/view">
                                <div className="proposal-view">

                                    <p>{t("proposalName")}</p>

                                    <span>
                                        Nunc maximus purus sit amet est lacinia condimentum. Praesent sodales leo a finibus semper. Nunc luctus libero fermentum varius imperdiet. Aliquam tellus leo, volutpat ac scelerisque eget, gravida in urna. Curabitur ac urna bibendum, faucibus eros quis, auctor nibh. Etiam auctor rhoncus velit. Nulla finibus fringilla magna, eu tempus nisl molestie sed. Vivamus efficitur dui at malesuada lobortis.
                                    </span>

                                    <div className="proposal-view-buttons">
                                        <Link to="/proposal/comission-opinion">
                                            <button className="btn-primary">{t("insertCommissionOpinion")}</button>
                                        </Link>
                                    </div>
                                </div>
                            </Link>
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


