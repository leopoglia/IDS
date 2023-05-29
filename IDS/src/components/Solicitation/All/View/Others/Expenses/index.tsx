import { Tooltip } from "@mui/material";
import { t } from "i18next"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router";


export default function Expenses(props: any) {

    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const [totalAmountOfHours, setTotalAmountOfHours] = useState("");
    const [totalHourValue, setTotalHourValue] = useState("");
    const [totalValue, setTotalValue] = useState("");
    const [expense, setExpense] = useState([] as any);
    const demandCode = useParams().id;

    useEffect(() => {

        let totalAmountOfHoursLet = 0;
        let totalHourValueLet = 0;
        let totalValueLet = 0;

        if (props?.proposalExpense?.expense !== undefined) {
            setExpense(props.proposalExpense.expense);
            let expenseAux = props.proposalExpense.expense;

            expenseAux.forEach((element: any) => {

                if (element.expenseType === props.type) {
                    totalAmountOfHoursLet += parseInt(element.amountOfHours);
                    totalHourValueLet += parseInt(element.hourValue);
                    totalValueLet += parseInt(element.totalValue);
                }
            });

            if (props.type !== "recurrent") {
                setTotalAmountOfHours(totalAmountOfHoursLet + "h");
            } else {
                setTotalAmountOfHours(totalAmountOfHoursLet.toString());
            }
            setTotalHourValue(totalHourValueLet.toString());
            setTotalValue(totalValueLet.toString());

        }



    }, [props.proposalExpense])

    const click = () => {
        if (props.minute === true) {
            navigate("/proposal/edit/" + demandCode + "?" + props.type + "?minute=" + props.minuteCode);
        } else {
            navigate("/proposal/edit/" + demandCode + "?" + props.type);
        }
    }



    return (
        <div>
            <div className={"complement " + open} >
                <div className="display-flex-space-between header-table">

                    <p className="title">{t(props.type)}</p>

                    <div className="display-flex">
                        <span onClick={() => { click() }} className="material-symbols-outlined arrow-expend mr5">
                            edit
                        </span>

                        <span onClick={() => setOpen(!open)} className="material-symbols-outlined arrow-expend">
                            expand_more
                        </span>
                    </div>
                </div>

                <div className="display-flex">
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
                            </tr>

                            {expense.length > 0 || expense !== undefined ?
                                <>
                                    {
                                        expense.map((proposalExpense: any, index: any) => {
                                            if (proposalExpense.expenseType === props.type) {

                                                return (
                                                    <tr>
                                                        <Tooltip title={proposalExpense.expenseProfile} arrow>
                                                            <td>{proposalExpense.expenseProfile}</td>
                                                        </Tooltip>


                                                        {props.type !== "recurrent" ? (
                                                            <td>{proposalExpense.amountOfHours}h</td>
                                                        ) : (
                                                            <td>{proposalExpense.amountOfHours}</td>
                                                        )}

                                                        <td>{proposalExpense.hourValue}</td>

                                                        <td>{proposalExpense.totalValue}</td>

                                                        {/* <Tooltip title={proposalExpense.costCenter.costCenter} arrow>
                                                        <td>{proposalExpense.costCenter.costCenter}</td>
                                                    </Tooltip> */}
                                                    </tr>
                                                )
                                            }
                                        })
                                    }
                                </>
                                : null
                            }

                            <tr>
                                <td>Total:</td>

                                <td>{totalAmountOfHours}</td>

                                <td>{totalHourValue}</td>

                                <td>{totalValue}</td>

                            </tr>
                        </tbody>
                    </table>

                    <table className="costCenter-td">
                        <tbody>
                            <tr className="title-costCenter">
                                <td>{t("costCenter")}</td>
                            </tr>

                            <div className="p10">
                                {props.proposalExpense.expensesCostCenters !== undefined ?
                                    <>
                                        {props.proposalExpense.expensesCostCenters.map((costCenter: any, index: any) => {
                                            return (
                                                <Tooltip title={costCenter.costCenter.costCenter} arrow>
                                                    <div className="display-flex-center code">{costCenter.costCenter.costCenter} – {costCenter.percent}%

                                                    </div>
                                                </Tooltip>
                                            )
                                        })
                                        }
                                    </>
                                    : null
                                }
                            </div>
                        </tbody>
                    </table>
                </div>
            </div>

        </div >
    )
}