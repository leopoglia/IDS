import Header from "../../../Fixed/Header";
import Nav from "../../../Fixed/Nav";
import Title from "../../../Fixed/Search/Title";
import { Link } from "react-router-dom";
import "./style.css";
import { useTranslation } from "react-i18next";
import ProposalService from "../../../../services/proposalService";
import { useEffect, useState } from "react";

export default function CommissionOpinion() {

    const proposalCode = parseInt(window.location.href.split("/")[5]);

    const [commissionOpinion, setCommissionOpinion] = useState("");
    const [proposalStatus, setProposalStatus] = useState("");

    const { t } = useTranslation();

    function addOpinion(){
        ProposalService.addOpinion(proposalCode, proposalStatus, commissionOpinion);
    }

    return (
        <div className="commission-opinion">

            <Header />

            <Nav />

            <div className="container">

                <div className="background-title">

                    <Title title={t("commissionOpinion")} nav={t("proposalComissionOpinion")} />


                </div>

                <div className="box">

                    <p>{t("commissionOpinion")}</p>

                    <div className="display-flex">
                        <div className="display-grid">
                            <label htmlFor="yes">{t("approve")}</label>
                            <input type="radio" id="yes" name="parecer" onChange={(e) => { setProposalStatus("Approved") }} />
                        </div>

                        <div className="display-grid">

                            <label htmlFor="no">{t("fail")}</label>
                            <input type="radio" id="no" name="parecer" onChange={(e) => { setProposalStatus("Repproved") }} />
                        </div>
                    </div>


                    <p>{t("observations")}</p>

                    <textarea className="textarea" onChange={(e) => { setCommissionOpinion(e.target.value) }} />
                </div>

                <div className="display-flex-end">
                    <Link to="/agendas">
                        <button className="btn-primary" onClick={addOpinion}>{t("save")}</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}