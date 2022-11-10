import "./style.css"
import Header from "../Fixed/Header"
import Nav from "../Fixed/Nav"
import Search from "../Fixed/Search";
import Agenda from "./Agenda";
import Footer from "../Fixed/Footer";

export default function Agendas() {
    return (
        <div className="agendas">
            <Header icon="file_copy" title="Pautas" />
            <Nav />

            <div className="container">
                <Search nav="Pautas > Visualizar Pautas" title="Pautas" button="Criar Pauta" link="/agenda/select-proposals" />


                <Agenda />

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