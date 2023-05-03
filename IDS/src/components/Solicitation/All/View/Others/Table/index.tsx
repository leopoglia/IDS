import Tooltip from "@mui/material/Tooltip";
import { t } from "i18next";
import { useNavigate, useParams } from "react-router";
import { useState } from "react";

export default function Table(props: any) {

    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const demandCode = useParams().id;


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
        navigate("/proposal/edit/" + demandCode + "?" + (props.title).toLowerCase());
    }


    return (
        <div className={"classification " + open} >
            <div className="display-flex-space-between">

                <p className="title">{t(props.title)}</p>

                <div className="flex">
                    <span onClick={() => { click() }} className="material-symbols-outlined arrow-expend mr5">
                        edit
                    </span>

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
                                    return (
                                        <Tooltip title={item} arrow>
                                            <td key={index}>{item}</td>
                                        </Tooltip>
                                    )
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
