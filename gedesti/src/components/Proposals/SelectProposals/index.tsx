import "./style.css"
import { Link } from "react-router-dom";
import Header from "../../Fixed/Header"
import Nav from "../../Fixed/Nav"
import SelectProposal from "./SelectProposal";
import Footer from "../../Fixed/Footer";
import Title from "../../Fixed/Search/Title";

export default function Proposals() {
    return (
        <div className="proposals">
            <Header icon="content_paste" title="Selecionar Propostas" />
            <Nav />

            <div className="container">
                <div className="backgroud-title">
                    <Title nav="Criar Proposta > Selecionar Propostas" title="Selecionar Propostas" />
                </div>

                <SelectProposal />

                <div className="display-flex-end">
                    <Link to="/agenda/create-agenda">
                        <button className="btn-primary">Adicionar</button>
                    </Link>

                </div>

                <Footer />

            </div>


        </div>
    );
}