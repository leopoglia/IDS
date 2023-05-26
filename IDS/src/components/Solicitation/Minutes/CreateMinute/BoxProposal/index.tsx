import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import Editor from "../../../Proposals/EditProposalScope/Editor"
import Expenses from "../../../All/View/Others/Expenses";
import ServicesExpenses from "../../../../../services/expensesService";


export default function BoxProposal(props: any) {

    const navigate = useNavigate();
    const [open, setOpen] = useState(true);
    const code: any = useParams().id;
    const { t } = useTranslation();

    const [proposalTitle, setProposalTitle]: any = useState(props.proposal.proposalName);
    const [proposalObjective, setProposalObjective]: any = useState(props.proposal.demand.demandObjective);  
    const [proposalScope, setProposalScope]: any = useState(props.proposal.descriptiveProposal);

    const [proposalQualitativeBenefitDescription, setProposalQualitativeBenefitDescription]: any = useState(props.proposal.demand.qualitativeBenefit.qualitativeBenefitDescription);
    const [proposalPotentialBenefitDescription, setProposalPotentialBenefitDescription]: any = useState(props.proposal.demand.potentialBenefit.potentialBenefitDescription);


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
                    setInitialRunPeriod(expense[0].proposal.initialRunPeriod.split("T")[0]);
                    setFinalExecutionPeriod(expense[0].proposal.finalExecutionPeriod.split("T")[0]);
                    setPayBack(payback(expense[0].proposal.initialRunPeriod, expense[0].proposal.finalExecutionPeriod));
                    setResponsibleBussiness(expense[0].proposal.responsibleAnalyst.workerName);

                }
            }

        })

    }, [props.proposal])


    const handleChange = (value: any, type: string) => {

        if(type === "title"){
            setProposalTitle(value.target.value);
        } else if(type === "objective"){
            setProposalObjective(value.target.value);
        }else if(type === "scope"){
            setProposalScope(value.target.value);
        } else if(type === "benefitQualitative"){
            setProposalQualitativeBenefitDescription(value.target.value);
        } else if(type === "benefitPotential"){
            setProposalPotentialBenefitDescription(value.target.value);
        } else if(type === "dateStart"){
            setInitialRunPeriod(value.target.value);
        } else if(type === "dateEnd"){
            setFinalExecutionPeriod(value.target.value);
        }

        props.handleChange(value, type, props.proposal.proposalCode);
    }


    return (
        <div className={"box " + open} >

            <div className="display-flex-space-between header-table">


                <div className="display-flex-align-center">

                    <span className="code noMargin">{props.proposal.proposalCode}</span>

                    <p className="title"> {t(proposalTitle)}</p>

                </div>

                <div className="display-flex">

                    <span onClick={() => setOpen(!open)} className="material-symbols-outlined arrow-expend">
                        expand_more
                    </span>
                </div>
            </div>

            <div className="input">
                <label>{t("titleProposal")}</label>
                <input type="text" value={proposalTitle} onChange={(e) => handleChange(e, "title")}  />
            </div>


            <div className="text-area">
                <label>{t("objective")}</label>
                <Editor handleChange={handleChange} type={"objective"} content={proposalObjective} />
            </div>

            <div className="text-area">
                <label>{t("proposalScope")}</label>
                <Editor handleChange={handleChange} type={"scope"} content={proposalScope} />
            </div>


            <div className="text-area">
                <label>{t("benefitQualitative")}</label>
                <Editor handleChange={handleChange} type={"benefitQualitative"} content={proposalQualitativeBenefitDescription} />
            </div>

            <div className="text-area">
                <label>{t("benefitPotential")}</label>
                <Editor handleChange={handleChange} type={"benefitPotential"} content={proposalPotentialBenefitDescription} />
            </div>

            {proposalExpenseValue?.expensesCode > 0 ? (<Expenses type="expenses" proposalExpense={proposalExpenseValue} />) : (null)}

            {proposalExpenseRecurrent?.expensesCode > 0 ? (<Expenses type="recurrent" proposalExpense={proposalExpenseRecurrent} />) : (null)}

            {proposalExpenseInternal?.expensesCode > 0 ? (<Expenses type="internal" proposalExpense={proposalExpenseInternal} />) : (null)}


            <div className="display-flex-align-center mt20">

                <div className="input mr20">
                    <label>{t("start")}</label>
                    <input type="date" value={initialRunPeriod} onChange={(e) => handleChange(e, "dateStart")} />
                </div>

                <div className="input">
                    <label>{t("end")}</label>
                    <input type="date" value={finalExecutionPeriod} onChange={(e) => handleChange(e, "dateEnd")} />
                </div>

            </div>

        </div>
    )
}