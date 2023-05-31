import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ToastContainer } from 'react-toastify';

import Title from "../../../Fixed/Search/Title";
import Editor from "./Editor";
import "./style.css"

import notifyUtil from "../../../../utils/notifyUtil";

export default function EditProposalScope() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const demandCode = useParams().id;

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
    <div className="edit-proposal-scope">
    

      <div className="container">

        <div className="background-title">

          <Title title={t("proposalScope")} nav={t("proposalScopeProposal")} />

        </div>

        <Editor setContent={setContent} />

        <div className="demands-footer">
          <Link to={"/proposal/demand/" + demandCode}>
            <button className="btn-secondary">{t("return")}</button>
          </Link>

          <button onClick={() => nextStep()} className="btn-primary">{t("advance")}</button>
        </div>

      </div>
      <ToastContainer position="bottom-right" newestOnTop />

    </div>
  );

}
