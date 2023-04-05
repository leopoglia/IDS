import { Tooltip } from "@mui/material";
import { t } from "i18next"
import { useState } from "react"


export default function Expenses(props: any) {

    const [open, setOpen] = useState(false);

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
                            <td>{t("hourValue")}</td>
                            <td>{t("expenseTotalValue")}</td>
                            <td>{t("costCenter")}</td>
                        </tr>

                        {props.proposalExpense.map((proposalExpense: any, index: any) => {
                            if (proposalExpense.expenseType === props.type)
                                return (
                                    <tr>
                                        <Tooltip title={proposalExpense.expenseProfile} arrow>
                                        <td>{proposalExpense.expenseProfile}</td>
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
                        })
                        }
                    </tbody>
                </table>
            </div>

        </div>
    )
}