import "./style.css"
import Header from "../../../Fixed/Header"
import Nav from "../../../Fixed/Nav"
import Title from "../../../Fixed/Search/Title";
import ButtonActionAnalyst from "./ButtonActionAnalyst";
import { Link } from "react-router-dom";
import { useState } from "react";
import Footer from "../../../Fixed/Footer";
import Spinner from "../../../Fixed/Load";

export default function ViewDemand() {

    const url = window.location.href.split("/")[3];
    const [actionsDemand, setActionsDemand] = useState(2);
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
                    <td>{dataOne}</td>
                    <td>{dataTwo}</td>
                </tr>
                <hr />
            </div>
        )
    }



    return (
        <div className="view-demand">

            {url === "demand" ? (
                <div>
                    <Header title="Visualizar Demanda" icon="visibility" />

                    <Nav />

                    <div className="container">

                        <div className="background-title">

                            <Title nav="Demandas > Visualizar Demanda" title="Visualizar Demanda" />

                            {(actionsDemand === 1) ? (

                                <button className="btn-primary">
                                    <span className="material-symbols-outlined">
                                        download
                                    </span>
                                    <span>Gerar PDF</span>
                                </button>
                            ) : (
                                <div className="display-flex">

                                    <Link to="/demand/disapprove">
                                        <button className="btn-secondary">
                                            <span>Reprovar</span>
                                        </button>
                                    </Link>

                                    <Link to="/demand/rank">
                                        <button className="btn-primary">
                                            <span>Classificar</span>
                                        </button>
                                    </Link>


                                    <ButtonActionAnalyst />
                                </div>
                            )}

                        </div>

                        <div className="box">


                            {
                                demands.map((val, index) => {
                                    return (

                                        <div>
                                            <div className="situation-current">
                                                <p>Solicitante</p>
                                                <span>{val.requester}</span>
                                            </div>

                                            <div className="situation-current">
                                                <p className="title">Situação Atual</p>
                                                <span>{val.currentSituation}</span>
                                                <p className="title">Proposta</p>
                                                <span>{val.proposal}</span>

                                            </div>

                                            <div className="cust-center">
                                                <p className="title">Centro de Custos</p>
                                                <hr />
                                                <table>
                                                    {tr("Centro de Custos", "Nome do Centro de Custos")}

                                                    {tr(val.costCenter.number, val.costCenter.name)}
                                                </table>
                                            </div>

                                            <div className="real-benefit">
                                                <p className="title">Beneficio Real</p>

                                                <hr />

                                                <div className="infos">

                                                    <div>
                                                        <span>Valor Mensal: </span><span>{val.realBenefit.monthlyValue}</span>
                                                    </div>

                                                </div>

                                                <hr />

                                                <div className="description">
                                                    <span className="desc">Descrição</span><span>{val.realBenefit.description}</span>
                                                </div>
                                            </div>


                                            <div className="potential-benefit">
                                                <p className="title">Beneficio Potencial</p>

                                                <hr />

                                                <div className="infos">

                                                    <div>
                                                        <span>Valor Mensal: </span><span>{val.potentialBenefit.monthlyValue}</span>
                                                    </div>

                                                    <span>Obrigação Legal: {val.potentialBenefit.legalObligation}</span>

                                                </div>

                                                <hr />

                                                <div className="description">
                                                    <span className="desc">Descrição</span><span>{val.potentialBenefit.description}</span>
                                                </div>
                                            </div>

                                            <div className="qualitative-benefit">
                                                <p className="title">Beneficio Qualitativo</p>

                                                <hr />

                                                <div className="infos">

                                                    <div>
                                                        <span>Valor Mensal: </span><span>{val.qualitativeBenefit.monthlyValue}</span>

                                                    </div>

                                                    <div>
                                                        <span>Obrigação Legal: {val.qualitativeBenefit.legalObligation}</span>
                                                    </div>

                                                    <span>Requisitos de controles internos: {val.qualitativeBenefit.internalControlRequirements}</span>

                                                </div>

                                                <hr />

                                                <div className="description">
                                                    <span className="desc">Descrição</span><span>{val.qualitativeBenefit.description}</span>
                                                </div>
                                            </div>

                                            <div className="attachments">

                                                <p className="title">Anexos</p>

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

                                    <p>Classificação</p>


                                    <table>
                                        <hr />
                                        <tr>
                                            <td>Tamanho</td>
                                            <td>BU Solicitante</td>
                                            <td>BU Beneficiada</td>
                                            <td>Sessão do TI responsável</td>

                                        </tr>

                                        <hr />


                                        <tr>
                                            <td>Pequeno - 40 - 400 horas</td>
                                            <td>WEG II</td>
                                            <td>WEG Motores</td>
                                            <td>Centro WEG</td>

                                        </tr>

                                        <hr />


                                    </table>
                                </div>



                            ) : (
                                <div className="null"></div>
                            )}

                            {(stepDemand === 2) ? (

                                <div className="complement" >
                                    <p>Complementos</p>

                                    <table>
                                        <hr />
                                        <tr>
                                            <td>Prazo Execução</td>
                                            <td>Código PPM</td>
                                            <td>Link EPIC Jira</td>

                                        </tr>

                                        <hr />


                                        <tr>
                                            <td>4 meses</td>
                                            <td>98765432</td>
                                            <td><a target="_blank" href="https://ctw2022.atlassian.net/jira/software/projects/P2/boards/1/roadmap?shared=&atlOrigin=eyJpIjoiNmQ5YjMzOWUyNWNmNGNiZTgyMmI2MGNjMTRmNmZiYjEiLCJwIjoiaiJ9">Abrir JIRA</a></td>

                                        </tr>

                                        <hr />


                                    </table>

                                    {/* 
                            <table>
                                <hr />
                                <tr>
                                    <td>Tipo</td>
                                    <td>Perfil</td>
                                    <td>Período de execução</td>
                                    <td>Horas necessárias</td>
                                    <td>Valor da hora</td>
                                    <td>Centro de custos</td>
                                    <td>Valor total</td>

                                </tr>

                                <hr />


                                <tr>
                                    <td>Externa</td>
                                    <td>WEG II</td>
                                    <td>WEG Motores</td>
                                    <td>WEG</td>
                                    <td>WEG</td>
                                    <td>WEG</td>
                                    <td>WEG</td>


                                </tr>

                                <hr />


                            </table> */}

                                </div>


                            ) : (
                                <div className="null"></div>
                            )}
                        </div>
                    </div>
                </div>
            ) : url === "proposal" ? (
                <div>
                    <Header title="Visualizar Proposta" icon="visibility" />

                    <Nav />

                    <div className="container">


                        <div className="background-title">

                            <Title nav="Propostas > Visualizar Proposta" title="Visualizar Proposta" />
                        </div>

                        <div className="box">
                            {
                                demands.map((val, index) => {
                                    return (

                                        <div>
                                            <div className="situation-current">
                                                <p>Solicitante</p>
                                                <span>{val.requester}</span>
                                            </div>

                                            <div className="situation-current">
                                                <p className="title">Situação Atual</p>
                                                <span>{val.currentSituation}</span>
                                                <p className="title">Proposta</p>
                                                <span>{val.proposal}</span>

                                            </div>

                                            <div className="cust-center">
                                                <p className="title">Centro de Custos</p>
                                                <hr />
                                                <table>
                                                    {tr("Centro de Custos", "Nome do Centro de Custos")}

                                                    {tr(val.costCenter.number, val.costCenter.name)}
                                                </table>
                                            </div>

                                            <div className="real-benefit">
                                                <p className="title">Beneficio Real</p>

                                                <hr />

                                                <div className="infos">

                                                    <div>
                                                        <span>Valor Mensal: </span><span>{val.realBenefit.monthlyValue}</span>
                                                    </div>

                                                </div>

                                                <hr />

                                                <div className="description">
                                                    <span className="desc">Descrição</span><span>{val.realBenefit.description}</span>
                                                </div>
                                            </div>


                                            <div className="potential-benefit">
                                                <p className="title">Beneficio Potencial</p>

                                                <hr />

                                                <div className="infos">

                                                    <div>
                                                        <span>Valor Mensal: </span><span>{val.potentialBenefit.monthlyValue}</span>
                                                    </div>

                                                    <span>Obrigação Legal: {val.potentialBenefit.legalObligation}</span>

                                                </div>

                                                <hr />

                                                <div className="description">
                                                    <span className="desc">Descrição</span><span>{val.potentialBenefit.description}</span>
                                                </div>
                                            </div>

                                            <div className="qualitative-benefit">
                                                <p className="title">Beneficio Qualitativo</p>

                                                <hr />

                                                <div className="infos">

                                                    <div>
                                                        <span>Valor Mensal: </span><span>{val.qualitativeBenefit.monthlyValue}</span>

                                                    </div>

                                                    <div>
                                                        <span>Obrigação Legal: {val.qualitativeBenefit.legalObligation}</span>
                                                    </div>

                                                    <span>Requisitos de controles internos: {val.qualitativeBenefit.internalControlRequirements}</span>

                                                </div>

                                                <hr />

                                                <div className="description">
                                                    <span className="desc">Descrição</span><span>{val.qualitativeBenefit.description}</span>
                                                </div>
                                            </div>

                                            <div className="attachments">

                                                <p className="title">Anexos</p>

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
                        </div>

                    </div>
                </div>
            ) : url === "agenda" ? (
                <div>
                    <Header title="Visualizar Pauta" icon="visibility" />

                    <Nav />

                    <div className="container">


                        <div className="background-title">

                            <Title nav="Pautas > Visualizar Pauta" title="Visualizar Pauta" />
                        </div>

                        <div className="box">

                            <p>Propostas</p>

                            <div className="proposal-view">

                                <p>Nome da Proposta</p>

                                <span>
                                    Nunc maximus purus sit amet est lacinia condimentum. Praesent sodales leo a finibus semper. Nunc luctus libero fermentum varius imperdiet. Aliquam tellus leo, volutpat ac scelerisque eget, gravida in urna. Curabitur ac urna bibendum, faucibus eros quis, auctor nibh. Etiam auctor rhoncus velit. Nulla finibus fringilla magna, eu tempus nisl molestie sed. Vivamus efficitur dui at malesuada lobortis.
                                </span>

                                <div className="proposal-view-buttons">
                                    <button className="btn-primary">Inserir parecer comissão</button>
                                </div>
                            </div>


                            <div className="proposal-view">

                                <p>Nome da Proposta</p>

                                <span>
                                    Nunc maximus purus sit amet est lacinia condimentum. Praesent sodales leo a finibus semper. Nunc luctus libero fermentum varius imperdiet. Aliquam tellus leo, volutpat ac scelerisque eget, gravida in urna. Curabitur ac urna bibendum, faucibus eros quis, auctor nibh. Etiam auctor rhoncus velit. Nulla finibus fringilla magna, eu tempus nisl molestie sed. Vivamus efficitur dui at malesuada lobortis.
                                </span>

                                <div className="proposal-view-buttons">
                                    <button className="btn-primary">Inserir parecer comissão</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            ) : url === "minute" ? (
                <div>
                    <Header title="Visualizar Ata" icon="visibility" />

                    <Nav />

                    <div className="container">


                        <div className="background-title">

                            <Title nav="Atas > Visualizar Ata" title="Visualizar Ata" />
                        </div>

                        <div className="box"></div>

                    </div>
                </div>
            ) : (
                <div />
            )}


            <Footer />


        </div>



    );

}