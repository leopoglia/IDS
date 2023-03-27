
import { useState } from "react";
import Header from "../../../Fixed/Header";
import Nav from "../../../Fixed/Nav";
import Title from "../../../Fixed/Search/Title";
import Editor from "./Editor";
import "./style.css"
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function EditProposalScope() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const demandCode = parseInt(window.location.href.split("/")[5]);

  const [content, setContent] = useState('');


  const nextStep = () => {
    if (content === "" || content === undefined) {
      notify()
    } else {

      localStorage.setItem('proposalScope', content);

      navigate('/proposal/informations/' + demandCode);
    }
  }

  return (
    <div className="edit-proposal-scope">
      <Header/>
      <Nav />

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

// Notificação de erro ao preencher campo obrigatório
const notify = () => {
  toast.error('Preencha todos os campos!', {
    position: "bottom-right",
    autoClose: 4000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};