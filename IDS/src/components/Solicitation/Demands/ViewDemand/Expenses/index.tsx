import { Tooltip } from "@mui/material";
import { t } from "i18next"
import { useEffect, useState } from "react"


export default function Expenses(props: any) {

    const [open, setOpen] = useState(false);

    const [totalAmountOfHours, setTotalAmountOfHours] = useState(0);
    const [totalHourValue, setTotalHourValue] = useState(0);
    const [totalValue, setTotalValue] = useState(0);


    useEffect(() => {

        setTotalAmountOfHours(0);
        setTotalHourValue(0);
        setTotalValue(0);

        console.log("EXPENSE --> ", props.proposalExpense);

        for(let i = 0; i < props.proposalExpense.length; i++){

            console.log(props.proposalExpense[i].expenseType, " === ", props.type, " ?");

            if(props.proposalExpense[i].expenseType === props.type){

                setTotalAmountOfHours(totalAmountOfHours + parseInt(props.proposalExpense[i].amountOfHours));
                setTotalHourValue(totalHourValue + parseInt(props.proposalExpense[i].hourValue));
                setTotalValue(totalValue + parseInt(props.proposalExpense[i].totalValue));
            }
        }

    }, [props.proposalExpense])


    return (
        <div>
            <div className={"complement " + open} >
                <div className="display-flex-space-between">

                    <p className="title">{t(props.type)}</p>
                    <span onClick={() => setOpen(!open)} className="material-symbols-outlined arrow-expend">
                        expand_more
                    </span>
                </div>

                <table>
                    <tbody>
                        <tr>
                            <td>{t("expenseProfile")}</td>

                            {props.type !== "recurrent" ? (
                                <td>{t("effort")}</td>
                            ) : (
                                <td>{t("licenses")}</td>
                            )}

                            {props.type !== "recurrent" ? (
                                <td>{t("hourValue")}</td>
                            ) : (
                                <td>{t("unitValue")}</td>
                            )}

                            <td>{t("expenseTotalValue")}</td>

                            <td>{t("costCenter")}</td>
                        </tr>

                        {props.proposalExpense.map((proposalExpense: any, index: any) => {
                            if (proposalExpense.expenseType === props.type) {

                                return (
                                    <tr>
                                        <Tooltip title={proposalExpense.expenseProfile} arrow>
                                            <td>{proposalExpense.expenseProfile}</td>
                                        </Tooltip>

                                        <Tooltip title={proposalExpense.amountOfHours} arrow>
                                            <td>{proposalExpense.amountOfHours}</td>
                                        </Tooltip>

                                        <Tooltip title={proposalExpense.hourValue} arrow>
                                            <td>{proposalExpense.hourValue}</td>
                                        </Tooltip>

                                        <Tooltip title={proposalExpense.totalValue} arrow>
                                            <td>{proposalExpense.totalValue}</td>
                                        </Tooltip>

                                        <Tooltip title={proposalExpense.costCenter.costCenter} arrow>
                                            <td>{proposalExpense.costCenter.costCenter}</td>
                                        </Tooltip>
                                    </tr>
                                )
                            }
                        })
                        }

                        {/* <tr>
                            <td>Total:</td>

                            <td>{totalAmountOfHours}</td>

                            <td>{totalHourValue}</td>

                            <td>{totalValue}</td>

                            <td></td>

                        </tr> */}
                    </tbody>
                </table>
            </div>

        </div>
    )
}