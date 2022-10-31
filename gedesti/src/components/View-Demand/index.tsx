import "./style.css"
import Header from "../Fixed/Header"
import Nav from "../Fixed/Nav"
import Title from "../Fixed/Search/Title";

export default function ViewDemand() {
    return (
        <div className="view-demand">

            <Header icon="folder_copy" title="Visualizar Demanda" />

            <Nav />

            <div className="container">

                <div className="background-title">

                    <Title nav="Demandas > Visualizar Demanda" title="Visualizar Demanda" />

                </div>

                <div className="box">

                    <p>Informações Gerais</p>

                </div>

            </div>


        </div>
    );
}