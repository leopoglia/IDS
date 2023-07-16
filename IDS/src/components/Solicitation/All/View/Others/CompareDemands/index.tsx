import './style.css';
import ServicesDemand from '../../../../../../services/demandService';
import ServicesReproach from '../../../../../../services/reproachService';
import { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import HtmlReactParser from 'html-react-parser';
import Table from '../Table';
import { Link } from 'react-router-dom';
import othersUtil from '../../../../../../utils/othersUtil';
import notifyUtil from '../../../../../../utils/notifyUtil';


export default function CompareDemands(props: any) {

    const { t } = useTranslation();
    const demandCode = parseInt(window.location.pathname.split("/")[3]); // Buscar código da demanda
    const demandVersion = parseInt(window.location.href.split("?")[1]); // Buscar versão da demanda

    const [demand, setDemand]: any = useState({
        requesterRegistration: { workerCode: "", workerName: "" },
        demandStatus: "", demandType: "", demandDescription: "", demandDate: "",
        classification: { classificationCode: "", classificationName: "" },
        realBenefit: { realBenefitCode: "", realCurrency: 0, realMonthlyValue: 0 },
        potentialBenefit: { potencialBenefitCode: "", potentialCurrency: 0, potentialMonthlyValue: 0 },
        qualitativeBenefit: { qualitativeBenefitCode: "", qualitativeBenefitDescription: "" },
        demandAttachment: { demandAttachmentCode: "", dice: "", type: "", name: "" }, demandCode: 0,
    });

    const [demandCompare, setDemandCompare]: any = useState({
        requesterRegistration: { workerCode: "", workerName: "" },
        demandStatus: "", demandType: "", demandDescription: "", demandDate: "",
        classification: { classificationCode: "", classificationName: "" },
        realBenefit: { realBenefitCode: "", realCurrency: 0, realMonthlyValue: 0 },
        potentialBenefit: { potencialBenefitCode: "", potentialCurrency: 0, potentialMonthlyValue: 0 },
        qualitativeBenefit: { qualitativeBenefitCode: "", qualitativeBenefitDescription: "" },
        demandAttachment: { demandAttachmentCode: "", dice: "", type: "", name: "" }, demandCode: 0,
    });

    const [centerCost, setCenterCost]: any = useState([]); // Dados do centro de custo
    const [centerCostCompare, setCenterCostCompare]: any = useState([]); // Dados do centro de custo

    const [situationCorrentOpen, setSituationCorrentOpen] = useState(false);
    const [benefitRealOpen, setBenefitRealOpen] = useState(false);
    const [benefitPotentialOpen, setBenefitPotentialOpen] = useState(false);
    const [benefitQualitativeOpen, setBenefitQualitativeOpen] = useState(false);


    useEffect(() => {
        ServicesDemand.findByDemandCodeAndDemandVersion(demandCode, demandVersion).then((response: any) => {
            setDemand(response);
            setCenterCost(response.costCenter);
        }).catch((error: any) => {
            console.log(error);
        });


        ServicesDemand.findById(props.similarity.demandTwo.demandCode).then((response: any) => {
            setDemandCompare(response);
            setCenterCostCompare(response.costCenter);
        }).catch((error: any) => {
            console.log(error);
        });

    }, [demandCode, demandVersion]);


    function sameFinality() {

        ServicesDemand.updateStatus(demandCode, "Cancelled").then((response: any) => {

            ServicesReproach.save("Demanda similar a demanda de código " + demandCompare.demandCode, demandCode, demandVersion, props.workerCode).then((response: any) => {
                props.setSimilarity([]);
                notifyUtil.success(t("demandCancelled"));
            });

        }).catch((error: any) => {
            console.log(error);
        })

    }



    return (
        <div className="compare-demands view-demand">


            <div className='display-flex-space-between'>
                {demand?.demandCode !== 0 && (
                    <>
                        <div className='box'>
                            <div className="display-flex-space-between display-solicitation-demand">
                                <p className="title">{demand.demandTitle}</p>
                                <div className="display-flex-align-center h50">
                                    <div className="code-date">{t("date")}:  {othersUtil.formatDate(demand?.demandDate)}</div>
                                    <div className="code">{demand.demandCode}</div>
                                </div>
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
                                        {demand.potentialBenefit.potentialCurrency}

                                        <div className="text-information">{demand.potentialBenefit.potentialMonthlyValue.toLocaleString()}</div>

                                    </div>
                                </div>

                                <div className="infos">
                                    <span>{t("legalObligation")}: {
                                        (demand.potentialBenefit.legalObrigation === true) ? (<span>Sim</span>) : (<span>Não</span>)}</span>
                                </div>

                                <div className="display-grid description">

                                    <span className="desc">{t("description")}:</span>

                                    {demand.potentialBenefit.potentialBenefitDescription &&
                                        <div className="text-information">{HtmlReactParser(demand.potentialBenefit.potentialBenefitDescription)}</div>
                                    }
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
                                <Table title="costCenter" demandCode={demand?.demandCode} headers={["costCenterCode", "costCenter"]} items={centerCost} />
                            )
                            }

                        </div>

                        <span className="material-symbols-outlined compare-arrrow">
                            compare_arrows
                        </span>

                        <div className='box'>
                            <div className="display-flex-space-between display-solicitation-demand">
                                <p className="title">{demandCompare.demandTitle}</p>
                                <div className="display-flex-align-center h50">
                                    <div className="code-date">{t("date")}:  {othersUtil.formatDate(demandCompare?.demandDate)}</div>
                                    <div className="code">{demandCompare.demandCode}</div>
                                </div>
                            </div>

                            <div className={"situation-current " + situationCorrentOpen}>


                                <div className="display-flex-space-between header-table">
                                    <div className="display-flex-align-center">
                                        <p className="title" >{t("requester")}:</p>
                                        <Link to={"/profile/" + demandCompare.requesterRegistration.workerCode} className="text-information workerName">
                                            <div className="profile-worker">
                                                {demandCompare.requesterRegistration.workerName.split(" ")[0].charAt(0)}
                                            </div>
                                            {demandCompare.requesterRegistration.workerName}
                                        </Link>
                                    </div>

                                    <span onClick={() => setSituationCorrentOpen(!situationCorrentOpen)} className="material-symbols-outlined arrow-expend">
                                        expand_more
                                    </span>
                                </div>


                                <div className="display-grid">
                                    <p className="title">{t("currentSituation")}:</p>
                                    {demandCompare.currentProblem ? (
                                        <div className="text-information" >{HtmlReactParser(demandCompare.currentProblem)}</div>
                                    ) : (
                                        null
                                    )}
                                </div>

                                <div className="display-grid">
                                    <p className="title objective">{t("objective")}:</p>
                                    {demandCompare.demandObjective ? (
                                        <div className="text-information">{HtmlReactParser(demandCompare.demandObjective)}</div>
                                    ) : (
                                        null
                                    )}
                                </div>
                            </div>

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
                                        {demandCompare.realBenefit.realCurrency === "R$" ? (
                                            <span>R$</span>
                                        ) : (demandCompare.realBenefit.realCurrency === "$") ? (
                                            <span>$</span>
                                        ) : (
                                            <span>€</span>
                                        )}

                                        <div className="text-information">{demandCompare.realBenefit.realMonthlyValue.toLocaleString()}</div>
                                    </div>
                                </div>

                                <div className="display-grid description">
                                    <span className="desc">{t("description")}:</span>
                                    <div className="text-information">{demandCompare.realBenefit.realBenefitDescription}</div>

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
                                        {demandCompare.potentialBenefit.potentialCurrency}

                                        <div className="text-information">{demandCompare.potentialBenefit.potentialMonthlyValue.toLocaleString()}</div>

                                    </div>
                                </div>

                                <div className="infos">
                                    <span>{t("legalObligation")}: {
                                        (demandCompare.potentialBenefit.legalObrigation === true) ? (<span>Sim</span>) : (<span>Não</span>)}</span>
                                </div>

                                <div className="display-grid description">

                                    <span className="desc">{t("description")}:</span>

                                    {demandCompare.potentialBenefit.potentialBenefitDescription &&
                                        <div className="text-information">{HtmlReactParser(demandCompare.potentialBenefit.potentialBenefitDescription)}</div>
                                    }
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
                                    <span>{t("internalControlRequirements")}: {(demandCompare.qualitativeBenefit.interalControlsRequirements === true) ? (<span>Sim</span>) : <span>Não</span>}</span>
                                </div>

                                <div className="infos">
                                    <span>{t("frequencyUse")}: {demandCompare.qualitativeBenefit.frequencyOfUse}</span>
                                </div>

                                <div className="description display-grid">

                                    <span className="desc">{t("description")}:</span>
                                    {demandCompare.qualitativeBenefit.qualitativeBenefitDescription ? (
                                        <div className="text-information">{HtmlReactParser(demandCompare.qualitativeBenefit.qualitativeBenefitDescription)}</div>
                                    ) : (
                                        null
                                    )}

                                </div>
                            </div>

                            {centerCost && (
                                <Table title="costCenter" demandCode={demandCompare?.demandCode} headers={["costCenterCode", "costCenter"]} items={centerCostCompare} />
                            )
                            }

                        </div>
                    </>
                )
                }
            </div>


            <img className='bia' src="/images/wids.png" alt="" />

            <div className='question'>
                <div className='modal-question'>
                    <span>
                        Essas demandas tem a mesma finalidade?
                    </span>


                    <div className='display-flex'>
                        <button className="btn-secondary" onClick={() => props.setSimilarity([])}>
                            {t('no')}
                        </button>

                        <button className="btn-primary" onClick={() => sameFinality()}>
                            {t('yes')}
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}
