import Title from "../../../Fixed/Search/Title";
import "./style.css";
import { t } from "i18next";
import Demand from "../../All/Cards/Card";
import { useEffect, useState } from "react";
import ServiceDemand from "../../../../services/demandService";

export default function HistoricalDemand() {

    const url: any = window.location.href.split("/")[5];
    const [demand, setDemand]: any = useState();

    useEffect(() => {
        ServiceDemand.historical(url).then((response: any) => {
            setDemand(response);
            console.log(response)
        })
    }, [])


    console.log(demand);

    return (
        <div className="view-demand historical-demand">

            <div className="container">

                <div className="backgroud-title">
                    <Title nav="Demandas > Visualizar Demanda > Histórico de alterações" title="Histórico de alterações" />
                </div>

                <div className="boxNoPadding">

                    <table>
                        <tbody>

                            <tr>
                                <td>{t("user")}</td>
                                <td className="table-restore-page">{t("returnVersion")}</td>
                                <td className="table-find-in-page">{t("view")}</td>
                                <td>{t("alterationDate")}</td>
                                <td>{t("alterationHour")}</td>
                                <td>{t("version")}</td>
                            </tr>

                             
                            {demand?.map((val: any, index: any) => (
                                val.activeVersion === true ?(
                                <tr key={index}>
                                    <td className="activeVersion">{val.requesterRegistration.workerName}</td>
                                    <td className="table-restore-page, activeVersion">
                                        <span className="material-symbols-outlined">restore_page</span>
                                    </td>
                                    <td className="table-find-in-page, activeVersion">
                                        <span className="material-symbols-outlined">find_in_page</span>
                                    </td>
                                    <td className="activeVersion">
                                        {val.demandDate}
                                    </td>
                                    <td className="activeVersion">
                                        {val.demandDate}
                                    </td>
                                    <td className="activeVersion">
                                        {val.demandVersion}.0
                                    </td>
                                </tr>
                                ):(
                                    <tr key={index}>
                                    <td>{val.requesterRegistration.workerName}</td>
                                    <td className="table-restore-page">
                                        <span className="material-symbols-outlined">restore_page</span>
                                    </td>
                                    <td className="table-find-in-page">
                                        <span className="material-symbols-outlined">find_in_page</span>
                                    </td>
                                    <td>
                                        {val.demandDate}
                                    </td>
                                    <td>
                                        {val.demandDate}
                                    </td>
                                    <td>
                                        {val.demandVersion}.0
                                    </td>
                                </tr>
                                )
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}