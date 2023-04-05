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
                                        <td>{proposalExpense.expenseProfile}</td>
                                        <td>{proposalExpense.hourValue}</td>
                                        <td>{proposalExpense.totalValue}</td>
                                        <td>{proposalExpense.costCenter.costCenter}</td>

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