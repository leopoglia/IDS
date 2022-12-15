import Header from "../../../Fixed/Header";
import Nav from "../../../Fixed/Nav";
import Footer from "../../../Fixed/Footer";
import Title from "../../../Fixed/Search/Title";
import SelectCostExecution from "./SelectCostExecution";
import { Link } from "react-router-dom";
import "./style.css";
import { useTranslation } from "react-i18next";


export default function ProposedInformation() {
    const { t } = useTranslation();


    return (
        <div className="execution-costs">

            <Header title={t("executionCosts")} icon="payments" />

            <Nav />

            <div className="container">


                <div className="background-title">
                    <Title title={t("executionCosts")} nav={t("demandExecutionCosts")} />
                </div>

                <div className="box">


                    <div className="display-flex">
                        <p>{t("executionCostsProject")}</p>
                    </div>


                    <div className="display-flex-grid">
                        <div className="one">
                            <label>{t("responsibleBussiness")} *</label>
                            <input type="text" />
                        </div>

                        <div>
                            <label>Área do responsável</label>
                            <input type="text" />
                        </div>
                    </div>

                    <div className="display-flex-grid">
                        <div className="one">
                            <label>Início *</label>
                            <input type="date" />
                        </div>

                        <div>
                            <label>{t("end")} *</label>
                            <input type="date" />
                        </div>
                    </div>

                    <div className="display-btn-anexo">
                        <label>Anexo</label>
                        <div className="attachments">
                            <input type="file" id="file" />
                            <label htmlFor="file">
                                <span className="material-symbols-outlined">
                                    upload_file
                                </span>

                                Enviar arquivo</label>
                        </div>
                    </div>
                </div>

                <div className="demands-footer">
                    <Link to="/proposal/edit-scope">
                        <button className="btn-secondary">{t("return")}</button>
                    </Link>
                    <Link to="/proposal/execution-costs">
                        <button className="btn-primary">{t("advance")}</button>
                    </Link>
                </div>
            </div>

        </div>
    );
}