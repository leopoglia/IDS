import { t } from "i18next";
import { Link } from "react-router-dom";
import Header from "../../../Fixed/Header";
import Nav from "../../../Fixed/Nav";
import Title from "../../../Fixed/Search/Title";
import ServicesDemand from "../../../../services/demandService";
import "./style.css"
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import SelectCenterCost from "../CrateDemand/Step1/SelectCenterCost";
import Services from "../../../../services/costCenterService";

export default function EscopeDemand() {

    const { t } = useTranslation();

    const demandCode = parseInt(window.location.href.split("/")[5]);
    const [costsCenters, setCostsCenters]: any = useState([]);
    const [costCenter, setCostCenter] = useState("");
    const [idCostCenter, setIdCostCenter]: any = useState([]);

    function getDemand() {
        ServicesDemand.findById(demandCode).then((response: any) => {
            const demand: any = [response]
            setDemands(demand)

            for (let i = 0; i < demand[0].costCenter.length; i++) {
                let costCenterArray = costsCenters;
                costCenterArray.push(demand[0].costCenter[i].costCenter);
                setCostsCenters(costCenterArray);
                createCostCenter(demand[0].costCenter[i].costCenter);
            }
        })
    }

    useEffect(() => {
        getDemand();
    }, [])

    const [demands, setDemands] = useState([
        {
            demandTitle: "", requesterRegistration: { workerName: "" }, demandDate: "", demandStatus: "", currentProblem: "", demandObjective: "",
            costCenter: [], realBenefit: { realMonthlyValue: 0, realCurrency: "", realBenefitDescription: "" },
            potentialBenefit: { potentialMonthlyValue: 0, legalObrigation: false, potentialBenefitDescription: "" }, qualitativeBenefit: { qualitativeMonthlyValue: 0, interalControlsRequirements: false, frequencyOfUse: "", qualitativeBenefitDescription: "" },
            complements: [{ executionDeadline: "", ppm: "", epicJira: "" }]
        }
    ]);

    console.log(idCostCenter)


    function addCostCenter(costCenterAdd: any) {
        if (costCenterAdd === "" || costCenterAdd === " ") {
            alert("Digite um centro de custo");
        } else {
            createCostCenter(costCenterAdd);
            let costCentersArray = costsCenters;
            costCentersArray.push(costCenterAdd);
            setCostsCenters(costCentersArray);
            setCostCenter("");
        }
    }

    function deleteCostCenter(costCentere: any) {
        return () => {
            const index = costsCenters.indexOf(costCentere);
            const indexId = idCostCenter.indexOf(costCentere);
            if (index > -1) {
                costsCenters.splice(index, 1);
                idCostCenter.splice(indexId, 1);
            }
            setCostsCenters(costsCenters);

            if (costCenter === " ") {
                setCostCenter("");
            } else {
                setCostCenter(" ");
            }
        }
    }

    async function createCostCenter(costCenterParameter: any) {
        let costsCenterBd: any = await Services.findAll();

        let igual = 0;
        let id = 0;
        for (let i = 0; i < costsCenterBd.length; i++) {
            if (costsCenterBd[i].costCenter === costCenterParameter) {
                igual++;
            }
        }

        if (igual === 0) {
            let service: any = await Services.save(costCenterParameter);

            idCostCenter.push(service.costCenterCode);
        } else {
            for (let i = 0; i < costsCenterBd.length; i++) {
                if (costsCenterBd[i].costCenter === costCenterParameter) {
                    id = costsCenterBd[i].costCenterCode;
                }
            }
            idCostCenter.push(id);
        }

        if (costCenter === " ") {
            setCostCenter("");
        } else {
            setCostCenter(" ");
        }

    }

    const handleChange = (event: any) => {
        localStorage.setItem("costCenter", JSON.stringify(costCenter));
    }

    return (
        <div className="create-demands-1">
            <Header />
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

                                        <div className="display-flex">
                                            <SelectCenterCost setCostCenter={setCostCenter} costCenter={costCenter} addCostCenter={addCostCenter} />

                                            <div className="btn-primary w45" onClick={() => { addCostCenter(costCenter); handleChange(costCenter); }}>
                                                <span className="material-symbols-outlined">add</span>
                                            </div>
                                        </div>
                                    </div>


                                    {costsCenters.map((costCenter: any) => {
                                        return <div className="costCenter">{costCenter}
                                            <span className="material-symbols-outlined delete-cost-center" onClick={deleteCostCenter(costCenter)}>
                                                delete
                                            </span>
                                        </div>
                                    })
                                    }


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
                    <Link to={"/proposal/edit-scope/"}>
                        <button className="btn-primary">{t("advance")}</button>
                    </Link>
                </div>

            </div>

        </div>
    );
}