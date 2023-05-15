import Editor from "../../../Proposals/EditProposalScope/Editor"
import Expenses from "../../../All/View/Others/Expenses";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import ServicesExpenses from "../../../../../services/expensesService";
import { useTranslation } from "react-i18next";


export default function BoxProposal(props: any) {

    const navigate = useNavigate();
    const [open, setOpen] = useState(true);
    const code: any = useParams().id;
    const { t } = useTranslation();


    const [proposalExpense, setProposalExpense]: any = useState([]);
    const [proposalExpenseValue, setProposalExpenseValue]: any = useState(0);
    const [proposalExpenseRecurrent, setProposalExpenseRecurrent]: any = useState(0);
    const [proposalExpenseInternal, setProposalExpenseInternal]: any = useState(0);

    const [initialRunPeriod, setInitialRunPeriod]: any = useState(0);
    const [finalExecutionPeriod, setFinalExecutionPeriod]: any = useState(0);
    const [payBack, setPayBack]: any = useState(0);
    const [responsibleBussiness, setResponsibleBussiness]: any = useState("");

    const dateFormat = (date: any) => {
        const year = date.slice(0, 4);
        const month = date.slice(5, 7) - 1;
        const day = date.slice(8, 10);

        return day + "/" + month + "/" + year;
    }

    const payback = (dateInit: any, dateEnd: any) => {
        const date1: any = new Date(dateInit);
        const date2: any = new Date(dateEnd);

        const diffInMs = Math.abs(date2 - date1); // obtém a diferença em milissegundos
        const diffInMonths = diffInMs / (1000 * 60 * 60 * 24 * 30); // converte para meses

        if (diffInMonths.toFixed(0) === "1") {
            return diffInMonths.toFixed(0) + " mês";
        } else {
            return diffInMonths.toFixed(0) + " meses";
        }
    }


    useEffect(() => {

        ServicesExpenses.findByProposal(props.proposal.proposalCode).then((expenses: any) => {
            let expense: any = [];


            if (expenses.length > 0) {


                for (let i = 0; i < expenses.length; i++) {
                    if (expenses[i].proposal.proposalCode === props.proposal.proposalCode) {
                        expense.push(expenses[i])

                        if (expenses[i].expensesType === "recurrent") {
                            setProposalExpenseRecurrent(expenses[i]);
                            setProposalExpense(1)

                        } else if (expenses[i].expensesType === "internal") {
                            setProposalExpenseInternal(expenses[i]);
                            setProposalExpense(1)


                        } else if (expenses[i].expensesType === "expenses") {
                            setProposalExpense(1)
                            setProposalExpenseValue(expenses[i]);
                        }

                    }
                }



                if (expense.length > 0) {
                    setInitialRunPeriod(dateFormat(expense[0].proposal.initialRunPeriod));
                    setFinalExecutionPeriod(dateFormat(expense[0].proposal.finalExecutionPeriod));
                    setPayBack(payback(expense[0].proposal.initialRunPeriod, expense[0].proposal.finalExecutionPeriod));
                    setResponsibleBussiness(expense[0].proposal.responsibleAnalyst.workerName);

                }
            }

        })

    }, [props.proposal])


    const handleChange = (value: React.SetStateAction<string>, type: string) => {
    }


    return (
        <div className={"box " + open} >

            <div className="display-flex-space-between header-table">


                <div className="display-flex-align-center">

                    <span className="code noMargin">{props.proposal.proposalCode}</span>

                    <p className="title"> {t(props.proposal.proposalName)}</p>

                </div>

                <div className="display-flex">

                    <span onClick={() => setOpen(!open)} className="material-symbols-outlined arrow-expend">
                        expand_more
                    </span>
                </div>
            </div>

            <div className="input">
                <label>{t("titleProposal")}</label>
                <input type="text" value={props.proposal.proposalName} />
            </div>


            <div className="text-area">
                <label>{t("objective")}</label>
                <Editor handleChange={handleChange} type={"objective"} content={props.proposal.demand.demandObjective} />
            </div>

            <div className="text-area">
                <label>{t("proposalScope")}</label>
                <Editor handleChange={handleChange} type={"scope"} content={props.proposal.descriptiveProposal} />
            </div>


            <div className="text-area">
                <label>{t("benefitQualitative")}</label>
                <Editor handleChange={handleChange} type={"objective"} content={props.proposal.demand.qualitativeBenefit.qualitativeBenefitDescription} />
            </div>

            <div className="text-area">
                <label>{t("benefitPotential")}</label>
                <Editor handleChange={handleChange} type={"objective"} content={props.proposal.demand.potentialBenefit.potentialBenefitDescription} />
            </div>

            {proposalExpenseValue?.expensesCode > 0 ? (<Expenses type="expenses" proposalExpense={proposalExpenseValue} />) : (null)}

            {proposalExpenseRecurrent?.expensesCode > 0 ? (<Expenses type="recurrent" proposalExpense={proposalExpenseRecurrent} />) : (null)}

            {proposalExpenseInternal?.expensesCode > 0 ? (<Expenses type="internal" proposalExpense={proposalExpenseInternal} />) : (null)}


            <div className="display-flex-align-center mt20">

                <div className="input mr20">
                    <label>{t("start")}</label>
                    <input type="date" value={initialRunPeriod} />
                </div>

                <div className="input">
                    <label>{t("end")}</label>
                    <input type="date" value={finalExecutionPeriod} />
                </div>

            </div>

            <div className="input">
                <label>{t("Payback")}</label>
                <input type="text" value={payBack} />
            </div>

            <div className="input">
                <label>{t("responsibleBussiness")}</label>
                <input type="text" value={responsibleBussiness} />
            </div>




        </div>
    )
}