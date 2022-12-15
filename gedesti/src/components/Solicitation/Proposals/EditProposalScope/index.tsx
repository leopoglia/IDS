import Header from "../../../Fixed/Header";
import Nav from "../../../Fixed/Nav";
import Title from "../../../Fixed/Search/Title";
import { Link } from "react-router-dom";
import Editor from "./Editor"
import "./style.css"
import { useTranslation } from "react-i18next";


export default function EditProposalScope() {
  const { t } = useTranslation();


  return (
    <div className="edit-proposal-scope">
      <Header title="Escopo da Proposta" icon="edit" />
      <Nav />

      <div className="container">

        <div className="background-title">

          <Title title={t("proposalScope")} nav={t("proposalScopeProposal")} />

        </div>



        <Editor />


        <div className="demands-footer">
          <Link to="/proposal/demand">
            <button className="btn-secondary">{t("return")}</button>
          </Link>

          <Link to="/proposal/informations">
            <button className="btn-primary">{t("advance")}</button>
          </Link>
        </div>


      </div>

    </div>
  );

}