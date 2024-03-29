import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { Tooltip } from "@mui/material";

import Title from "../../../Fixed/Search/Title";
import GridCostExecution from "./GridCostExecution";
import ProposalServices from "../../../../services/proposalService";
import DemandService from "../../../../services/demandService";
import UserContext from "../../../../context/userContext";
import ExpensesService from "../../../../services/expensesService";
import notifyUtil from "../../../../utils/notifyUtil";
import ServicesCostCenter from "../../../../services/costCenterService";

import "./style.css"
import ProgressBar from "../../Demands/CrateDemand/Others/ProgressBar";

export default function ExecutionCosts() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const worker = useContext(UserContext).worker;

    const [demandCode, setDemandCode] = useState(parseInt(window.location.href.split("/")[5]));
    const [expenseListStorage, setExpenseListStorage] = useState<any>(JSON.parse(localStorage.getItem('expenseList') || '[]'));
    const [realCurrency, setRealCurrency] = useState();

    const demandData: any = JSON.parse(localStorage.getItem('demand') || '{}');
    const proposal = JSON.parse(localStorage.getItem('proposal') || '{}');
    const scope: any = localStorage.getItem('proposalScope');

    let actualDate = new Date().getUTCDate() + "/" + (new Date().getUTCMonth() + 1) + "/" + new Date().getUTCFullYear(); // Data atual
    // let [costCenter, setCostCenter]: any = useState([]);
    // let [percent, setPercent]: any = useState(0);
    // let [expensesCostCenter, setExpensesCostCenter]: any = useState([{ costCenter: null, percent: 0 }]);

    let [internalCosts, setInternalCosts]: any = useState(0);
    let [recurrentCosts, setRecurrentCosts]: any = useState(0);
    let [externalCosts, setExternalCosts]: any = useState(0);
    let [totalsCosts, setTotalsCosts]: any = useState(0);

    useEffect(() => {
        DemandService.findById(demandCode).then((demand: any) => {
            localStorage.setItem('demand', JSON.stringify(demand));
            setRealCurrency(demand.realBenefit.realCurrency)
        });


        for (let i = 0; i < expenseListStorage.length; i++) {
            if (expenseListStorage[i].expenseType === "internal") {
                internalCosts += expenseListStorage[i].totalValue;
                setInternalCosts(internalCosts);
            } else if (expenseListStorage[i].expenseType === "expenses") {
                externalCosts += expenseListStorage[i].totalValue;
                setExternalCosts(externalCosts);
            } else if (expenseListStorage[i].expenseType === "recurrent") {
                recurrentCosts += expenseListStorage[i].totalValue;
                setRecurrentCosts(recurrentCosts);
            }

            totalsCosts += expenseListStorage[i].totalValue;
            setTotalsCosts(totalsCosts);
        }
    }, [expenseListStorage]);


    const nextStep = () => {
        let veryfyCostCenters: any = veryfyCostCenter();

        if (totalsCosts === 0 || veryfyCostCenters === 0) {
            if (totalsCosts === 0) { notifyUtil.error(t("fillAllFields")) } else if (veryfyCostCenters === 0) { notifyUtil.error(t("totaPercentage100")) }
        } else {

            DemandService.findById(demandCode).then((demand: any) => {
                ProposalServices.save(demandData.demandTitle, "Pending", 1, proposal.start, proposal.end, scope, worker.id, 0, proposal.idResponsiblesBussiness, totalsCosts, externalCosts, internalCosts, demandCode, demand.demandVersion, actualDate).then(async (proposal: any) => {
                    DemandService.updateStatus(demandCode, "Assesment");
                    localStorage.removeItem('proposal');
                    saveExpenseFinal(proposal.proposalCode);

                    navigate('/proposals/1');

                }).catch((error: any) => {
                    console.log(error);
                });

            });

        }
    }

    const veryfyCostCenter: any = (): any => {
        let centerOfCustProposalInternal: any = localStorage.getItem('centerOfCustProposalinternal' || '[]');
        let centerOfCustProposalExpenses: any = localStorage.getItem('centerOfCustProposalexpenses' || '[]');
        let centerOfCustProposalRecurrent: any = localStorage.getItem('centerOfCustProposalrecurrent' || '[]');
        let percentInternal = 0;
        let percentExpenses = 0;
        let percentRecurrent = 0;

        if (JSON.parse(centerOfCustProposalInternal)?.length > 0) {
            for (let i = 0; i < JSON.parse(centerOfCustProposalInternal).length; i++) {
                if (JSON.parse(centerOfCustProposalInternal)[i].percent === 0) {
                    return 0;
                } else {
                    percentInternal += JSON.parse(centerOfCustProposalInternal)[i].percent;
                }
            }
        }

        if (JSON.parse(centerOfCustProposalExpenses)?.length > 0) {
            for (let i = 0; i < JSON.parse(centerOfCustProposalExpenses).length; i++) {
                if (JSON.parse(centerOfCustProposalExpenses)[i].percent === 0) {
                    return 0;
                } else {
                    percentExpenses += JSON.parse(centerOfCustProposalExpenses)[i].percent;
                }
            }
        }

        if (JSON.parse(centerOfCustProposalRecurrent)?.length > 0) {
            for (let i = 0; i < JSON.parse(centerOfCustProposalRecurrent).length; i++) {
                if (JSON.parse(centerOfCustProposalRecurrent)[i].percent === 0) {
                    return 0;
                } else {
                    percentRecurrent += JSON.parse(centerOfCustProposalRecurrent)[i].percent;
                }
            }
        }

        if ((JSON.parse(centerOfCustProposalInternal)?.length >= 0 && (percentInternal !== 100 || percentInternal < 100)) || (JSON.parse(centerOfCustProposalExpenses)?.length >= 0 && (percentExpenses !== 100 || percentExpenses < 100)) || (JSON.parse(centerOfCustProposalRecurrent)?.length >= 0 && (percentRecurrent !== 100 || percentRecurrent < 100))) {
            return 0;
        }

        return 1
    }

    async function saveExpenseFinal(proposalCode: any) {
        let typeExpenses: any = [];
        let centerOfCustProposalInternal: any = localStorage.getItem('centerOfCustProposalinternal') || [];


        if (centerOfCustProposalInternal !== undefined && centerOfCustProposalInternal !== null) {
            typeExpenses.push("internal");
        }
        let centerOfCustProposalExpenses: any = localStorage.getItem('centerOfCustProposalexpenses') || [];

        if (centerOfCustProposalExpenses !== undefined && centerOfCustProposalInternal !== null) {
            typeExpenses.push("expenses");
        }
        let centerOfCustProposalRecurrent: any = localStorage.getItem('centerOfCustProposalrecurrent') || [];
        if (centerOfCustProposalRecurrent !== undefined && centerOfCustProposalInternal !== null) {
            typeExpenses.push("recurrent");
        }

        for (let i = 0; i < typeExpenses.length; i++) {

            let expensesCostCenter = typeExpenses[i] === "internal" ? centerOfCustProposalInternal : typeExpenses[i] === "recurrent" ? centerOfCustProposalRecurrent : typeExpenses[i] === "expenses" ? centerOfCustProposalExpenses : null;

            if (expensesCostCenter !== null && expensesCostCenter.length > 0) {
                const expensesCostCentersNew: any = [];
                for (let j = 0; j < JSON.parse(expensesCostCenter).length; j++) {
                    expensesCostCentersNew.push({ costCenterCode: JSON.parse(expensesCostCenter)[j].costCenterCode, percent: JSON.parse(expensesCostCenter)[j].percent });
                }


                if (JSON.parse(expensesCostCenter).length > 0) {
                    ExpensesService.save(typeExpenses[i], proposalCode, expenseListStorage, expensesCostCentersNew).then((expenses: any) => {
                    })
                }
            }
        }

        localStorage.removeItem('centerOfCustProposalexpenses')
        localStorage.removeItem('centerOfCustProposalinternal')
        localStorage.removeItem('centerOfCustProposalrecurrent')
        localStorage.removeItem('demand');
        localStorage.removeItem('expenseList');
    }

    return (
        <div className="create-demands-1 execution-costs">


            <div className="container">


                <div className="background-title">
                    <Title title="createProposal" nav={t("demandExecutionCosts")} />
                    <ProgressBar atual="4" proposal={true} />
                </div>

                <div className="box">


                    <div className="display-flex">
                        <p>{t("executionCostsProject")}</p>
                    </div>

                    <div className="display-flex-space-between display-block-execution">

                        <Link to={"/proposal/execution-costs/add-expense/" + demandCode}>
                            <button className="btn-secondary">{t("addExpense")}</button>
                        </Link>

                        <div className="costs-execution">

                            <div>
                                <Tooltip title={totalsCosts} arrow>
                                    <span>{t("totalsCosts")}: {realCurrency} {totalsCosts?.toFixed(2)}</span>
                                </Tooltip>

                                <Tooltip title={externalCosts} arrow>
                                    <span>{t("expenses")}: {realCurrency} {externalCosts?.toFixed(2)}</span>
                                </Tooltip>
                            </div>

                            <div>
                                <Tooltip title={externalCosts} arrow>
                                    <span>{t("recurrent")}: {realCurrency} {externalCosts?.toFixed(2)}</span>
                                </Tooltip>

                                <Tooltip title={internalCosts} arrow>
                                    <span>{t("internal")}: {realCurrency} {internalCosts?.toFixed(2)}</span>
                                </Tooltip>
                            </div>

                        </div>
                    </div>

                    <div className="hr"></div>

                    <div className="block">
                        {externalCosts !== 0 ?
                            <GridCostExecution title="expenses" realCurrency={realCurrency} />
                            : null
                        }



                        {recurrentCosts !== 0 ?
                            <GridCostExecution title="recurrent" realCurrency={realCurrency} />
                            : null
                        }

                        {internalCosts !== 0 ?
                            <GridCostExecution title="internal" realCurrency={realCurrency} />
                            : null
                        }

                        {totalsCosts === 0 ?
                            <div className="display-flex-center">
                                <p className="noExpenses">{t("noExpenses")}</p>
                            </div>
                            : null
                        }

                    </div>

                </div>

                <div className="demands-footer">
                    <Link to={"/proposal/informations/" + demandCode}>
                        <button className="btn-secondary">{t("return")}</button>
                    </Link>

                    <div className="display-flex-center">



                        <div onClick={() => { nextStep() }}>
                            <button className="btn-primary">{t("generateProposal")}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
