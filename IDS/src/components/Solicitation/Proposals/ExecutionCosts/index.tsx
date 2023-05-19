import Title from "../../../Fixed/Search/Title";
import GridCostExecution from "./GridCostExecution";
import { Link } from "react-router-dom";
import "./style.css"
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import { useState, useContext, useEffect } from "react";
import ProposalServices from "../../../../services/proposalService";
import DemandService from "../../../../services/demandService";
import ExpenseService from "../../../../services/expenseService";
import UserContext from "../../../../context/userContext";
import ExpensesService from "../../../../services/expensesService";
import SelectCostCenter from "./SelectCostCenter";

export default function ExecutionCosts() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const worker = useContext(UserContext).worker;

    const [demandCode, setDemandCode] = useState(parseInt(window.location.href.split("/")[5]));
    const [expenseListStorage, setExpenseListStorage] = useState<any>(JSON.parse(localStorage.getItem('expenseList') || '[]'));
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

    DemandService.findById(demandCode).then((demand: any) => {
        localStorage.setItem('demand', JSON.stringify(demand));
    });

    useEffect(() => {
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

        if (totalsCosts === 0) {
            notify()
        } else {

            DemandService.findById(demandCode).then((demand: any) => {
                ProposalServices.save(demandData.demandTitle, "Pending", 1, proposal.start, proposal.end, scope, worker.id, 0, proposal.responsiblesBussiness, totalsCosts, externalCosts, internalCosts, demandCode, demand.demandVersion, actualDate).then(async (proposal: any) => {
                    DemandService.updateStatus(demandCode, "Assesment");
                    localStorage.removeItem('proposal');
                    saveExpenseFinal();

                    navigate('/proposals/1');

                }).catch((error: any) => {
                    console.log(error);
                });

            });

        }
    }

    async function saveExpenseFinal() {
        let typeExpenses: any = [];
        let centerOfCustProposalInternal: any = [localStorage.getItem('centerOfCustProposalinternal')]
        if (centerOfCustProposalInternal[0] != null) {
            typeExpenses.push("internal");
        }
        let centerOfCustProposalExpenses: any = [localStorage.getItem('centerOfCustProposalexpenses')]
        if (centerOfCustProposalExpenses[0] != null) {
            typeExpenses.push("expenses");
        }
        let centerOfCustProposalRecurrent: any = [localStorage.getItem('centerOfCustProposalrecurrent')]
        if (centerOfCustProposalRecurrent[0] != null) {
            typeExpenses.push("recurrent");
        }


        for (let i = 0; i < typeExpenses.length; i++) {
            let expensesCostCenter: any = [];
            let costCentersCode = typeExpenses[i] === "internal" ? centerOfCustProposalInternal : typeExpenses[i] === "recurrent" ? centerOfCustProposalRecurrent : centerOfCustProposalExpenses;

            for (let j = 0; j < JSON.parse(costCentersCode).length; j++) {
                expensesCostCenter.push({ costCenter: { costCenterCode: JSON.parse(costCentersCode)[j] }, percent: 50 });
            }

            if (JSON.parse(costCentersCode).length > 0) {
                ExpensesService.save(typeExpenses[i], demandCode, JSON.parse(costCentersCode), expenseListStorage, expensesCostCenter).then((expenses: any) => {
                    console.log(expenses);
                })
            }

        }

        localStorage.removeItem('centerOfCustProposalexpenses')
        localStorage.removeItem('centerOfCustProposalinternal')
        localStorage.removeItem('centerOfCustProposalrecurrent')
        localStorage.removeItem('demand');
        localStorage.removeItem('expenseList');

    }

    return (
        <div className="execution-costs">


            <div className="container">


                <div className="background-title">
                    <Title title="executionCosts" nav={t("demandExecutionCosts")} />
                </div>

                <div className="box">


                    <div className="display-flex">
                        <p>{t("executionCostsProject")}</p>
                    </div>

                    <div className="display-flex-space-between">

                        <Link to={"/proposal/execution-costs/add-expense/" + demandCode}>
                            <button className="btn-secondary">{t("addExpense")}</button>
                        </Link>

                        <div className="costs-execution">
                            <span>{t("totalsCosts")}: R$ {totalsCosts}</span>

                            <span>{t("expenses")}: R$ {externalCosts}</span>


                            <span>{t("recurrent")}: R$ {recurrentCosts}</span>

                            <span>{t("internal")}: R$ {internalCosts}</span>

                        </div>
                    </div>

                    <div className="hr"></div>

                    <div className="block">
                        {externalCosts !== 0 ?
                            <GridCostExecution title="expenses" />
                            : null
                        }



                        {recurrentCosts !== 0 ?
                            <GridCostExecution title="recurrent" />
                            : null
                        }

                        {internalCosts !== 0 ?
                            <GridCostExecution title="internal" />
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

            <ToastContainer position="bottom-right" newestOnTop />

        </div>
    );
}

// Notificação de erro ao preencher campo obrigatório
const notify = () => {
    toast.error('Preencha todos os campos!', {
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
