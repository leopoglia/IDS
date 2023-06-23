import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Title from "../../../Fixed/Search/Title";
import Editor from "./Editor";
import "./style.css"

import notifyUtil from "../../../../utils/notifyUtil";
import ProgressBar from "../../Demands/CrateDemand/Others/ProgressBar";

export default function EditProposalScope() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const demandCode = parseInt(useParams().id || "null")

  const [content, setContent] = useState('');


  const nextStep = () => {
    if (content === "" || content === undefined) {
      notifyUtil.error(t("fillAllFields"))
    } else {

      localStorage.setItem('proposalScope', content);

      navigate('/proposal/informations/' + demandCode);
    }
  }

  return (
    <div className="create-demands-1 edit-proposal-scope">


      <div className="container">

        <div className="background-title">

          <Title title={t("proposalScope")} nav={t("proposalScopeProposal")} />
          <ProgressBar atual="2" proposal={true} />

        </div>

        <Editor setContent={setContent} />

        <div className="demands-footer">
          <Link to={"/proposal/demand/" + demandCode}>
            <button className="btn-secondary">{t("return")}</button>
          </Link>

          <button onClick={() => nextStep()} className="btn-primary">{t("advance")}</button>
        </div>

      </div>
    </div>
  );

}
