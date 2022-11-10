import "./style.css"
import Header from "../Fixed/Header"
import Nav from "../Fixed/Nav"
import Search from "../Fixed/Search";
import Proposal from "./Proposal";
import Footer from "../Fixed/Footer";

export default function Proposals() {
    return (
        <div className="proposals">
            <Header icon="content_paste" title="Propostas" />
            <Nav />

            <div className="container">
                <Search nav="Propostas > Visualizar Propostas" title="Propostas" button="Criar Proposta" link="/proposal/create" />


                <Proposal />

                <div className="navigator">
                    <div className="current">1</div>
                    <div>2</div>
                    <div>3</div>
                    <div>4</div>
                    <div>{">"}</div>

                </div>

                <Footer />

            </div>


        </div>
    );
}