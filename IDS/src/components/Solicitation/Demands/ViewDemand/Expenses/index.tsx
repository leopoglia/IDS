import { t } from "i18next"


export default function Expenses(props: any) {

    return (
        <div >
            <div className={"complement "} >
                <div className="display-flex-space-between">

                    <p className="title">{t(props.type)}</p>
                    <span className="material-symbols-outlined arrow-expend">
                        expand_more
                    </span>
                </div>

                <table>
                    <tbody>
                        <tr>
                            <td>{t("expenseProfile")}</td>
                            <td>{t("expenseType")}</td>
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
                                        <td>{proposalExpense.totalValue}</td>

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