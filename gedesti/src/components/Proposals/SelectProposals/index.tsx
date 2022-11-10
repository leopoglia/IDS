import "./style.css"
import Header from "../../Fixed/Header"
import Nav from "../../Fixed/Nav"
import Search from "../../Fixed/Search";
import SelectProposal from "./SelectProposal";
import Footer from "../../Fixed/Footer";
import Title from "../../Fixed/Search/Title";

export default function Proposals() {
    return (
        <div className="demands">
            <Header icon="content_paste" title="Selecionar Propostas" />
            <Nav />

            <div className="container">
                <div className="backgroud-title">
                    <Title nav="Criar Proposta > Selecionar Propostas" title="Selecionar Propostas" />
                </div>

                <SelectProposal />

        

                <Footer />

            </div>


        </div>
    );
}