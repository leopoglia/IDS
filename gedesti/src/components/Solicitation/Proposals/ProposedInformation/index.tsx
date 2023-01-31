import Header from "../../../Fixed/Header";
import Nav from "../../../Fixed/Nav";
import Footer from "../../../Fixed/Footer";
import Title from "../../../Fixed/Search/Title";
import SelectCostExecution from "./SelectCostExecution";
import { Link } from "react-router-dom";
import "./style.css";
import { useTranslation } from "react-i18next";
import { useState } from "react";


export default function ProposedInformation() {
    const { t } = useTranslation();

    const [respnosibleAnalyst, setResponsibleAnalyst] = useState('');
    const [responsibleArea, setResponsibleArea] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [fileAttachment, setFileAttachment]: any = useState();

    localStorage.setItem('responsibleAnalyst', respnosibleAnalyst);
    localStorage.setItem('responsibleArea', responsibleArea);
    localStorage.setItem('start', start);
    localStorage.setItem('end', end);
    localStorage.setItem('fileAttachment', fileAttachment);

    const handleFileSelected = (e: any): void => {
        const files = Array.from(e.target.files)
        setFileAttachment(files[0])
    }


    console.log("responsible: " + respnosibleAnalyst, "area:" + responsibleArea, "start:" + start, "end: " + end, "file: " + fileAttachment);

    return (
        <div className="execution-costs">

            <Header title={t("responsiblesForTheProject")} icon="payments" />

            <Nav />

            <div className="container">


                <div className="background-title">
                    <Title title={t("responsiblesForTheProject")} nav={t("demandResponsibleForTheProject")} />
                </div>

                <div className="box">


                    <div className="display-flex">
                        <p>{t("responsiblesForTheProject")}</p>
                    </div>


                    <div className="display-flex-grid">
                        <div className="one">
                            <label>{t("responsibleBussiness")} *</label>
                            <input type="text" onChange={(e) => {setResponsibleAnalyst(e.target.value)}} />
                        </div>

                        <div className="display-flex">
                            <div>
                                <label>{t("responsibleArea")}</label>
                                <input type="text" onChange={(e) => {setResponsibleArea(e.target.value)}} />
                            </div>

                            {/* addCostCenter(costCenter); handleChange(costCenter, 'costCenter'); */}
                            <div className="btn-primary w45" onClick={() => { }}>
                                <span className="material-symbols-outlined">add</span>
                            </div>
                        </div>
                    </div>

                    <div className="display-flex-grid">
                        <div className="one">
                            <label>{t("start")} *</label>
                            <input type="date" onChange={(e) => {setStart(e.target.value)}} />
                        </div>

                        <div>
                            <label>{t("end")} *</label>
                            <input type="date" onChange={(e) => {setEnd(e.target.value)}} />
                        </div>
                    </div>

                    <div className="display-btn-anexo">
                        <label>{t("attachment")}</label>
                        <div className="attachments">
                            <input type="file" id="file" onChange={handleFileSelected} />
                            <label htmlFor="file">
                                <span className="material-symbols-outlined">
                                    upload_file
                                </span>

                                {t("sendAttachment")}</label>
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