import "./style.css"
import Header from "../Fixed/Header"
import Nav from "../Fixed/Nav"
import Search from "../Fixed/Search";
import Demanda from "./Demanda";

export default function Demandas() {
    return (
        <div className="demandas">
            <Header />
            <Nav />

            <div className="container">
                <Search nav="Demandas > Visualizar Demandas" title="Demandas" />


                <Demanda />
                <Demanda />
                <Demanda />
                <Demanda />



                <div className="navigator">
                    <div className="current">1</div>
                    <div>2</div>
                    <div>3</div>
                    <div>4</div>
                    <div>{">"}</div>

                </div>
            </div>



        </div>
    );
}