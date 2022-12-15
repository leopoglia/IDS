import "./style.css"
import Header from "../../../Fixed/Header"
import Nav from "../../../Fixed/Nav"
import Title from "../../../Fixed/Search/Title";
import ButtonActionAnalyst from "./ButtonActionAnalyst";

import Footer from "../../../Fixed/Footer";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";


export default function ViewDemand() {

    const { t } = useTranslation();

    const url = window.location.href.split("/")[3];
    const [actionsDemand, setActionsDemand] = useState(1);
    const [stepDemand, setStepDemand] = useState(2);

    const [demands] = useState([
        {
            name: "Solicitação 001", requester: "Leonardo Heitor Poglia", date: "27/04/2022", situation: "Backlog", currentSituation: "Situação a ser Resolvida", proposal: "Proposta",
            costCenter: { number: "24342", name: "Nome do Centro de Custos" }, realBenefit: { monthlyValue: 500, description: "Descrição Beneficio Real" },
            potentialBenefit: { monthlyValue: 500, description: "Descrição Beneficio Potencial", legalObligation: "Sim" }, qualitativeBenefit: { monthlyValue: 500, description: "Descrição Beneficio Qualitativo", legalObligation: "Sim", internalControlRequirements: true },
            attachments: [{ name: "Anexo 1", link: "https://www.google.com.br" }], classification: { size: "Pequeno - 40 - 400 horas", buApplicant: "WEG II", buBeneficiary: "WEG Motores", responsibleITSession: "Centro WEG" },
            complements: [{ executionDeadline: "4 meses", ppm: "98765432", epicJira: "https://ctw2022.atlassian.net/jira/software/projects/P2/boards/1/roadmap" }],
        },
    ]);

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

    return (
        <div className="view-demand">

            {url === "demand" ? (
                <div>
                    <Header title="viewDemand" icon="visibility" />

                    <Nav />

                    <div className="container">

                        <div className="background-title">

                            <Title nav={t("demandViewDemand")} title="viewDemand" />

                            {(actionsDemand === 1) ? (
                                <div className="display-flex">
                                    <button className="btn-primary">
                                        <span className="material-symbols-outlined">
                                            download
                                        </span>
                                        <span>{t("generatePDF")}</span>
                                    </button>

                                    <button className="btn-primary btn-download btn-mini">
                                        <span className="material-symbols-outlined">
                                            edit
                                        </span>
                                    </button>
                                </div>
                            ) : (actionsDemand === 2) ? (
                                <div className="display-flex">

                                    <Link to="/demand/disapprove">
                                        <button className="btn-secondary">
                                            <span>{t("fail")}</span>
                                        </button>
                                    </Link>

                                    <Link to="/demand/rank">
                                        <button className="btn-primary">
                                            <span>{t("toRank")}</span>
                                        </button>
                                    </Link>


                                    <ButtonActionAnalyst />
                                </div>

                            ) : (actionsDemand === 3) ? (
                                <div className="display-flex">
                                    <Link to="/demand/complement">
                                        <button className="btn-primary">
                                            <span>Complementar</span>
                                        </button>
                                    </Link>

                                    <ButtonActionAnalyst />
                                </div>
                            ) : (
                                <div className="display-flex">
                                    <Link to="/demand/complement">
                                        <button className="btn-primary">
                                            <span>Complementar</span>
                                        </button>
                                    </Link>
                                </div>
                            )
                            }

                        </div>

                        <div className="box">


                            {
                                demands.map((val, index) => {
                                    return (

                                        <div>
                                            <div className="situation-current">
                                                <p>{t("requester")}</p>
                                                <span>{val.requester}</span>
                                            </div>

                                            <div className="situation-current">
                                                <p className="title">{t("currentSituation")}</p>
                                                <span>{val.currentSituation}</span>
                                                <p className="title">{t("proposal")}</p>
                                                <span>{val.proposal}</span>

                                            </div>

                                            <div className="cust-center">
                                                <p className="title">{t("costCenter")}</p>
                                                <div className="hr" />
                                                <table>
                                                    {tr("costCenter", "nameCostCenter")}

                                                    {tr(val.costCenter.number, val.costCenter.name)}
                                                </table>
                                            </div>

                                            <div className="real-benefit">
                                                <p className="title">{t("benefitReal")}</p>

                                                <div className="hr" />

                                                <div className="infos">

                                                    <div>
                                                        <span>{t("monthlyValue")}: </span><span>{val.realBenefit.monthlyValue}</span>
                                                    </div>

                                                </div>

                                                <div className="hr" />

                                                <div className="description">
                                                    <span className="desc">Descrição</span><span>{val.realBenefit.description}</span>
                                                </div>
                                            </div>


                                            <div className="potential-benefit">
                                                <p className="title">{t("benefitPotential")}</p>

                                                <div className="hr" />

                                                <div className="infos">

                                                    <div>
                                                        <span>{t("monthlyValue")}: </span><span>{val.potentialBenefit.monthlyValue}</span>
                                                    </div>

                                                    <span>{t("legalObligation")}: {val.potentialBenefit.legalObligation}</span>

                                                </div>

                                                <div className="hr" />

                                                <div className="description">
                                                    <span className="desc">Descrição</span><span>{val.potentialBenefit.description}</span>
                                                </div>
                                            </div>

                                            <div className="qualitative-benefit">
                                                <p className="title">{t("benefitQualitative")}</p>

                                                <div className="hr" />

                                                <div className="infos">

                                                    <div>
                                                        <span>{t("monthlyValue")}: </span><span>{val.qualitativeBenefit.monthlyValue}</span>

                                                    </div>

                                                    <div>
                                                        <span>{t("legalObligation")}: {val.qualitativeBenefit.legalObligation}</span>
                                                    </div>

                                                    <span>{t("internalControlRequirements")}: {val.qualitativeBenefit.internalControlRequirements}</span>

                                                </div>

                                                <div className="hr" />

                                                <div className="description">
                                                    <span className="desc">Descrição</span><span>{val.qualitativeBenefit.description}</span>
                                                </div>
                                            </div>

                                            <div className="attachments">

                                                <p className="title">{t("attachments")}</p>

                                                <div className="attachment">
                                                    <div className="attachment-image">
                                                        <img src="/attachment/pdf.png" alt="" />
                                                    </div>
                                                    <span>attachments.pdf</span>
                                                </div>

                                            </div>
                                        </div>
                                    );
                                })
                            }

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
                                            <td>Pequeno - 40 - 400 horas</td>
                                            <td>WEG II</td>
                                            <td>WEG Motores</td>
                                            <td>Centro WEG</td>

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
                                            <td>4 meses</td>
                                            <td>98765432</td>
                                            <td><a target="_blank" href="https://ctw2022.atlassian.net/jira/software/projects/P2/boards/1/roadmap?shared=&atlOrigin=eyJpIjoiNmQ5YjMzOWUyNWNmNGNiZTgyMmI2MGNjMTRmNmZiYjEiLCJwIjoiaiJ9">Abrir JIRA</a></td>

                                        </tr>

                                        <div className="hr" />
                                    </table>
                                </div>
                            ) : (
                                <div className="null"></div>
                            )}
                        </div>
                    </div>
                </div>
            ) : url === "proposal" ? (
                <div>
                    <Header title="viewProposal" icon="visibility" />

                    <Nav />

                    <div className="container">


                        <div className="background-title">

                            <Title nav={t("proposalViewProposal")} title="viewProposal" />

                            <Link to="/">
                                <button className="btn-primary btn-download">
                                    <span className="material-symbols-outlined">
                                        download
                                    </span>
                                </button>
                            </Link>

                        </div>

                        <div className="box">
                            {
                                demands.map((val, index) => {
                                    return (

                                        <div>
                                            <div className="situation-current">
                                                <p>{t("requester")}</p>
                                                <span>{val.requester}</span>
                                            </div>

                                            <div className="situation-current">
                                                <p className="title">{t("currentSituation")}</p>
                                                <span>{val.currentSituation}</span>
                                                <p className="title">{t("proposal")}</p>
                                                <span>{val.proposal}</span>

                                            </div>

                                            <div className="cust-center">
                                                <p className="title">{t("costCenter")}</p>
                                                <div className="hr" />
                                                <table>
                                                    {tr("costCenter", "nameCostCenter")}

                                                    {tr(val.costCenter.number, val.costCenter.name)}
                                                </table>
                                            </div>

                                            <div className="real-benefit">
                                                <p className="title">{t("benefitReal")}</p>

                                                <div className="hr" />

                                                <div className="infos">

                                                    <div>
                                                        <span>{t("monthlyValue")}: </span><span>{val.realBenefit.monthlyValue}</span>
                                                    </div>

                                                </div>

                                                <div className="hr" />

                                                <div className="description">
                                                    <span className="desc">Descrição</span><span>{val.realBenefit.description}</span>
                                                </div>
                                            </div>


                                            <div className="potential-benefit">
                                                <p className="title">{t("benefitPotential")}</p>

                                                <div className="hr" />

                                                <div className="infos">

                                                    <div>
                                                        <span>{t("monthlyValue")}: </span><span>{val.potentialBenefit.monthlyValue}</span>
                                                    </div>

                                                    <span>{t("legalObligation")}: {val.potentialBenefit.legalObligation}</span>

                                                </div>

                                                <div className="hr" />

                                                <div className="description">
                                                    <span className="desc">Descrição</span><span>{val.potentialBenefit.description}</span>
                                                </div>
                                            </div>

                                            <div className="qualitative-benefit">
                                                <p className="title">{t("benefitQualitative")}</p>

                                                <div className="hr" />

                                                <div className="infos">

                                                    <div>
                                                        <span>{t("monthlyValue")}: </span><span>{val.qualitativeBenefit.monthlyValue}</span>

                                                    </div>

                                                    <div>
                                                        <span>{t("legalObligation")}: {val.qualitativeBenefit.legalObligation}</span>
                                                    </div>

                                                    <span>{t("internalControlRequirements")}: {val.qualitativeBenefit.internalControlRequirements}</span>

                                                </div>

                                                <div className="hr" />

                                                <div className="description">
                                                    <span className="desc">Descrição</span><span>{val.qualitativeBenefit.description}</span>
                                                </div>
                                            </div>

                                            <div className="attachments">

                                                <p className="title">{t("attachments")}</p>

                                                <div className="attachment">
                                                    <div className="attachment-image">
                                                        <img src="/attachment/pdf.png" alt="" />
                                                    </div>
                                                    <span>attachments.pdf</span>
                                                </div>

                                            </div>

                                            <div className="execution-cost">
                                                <p className="title">{t("projectExecutionCosts")}</p>
                                                <table>
                                                    <div className="hr" />
                                                    <tr>
                                                        <td>{t("type")}</td>
                                                        <td>{t("profile")}</td>
                                                        <td>{t("periodOfExecution")}</td>
                                                        <td>{t("necessityHours")}</td>
                                                        <td>{t("hoursValue")}</td>
                                                        <td>{t("costCenter")}</td>
                                                        <td>{t("totalValue")}</td>

                                                    </tr>

                                                    <div className="hr" />


                                                    <tr>
                                                        <td>Externa</td>
                                                        <td>WEG II</td>
                                                        <td>WEG Motores</td>
                                                        <td>WEG</td>
                                                        <td>WEG</td>
                                                        <td>WEG</td>
                                                        <td>WEG</td>


                                                    </tr>

                                                    <div className="hr" />


                                                </table>
                                            </div>
                                        </div>
                                    );
                                })
                            }
                        </div>

                    </div>
                </div>
            ) : url === "agenda" ? (
                <div>
                    <Header title="viewAgenda" icon="visibility" />

                    <Nav />

                    <div className="container">


                        <div className="background-title">

                            <Title nav="Pautas > Visualizar Pauta" title="viewAgenda" />
                        </div>

                        <div className="box">

                            <p>Propostas</p>


                            <div className="proposal-view">

                                <p>Nome da Proposta</p>

                                <span>
                                    Nunc maximus purus sit amet est lacinia condimentum. Praesent sodales leo a finibus semper. Nunc luctus libero fermentum varius imperdiet. Aliquam tellus leo, volutpat ac scelerisque eget, gravida in urna. Curabitur ac urna bibendum, faucibus eros quis, auctor nibh. Etiam auctor rhoncus velit. Nulla finibus fringilla magna, eu tempus nisl molestie sed. Vivamus efficitur dui at malesuada lobortis.
                                </span>

                                <div className="proposal-view-buttons">
                                    <Link to="/proposal/comission-opinion">
                                        <button className="btn-primary">Inserir parecer comissão</button>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="display-flex-end">
                            <Link to="/minutes/create">
                                <button className="btn-primary">Finalizar</button>
                            </Link>
                        </div>

                        <Footer />


                    </div>
                </div>
            ) : (
                null
            )}

            {url !== "agenda" ? (
                <Footer />)
                : null}
        </div>
    );
}