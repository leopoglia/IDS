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
    const demandCode = useParams().id;

    useEffect(() => {
        let totalAmountOfHoursLet = 0;
        let totalHourValueLet = 0;
        let totalValueLet = 0;

        props.proposalExpense.forEach((element: any) => {

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

    }, [])

    const click = () => {
        navigate("/proposal/edit/" + demandCode + "?" + props.type);
    }



    return (
        <div>
            <div className={"complement " + open} >
                <div className="display-flex-space-between">

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


                                        {props.type !== "recurrent" ? (
                                            <td>{proposalExpense.amountOfHours}h</td>
                                        ) : (
                                            <td>{proposalExpense.amountOfHours}</td>
                                        )}

                                        <td>{proposalExpense.hourValue}</td>

                                        <td>{proposalExpense.totalValue}</td>

                                        <Tooltip title={proposalExpense.costCenter.costCenter} arrow>
                                            <td>{proposalExpense.costCenter.costCenter}</td>
                                        </Tooltip>
                                    </tr>
                                )
                            }
                        })
                        }

                        <tr>
                            <td>Total:</td>

                            <td>{totalAmountOfHours}</td>

                            <td>{totalHourValue}</td>

                            <td>{totalValue}</td>

                            <td></td>

                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    )
}