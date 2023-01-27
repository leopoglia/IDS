import { t } from "i18next";
import { Link } from "react-router-dom";
import Header from "../../../Fixed/Header";
import Nav from "../../../Fixed/Nav";
import Title from "../../../Fixed/Search/Title";
import ButtonAction from "../../Demands/CrateDemand/ButtonAction";
import CheckBox from "../../Demands/CrateDemand/CheckBox";
import Input from "../../Demands/CrateDemand/Input";
import ProgressBar from "../../Demands/CrateDemand/ProgressBar";
import SelectCoin from "../../Demands/CrateDemand/SelectCoin";
import TextArea from "../../Demands/CrateDemand/TextArea";
import "./style.css"
import Services from "../../../../services/demandService";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function EscopeDemand() {

    const { t } = useTranslation();

    const demandCode = parseInt(window.location.href.split("/")[5]);
    const [centerCost, setCenterCost] = useState([]);

    function getDemand() {
        Services.findById(demandCode).then((response: any) => {
            const demand: any = [response]
            setDemands(demand)
            console.log(demand[0].costCenter)
            setCenterCost(demand[0].costCenter)
        })
    }

    useEffect(() => {
        getDemand();
    });

    const costCenter = () => {
        return (
            centerCost.map((item: any) => {
                return item.costCenter && item.costCenterCode
            }
            )
        )
    }

    const [demands, setDemands] = useState([
        {
            demandTitle: "", requesterRegistration: { workerName: "" }, demandDate: "", demandStatus: "", currentProblem: "", demandObjective: "",
            costCenter: { costCenterCode: "", costCenter: "" }, realBenefit: { realMonthlyValue: 0, realCurrency: "", realBenefitDescription: "" },
            potentialBenefit: { potentialMonthlyValue: 0, legalObrigation: false, potentialBenefitDescription: "" }, qualitativeBenefit: { qualitativeMonthlyValue: 0, interalControlsRequirements: false, frequencyOfUse: "", qualitativeBenefitDescription: "" },
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
        <div className="create-demands-1">
            <Header icon="folder_copy" title="createDemand" />
            <Nav />

            <div className="container">
                <div className="background-title">
                    <Title nav="proposalEditDemand" title="proposal" />

                </div>

                <div className="box">
                    <p>{t("generalInformations")}</p>

                    {
                        demands.map((val, index) => {
                            return (
                                <div>
                                    <div className="input">
                                        <label>{t("titleProposal")} *</label>
                                        <input type="text" value={val.demandTitle} />
                                    </div>

                                    <div className="text-area">
                                        <label>{t("problemToBeSolved")} *</label>
                                        <textarea value={val.currentProblem} />
                                    </div>

                                    <div className="text-area">
                                        <label>{t("proposal")} *</label>
                                        <textarea value={val.demandObjective} />
                                    </div>

                                    <div className="input">
                                        <label>{t("costCenter")} *</label>
                                        <input type="text" value={costCenter()} />
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>

                <div className="box">

                    <p>{t("benefitReal")}</p>

                    {
                        demands.map((val, index) => {
                            return (
                                <div>

                                    <div className="input">
                                        <label>{t("monthlyValue")} *</label>
                                        <input type="text" value={val.realBenefit.realMonthlyValue} />
                                    </div>

                                    <div className="input">
                                        <label>{t("description")} *</label>
                                        <input type="text" value={val.realBenefit.realBenefitDescription} />
                                    </div>

                                </div>
                            )
                        })
                    }

                </div>

                <div className="box">
                    <p>{t("benefitPotential")}</p>

                    {
                        demands.map((val, index) => {
                            return (
                                <div>

                                    <div className="input">
                                        <label>{t("monthlyValue")} *</label>
                                        <input type="text" value={val.potentialBenefit.potentialMonthlyValue} />
                                    </div>

                                    <div className="input">
                                        <label>{t("description")} *</label>
                                        <input type="text" value={val.potentialBenefit.potentialBenefitDescription} />
                                    </div>

                                </div>
                            )
                        })
                    }
                </div>

                <div className="box">
                    <p>{t("benefitQualitative")}</p>

                    {
                        demands.map((val, index) => {
                            return (
                                <div>

                                    <div className="input">
                                        <label>{t("monthlyValue")} *</label>
                                        <input type="text" value={val.qualitativeBenefit.frequencyOfUse} />
                                    </div>

                                    <div className="input">
                                        <label>{t("description")} *</label>
                                        <input type="text" value={val.qualitativeBenefit.qualitativeBenefitDescription} />
                                    </div>

                                </div>
                            )
                        })
                    }

                    {/* <div className="flex">
                        <Input label="monthlyValue" required="*" />
                        <SelectCoin />
                    </div>

                    <div className="flex">
                        <Input label="description" required=""></Input>

                        <div className="input-checkbox requirements">
                            <label>{t("internalControlRequirements")}</label>
                            <div className="checkbox">
                                <CheckBox />
                            </div>
                        </div>
                    </div> */}

                </div>

                <div className="display-flex-end">
                    <Link to="/proposal/edit-scope">
                        <button className="btn-primary">{t("advance")}</button>
                    </Link>
                </div>

            </div>

        </div>
    );
}