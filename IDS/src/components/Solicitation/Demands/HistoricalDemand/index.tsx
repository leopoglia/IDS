import Title from "../../../Fixed/Search/Title";
import "./style.css";
import { t } from "i18next";
import Demand from "../../All/Cards/Card";
import { useEffect, useState } from "react";
import ServiceDemand from "../../../../services/demandService";
import ServiceProposal from "../../../../services/proposalService";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

export default function HistoricalDemand() {

    const { t } = useTranslation();
    const url: any = window.location.href.split("/")[5];
    const [demand, setDemand]: any = useState();
    const [activeVersionUpdate, setActiveVersionUpdate]: any = useState(true);
    const navigate = useNavigate();
    let proposalDemand = false;

    let version: any = null;

    ServiceProposal.findByDemandCode(url).then((response: any) => {
        if (response.length > 0) {
            proposalDemand = true;
        }
    })

    ServiceDemand.findById(url).then((response: any) => {
        version = response.demandVersion;
    })

    useEffect(() => {
        ServiceDemand.historical(url).then((response: any) => {
            setDemand(response);
        })
    }, [activeVersionUpdate])

    function viewDemand(demandCode: any, demandVersion: any) {
        window.location.href = `/demand/view/${demandCode}?${demandVersion}`;
    }

    console.log(demand);

    function setActiveVersion(demandCode: any, nextDemandVersion: any) {
        ServiceDemand.setActiveVersion(demandCode, nextDemandVersion).then((response: any) => {
            setActiveVersionUpdate(response);
            navigate(`/demand/view/${demandCode}?${nextDemandVersion}`);
        })
    }

    return (
        <div className="view-demand historical-demand">

            <div className="container">

                <div className="backgroud-title">
                    <Title nav={t("demandsViewDemandChangeHistory")} title="change-history" />
                </div>

                <div className="boxNoPadding">

                    <table>
                        <tbody>

                            <tr>
                                <td>{t("user")}</td>
                                {
                                    proposalDemand ? (
                                        <td className="table-restore-page">{t("returnVersion")}</td>
                                    ) : null
                                }
                                <td className="table-find-in-page">{t("view")}</td>
                                <td>{t("alterationDate")}</td>
                                <td>{t("alterationHour")}</td>
                                <td>{t("version")}</td>
                            </tr>


                            {demand?.map((val: any, index: any) => (
                                val.activeVersion === true ? (
                                    <tr key={index}>
                                        <td className="activeVersion">{val.requesterRegistration.workerName}</td>
                                        {
                                            proposalDemand ? (
                                                <td className="table-restore-page, activeVersion">
                                                    <span className="material-symbols-outlined">restore_page</span>
                                                </td>
                                            ) : null
                                        }
                                        <td className="table-find-in-page, activeVersion">
                                            <span className="material-symbols-outlined">find_in_page</span>
                                        </td>
                                        <td className="activeVersion">
                                            {val.demandDate}
                                        </td>
                                        <td className="activeVersion">
                                            {val.demandHour}
                                        </td>
                                        <td className="activeVersion">
                                            {val.demandVersion}.0
                                        </td>
                                    </tr>
                                ) : (
                                    <tr key={index}>
                                        <td>{val?.requesterRegistration.workerName}</td>
                                        {
                                            proposalDemand ? (
                                                <td className="table-restore-page">
                                                    <span className="material-symbols-outlined" onClick={() => { setActiveVersion(val.demandCode, val.demandVersion); }}>restore_page</span>
                                                </td>
                                            ) : (
                                                null
                                            )
                                        }
                                        <td className="table-find-in-page" onClick={() => viewDemand(val.demandCode, val.demandVersion)}>
                                            <span className="material-symbols-outlined">find_in_page</span>
                                        </td>
                                        <td>
                                            {val.demandDate}
                                        </td>
                                        <td>
                                            {val.demandHour}
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