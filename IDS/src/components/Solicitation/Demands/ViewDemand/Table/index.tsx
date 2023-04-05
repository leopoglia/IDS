import Tooltip from "@mui/material/Tooltip";
import { t } from "i18next";
import { useState } from "react";

export default function Table(props: any) {

    const [open, setOpen] = useState(false);

    return (
        <div className={"classification " + open} >
            <div className="display-flex-space-between">

                <p className="title">{t("classification")}</p>

                <span onClick={() => setOpen(!open)} className="material-symbols-outlined arrow-expend">
                    expand_more
                </span>
            </div>


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


                        {/* <Tooltip title={classification.classificationSize} arrow>
                            <td>{classification.classificationSize}</td>
                        </Tooltip>

                        <Tooltip title={classification.requesterBu.bu} arrow>
                            <td>{classification.requesterBu.bu}</td>
                        </Tooltip>

                        <td>
                            {classification.beneficiaryBu.map((bu: any, index: any) => {
                                return (
                                    <Tooltip title={bu.bu} key={index} arrow>
                                        <td className="buBenifitedTd">{bu.bu.split("–", 1)}</td>
                                    </Tooltip>
                                )
                            })
                            }
                        </td>

                        <Tooltip title={classification.itSection} arrow>
                            <td>{classification.itSection}</td>
                        </Tooltip> */}
                    </tr>
                </tbody>
            </table>
        </div>
    )
}