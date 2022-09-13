import "./style.css"
import Header from "../Fixed/Header"
import Nav from "../Fixed/Nav"
import Title from "../Fixed/Search/Title";
import ButtonTableList from "../Fixed/Search/ButtonTableList";
import Search from "../Fixed/Search";

export default function Demandas() {
    return (
        <div className="Demandas">
            <Header />
            <Nav />

            <div className="container">
                <Search nav="Demandas > Visualizar Demandas" title="Demandas" />
            </div>

        </div>
    );
}