import "./style.css"
import Header from "../Fixed/Header"
import Nav from "../Fixed/Nav"
import Search from "../Fixed/Search";
import Demanda from "./Demanda";

export default function Demandas() {
    return (
        <div className="Demandas">
            <Header />
            <Nav />

            <div className="container">
                <Search nav="Demandas > Visualizar Demandas" title="Demandas" />


                <Demanda />
            </div>

        </div>
    );
}