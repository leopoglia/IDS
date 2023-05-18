import Tooltip from "@mui/material/Tooltip";
import { t } from "i18next";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Table(props: any) {

    const [open, setOpen] = useState(false);
    const url = window.location.href.split("/")[3];
    const navigate = useNavigate();

    useEffect(() => {

        console.log(url)

        console.log(props.id)
    }, [])


    // Função para criar tabela (tr)
    const tr = (dataOne: any, dataTwo: any, index: any) => {
        return (
            <tr key={index}>
                <td className="w40">{t(dataOne)}</td>
                <td>{t(dataTwo)}</td>
            </tr>
        )
    }

    const click = () => {

        if (props.title === "classification") {
            navigate("/demand/rank/" + props.demandCode + "?" + props.proposalCode);

        } else {
            navigate("/proposal/edit/" + props.demandCode + "?" + props.proposalCode + "?" + props.title.toLowerCase());

        }

    }


    return (
        <div className={"classification " + open} >
            <div className="display-flex-space-between header-table">

                <p className="title">{t(props.title)}</p>

                <div className="display-flex edit-expand">
                    {url !== "demand" ?
                        <span onClick={() => { click() }} className="material-symbols-outlined arrow-expend mr5">
                            edit
                        </span>
                        : null}

                    <span onClick={() => setOpen(!open)} className="material-symbols-outlined arrow-expend">
                        expand_more
                    </span>
                </div>
            </div>


            {(props.title !== "costCenter") ?
                (
                    <table>
                        <tbody>
                            <tr>
                                {props.headers.map((item: any, index: any) => {
                                    return (
                                        <td key={index}>{t(item)}</td>
                                    )
                                })}
                            </tr>


                            <tr>
                                {props.items.map((item: any, index: any) => {
                                    if (item.length > 30) {
                                        if (item.includes("http://") || item.includes("https://")) {
                                            return (
                                                <Tooltip title={item} arrow>
                                                    <td className="td-left" key={index}>
                                                        <Link to={item}>
                                                            <span>{item}</span>
                                                        </Link>
                                                    </td>
                                                </Tooltip>
                                            )
                                        } else {
                                            return (
                                                <Tooltip title={item} arrow>
                                                    <td className="td-left" key={index}>
                                                        <span>{item}</span>
                                                    </td>
                                                </Tooltip>
                                            )
                                        }
                                    } else {
                                        if (item.includes("http://") || item.includes("https://")) {
                                            return (
                                                <td key={index}>
                                                    <Link to={item}>
                                                        <span>{item}</span>
                                                    </Link>
                                                </td>
                                            )
                                        } else {
                                            return (
                                                <td key={index}>{item}</td>
                                            )
                                        }
                                    }

                                })}
                            </tr>
                        </tbody>
                    </table>
                ) : (
                    <table>
                        <tbody>
                            {tr("costCenter", "nameCostCenter", "index")}
                            {
                                props.items.map((item: any, index: any) => {
                                    return (
                                        tr(item.costCenterCode, item.costCenter, index)
                                    )
                                }
                                )
                            }
                        </tbody>
                    </table>
                )
            }
        </div>
    )
}
