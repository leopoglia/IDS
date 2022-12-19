import Header from "../../../Fixed/Header";
import Nav from "../../../Fixed/Nav";
import Title from "../../../Fixed/Search/Title";
import "./style.css";
import { t } from "i18next";

export default function HistoricalDemand() {
    return (
        <div className="historical-demand">

            <Header icon="folder_copy" title="historicalDemand" />

            <Nav />

            <div className="container">

                <div className="backgroud-title">
                    <Title nav="Demandas > Visualizar Demanda > Histórico de alterações" title="Histórico de alterações" />
                </div>

                <div className="box">

                    <table>
                        <tr>
                            <td>{t("user")}</td>
                            <td className="table-restore-page">{t("returnVersion")}</td>
                            <td className="table-find-in-page">{t("view")}</td>
                            <td>{t("alterationDate")}</td>
                            <td>{t("alterationHour")}</td>
                        </tr>

                        <div className="hr" />


                        <tr>
                            <td>Leonardo Heitor Poglia</td>
                            <td className="table-restore-page">
                                <span className="material-symbols-outlined">restore_page</span>
                            </td>
                            <td className="table-find-in-page">
                                <span className="material-symbols-outlined">find_in_page</span>
                            </td>
                            <td>
                                01/01/2021
                            </td>
                            <td>
                                15:40
                            </td>
                        </tr>

                        <div className="hr" />

                        <tr>
                            <td>Leonardo Heitor Poglia</td>
                            <td className="table-restore-page">
                                <span className="material-symbols-outlined">restore_page</span>
                            </td>
                            <td className="table-find-in-page">
                                <span className="material-symbols-outlined">find_in_page</span>
                            </td>
                            <td>
                                01/01/2021
                            </td>
                            <td>
                                15:40
                            </td>
                        </tr>

                        <div className="hr" />

                    </table>

                </div>
            </div>
        </div>
    );
}