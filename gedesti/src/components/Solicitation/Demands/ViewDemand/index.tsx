import "./style.css"
import Header from "../../../Fixed/Header"
import Nav from "../../../Fixed/Nav"
import Title from "../../../Fixed/Search/Title";
import ButtonActionAnalyst from "./ButtonActionAnalyst";
import Services from "../../../../services/demandService";
import Footer from "../../../Fixed/Footer";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";


export default function ViewDemand() {

    const { t } = useTranslation();

    const worker: any = localStorage.getItem("worker"); // Buscar dados do usuário
    const office = JSON.parse(worker).office; // Buscar tipo de usuário
    const url = window.location.href.split("/")[3]; // Buscar tipo da demanda

    const demandCode = parseInt(window.location.href.split("/")[5]); // Buscar código da demanda
    console.log(demandCode)

    // Botões superiores
    // 0 - Sem botões  
    // 1 - Gerar PDF e Editar (Solicitante) 
    // 2 - Reprovar ou Classificar (Analista)
    // 3 - Reprovar ou Aprovar (Gerente de Negócios)
    // 4 - Complementar (Analista)
    const [actionsDemand, setActionsDemand] = useState(2);

    // Situação da Demanda
    // 0 - Demanda criada
    // 1 - Demanda Classificada
    // 2 - Demanda Complementada
    const [stepDemand, setStepDemand] = useState(0);
    const [editDemand, setEditDemand] = useState(true);
    const [centerCost, setCenterCost] = useState([]);
    const [classification, setClassification]: any = useState({});
    const [inputDiv, setInputDiv] = useState("input-disabled");

    function getDemand() {
        Services.findById(demandCode).then((response: any) => {
            console.log(response)
            const demand: any = [response]
            setDemands(demand)

            if (response.classification === undefined) {
                console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBB")
                setStepDemand(0)
                setActionsDemand(1)
            } else {
                console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
                setStepDemand(1)
                setClassification(response.classification)
                setActionsDemand(3)
            }

            setCenterCost(demand[0].costCenter)
        })
    }

    useEffect(() => {
        getDemand();

        if (office === "bussines") {
            setActionsDemand(2);
        } else if (office === "analyst") {
            setActionsDemand(3);
        }
    }, [office]);

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

    const [demands, setDemands] = useState([
        {
            demandTitle: "", requesterRegistration: { workerName: "" }, demandDate: "", demandStatus: "", currentProblem: "", demandObjective: "",
            costCenter: { costCenterCode: "", costCenter: "" }, realBenefit: { realMonthlyValue: 0, realCurrency: "", realBenefitDescription: "" },
            potentialBenefit: { potentialMonthlyValue: 0, legalObrigation: false, potentialBenefitDescription: "" }, qualitativeBenefit: { realMonthlyValue: 0, interalControlsRequirements: false, frequencyOfUse: "", qualitativeBenefitDescription: "" },
            complements: [{ executionDeadline: "", ppm: "", epicJira: "" }]
        }]);

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

                                    <button onClick={() => { setEditDemand(!editDemand); if (inputDiv === "") { setInputDiv("input-disabled") } else { setInputDiv("") } }} className="btn-primary btn-download btn-mini">
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

                                    <Link to={"/demand/rank/" + demandCode}>
                                        <button className="btn-primary">
                                            <span>{t("toRank")}</span>
                                        </button>
                                    </Link>


                                    <ButtonActionAnalyst />
                                </div>

                            ) : (actionsDemand === 3) ? (
                                <div className="display-flex">

                                    <Link to="/demand/disapprove">
                                        <button className="btn-secondary">
                                            <span>{t("fail")}</span>
                                        </button>
                                    </Link>

                                    <Link to="/demand/rank">
                                        <button className="btn-primary">
                                            <span>{t("approve")}</span>
                                        </button>
                                    </Link>


                                    <ButtonActionAnalyst />
                                </div>

                            ) : (actionsDemand === 4) ? (
                                <div className="display-flex">
                                    <Link to="/demand/complement">
                                        <button className="btn-primary">
                                            <span>{t("complementary")}</span>
                                        </button>
                                    </Link>

                                    <ButtonActionAnalyst />
                                </div>
                            ) : null}


                        </div>

                        <div className="box">


                            {
                                demands.map((val, index) => {
                                    return (

                                        <div>
                                            <div className="situation-current">
                                                <div className="display-flex-space-between">
                                                    <p>{t("requester")}</p>
                                                    <div className="code">1000025500</div>
                                                </div>

                                                <input className={inputDiv} type="text" value={val.requesterRegistration.workerName} disabled={editDemand} />
                                            </div>

                                            <div className="situation-current">
                                                <p className="title">{t("currentSituation")}</p>
                                                <input className={inputDiv} type="text" value={val.currentProblem} disabled={editDemand} />
                                                <p className="title">{t("objective")}</p>
                                                <input className={inputDiv} type="text" value={val.demandObjective} disabled={editDemand} />
                                            </div>



                                            <div className="real-benefit">
                                                <p className="title">{t("benefitReal")}</p>

                                                <div className="hr" />

                                                <div className="infos">

                                                    <div>
                                                        <span>{t("monthlyValue")}: </span><span>{val.realBenefit.realMonthlyValue}</span>
                                                    </div>

                                                </div>

                                                <div className="hr" />

                                                <div className="description">
                                                    <span className="desc">Descrição</span><span>{val.realBenefit.realBenefitDescription}</span>
                                                </div>
                                            </div>


                                            <div className="potential-benefit">
                                                <p className="title">{t("benefitPotential")}</p>

                                                <div className="hr" />

                                                <div className="infos">

                                                    <div>
                                                        <span>{t("monthlyValue")}: </span><span>{val.potentialBenefit.potentialMonthlyValue}</span>
                                                    </div>

                                                    <span>{t("legalObligation")}: {
                                                        (val.potentialBenefit.legalObrigation === true) ? (<span>Sim</span>) : (<span>Não</span>)}</span>

                                                </div>

                                                <div className="hr" />

                                                <div className="description">
                                                    <span className="desc">Descrição</span><span>{val.potentialBenefit.potentialBenefitDescription}</span>
                                                </div>
                                            </div>

                                            <div className="qualitative-benefit">
                                                <p className="title">{t("benefitQualitative")}</p>

                                                <div className="hr" />

                                                <div className="infos">

                                                    <div>
                                                        <span>{t("monthlyValue")}: </span><span>{val.qualitativeBenefit.realMonthlyValue}</span>

                                                    </div>

                                                    <div>
                                                        <span>{t("legalObligation")}: {val.qualitativeBenefit.frequencyOfUse}</span>
                                                    </div>

                                                    <span>{t("internalControlRequirements")}: {val.qualitativeBenefit.interalControlsRequirements}</span>

                                                </div>

                                                <div className="hr" />

                                                <div className="description">
                                                    <span className="desc">Descrição</span><span>{val.qualitativeBenefit.qualitativeBenefitDescription}</span>
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
                                <button className="btn-primary">
                                    <span className="material-symbols-outlined">
                                        download
                                    </span>
                                    <span>{t("generatePDF")}</span>
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
                                                <input className={inputDiv} type="text" value={val.requesterRegistration.workerName} disabled={editDemand} />
                                            </div>

                                            <div className="responsible">
                                                <p>{t("responsibleForTheBusiness")}</p>
                                                <input className={inputDiv} type="text" value={val.requesterRegistration.workerName} disabled={editDemand} />
                                            </div>

                                            <div className="situation-current">
                                                <p className="title">{t("currentSituation")}</p>
                                                <input className={inputDiv} type="text" value={val.currentProblem} disabled={editDemand} />
                                                <p className="title">{t("objective")}</p>
                                                <input className={inputDiv} type="text" value={val.demandObjective} disabled={editDemand} />
                                            </div>

                                            <div className="cust-center">
                                                <p className="title">{t("costCenter")}</p>
                                                <div className="hr" />
                                                <table>
                                                    {tr("costCenter", "nameCostCenter")}

                                                    {tr(val.costCenter.costCenterCode, val.costCenter.costCenter)}
                                                </table>
                                            </div>

                                            <div className="real-benefit">
                                                <p className="title">{t("benefitReal")}</p>

                                                <div className="hr" />

                                                <div className="infos">

                                                    <div>
                                                        <span>{t("monthlyValue")}: </span><span>{val.realBenefit.realMonthlyValue}</span>
                                                    </div>

                                                </div>

                                                <div className="hr" />

                                                <div className="description">
                                                    <span className="desc">Descrição</span><span>{val.realBenefit.realBenefitDescription}</span>
                                                </div>
                                            </div>


                                            <div className="potential-benefit">
                                                <p className="title">{t("benefitPotential")}</p>

                                                <div className="hr" />

                                                <div className="infos">

                                                    <div>
                                                        <span>{t("monthlyValue")}: </span><span>{val.potentialBenefit.potentialMonthlyValue}</span>
                                                    </div>

                                                    <span>{t("legalObligation")}: {val.potentialBenefit.legalObrigation}</span>

                                                </div>

                                                <div className="hr" />

                                                <div className="description">
                                                    <span className="desc">Descrição</span><span>{val.potentialBenefit.potentialBenefitDescription}</span>
                                                </div>
                                            </div>

                                            <div className="qualitative-benefit">
                                                <p className="title">{t("benefitQualitative")}</p>

                                                <div className="hr" />

                                                <div className="infos">

                                                    <div>
                                                        <span>{t("monthlyValue")}: </span><span>{val.qualitativeBenefit.realMonthlyValue}</span>

                                                    </div>

                                                    <div>
                                                        <span>{t("legalObligation")}: {val.qualitativeBenefit.frequencyOfUse}</span>
                                                    </div>

                                                    <span>{t("internalControlRequirements")}: {val.qualitativeBenefit.interalControlsRequirements}</span>

                                                </div>

                                                <div className="hr" />

                                                <div className="description">
                                                    <span className="desc">Descrição</span><span>{val.qualitativeBenefit.qualitativeBenefitDescription}</span>
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
            )}

            {url !== "agenda" ? (
                <Footer />)
                : null}
        </div>
    );
}