import "./Demandas.css"
import Header from "../Fixed/Header/Header"
import Nav from "../Fixed/Nav/Nav"
import Title from "../Fixed/Search/Title/Title";

export default function Demandas() {
    return (
        <div className="Demandas">
            <Header />
            <Nav />

            <div className="container">
                <Title nav="Demandas > Visualizar Demandas" title="Demandas" />
            </div>

        </div>
    );
}