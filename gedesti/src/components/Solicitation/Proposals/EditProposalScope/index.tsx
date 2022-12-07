import Header from "../../../Fixed/Header";
import Nav from "../../../Fixed/Nav";
import Title from "../../../Fixed/Search/Title";
import { Link } from "react-router-dom";
import Editor from "./Editor"
import "./style.css"

export default function EditProposalScope() {
  return (
    <div className="edit-proposal-scope">
      <Header title="Escopo da Proposta" icon="edit" />
      <Nav />

      <div className="container">

        <div className="background-title">

          <Title title="Escopo da Proposta" nav="Proposals > Escopo da Proposta" />

        </div>



        <Editor />


        <div className="demands-footer">
          <Link to="/proposal/demand">
            <button className="btn-secondary">Voltar</button>
          </Link>

          <Link to="/proposal/informations">
            <button className="btn-primary">Avançar</button>
          </Link>
        </div>


      </div>

    </div>
  );

}