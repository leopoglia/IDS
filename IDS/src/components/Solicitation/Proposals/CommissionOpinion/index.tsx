import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Title from "../../../Fixed/Search/Title";
import "./style.css";


import ProposalService from "../../../../services/proposalService";

export default function CommissionOpinion() {

    const navigate = useNavigate();
    const proposalCode: any = parseInt(useParams().id || "null");
    const typeMinute: any = window.location.href.split("/")[4];
    const agendaCode = parseInt(window.location.href.split("?")[1]);

    const [commissionOpinion, setCommissionOpinion] = useState("");
    const [proposalStatus, setProposalStatus] = useState("");

    const { t } = useTranslation();

    async function addOpinion() {

        await ProposalService.addOpinion(proposalCode, proposalStatus, commissionOpinion, typeMinute).then((response: any) => {
            navigate("/agenda/view/" + agendaCode);
        }
        )
    }

    return (
        <div className="commission-opinion">



            <div className="container">

                <div className="background-title">

                    {typeMinute === "dg-opinion" ?
                        <Title title={t("dgOpinion")} nav={t("proposalDgOpinion")} /> :
                        <Title title={t("commissionOpinion")} nav={t("proposalComissionOpinion")} />
                    }

                </div>

                <div className="box">

                    <p>{t("commissionOpinion")}</p>

                    <div className="display-flex">
                        <div className="display-grid">
                            <label htmlFor="yes">{t("approve")}</label>
                            <input type="radio" id="yes" name="parecer" onChange={(e) => { typeMinute === "dg-opinion" ? setProposalStatus("ApprovedDG") : setProposalStatus("ApprovedComission") }} />
                        </div>

                        <div className="display-grid">

                            <label htmlFor="no">{t("fail")}</label>
                            <input type="radio" id="no" name="parecer" onChange={(e) => { typeMinute === "dg-opinion" ? setProposalStatus("RejectedDG") : setProposalStatus("RejectedComission") }} />
                        </div>
                    </div>


                    <p>{t("observations")}</p>

                    <textarea className="textarea" onChange={(e) => { setCommissionOpinion(e.target.value) }} />
                </div>

                <div className="display-flex-end">
                    <button className="btn-primary" onClick={addOpinion}>{t("save")}</button>
                </div>
            </div>
        </div>
    );
}