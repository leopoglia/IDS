import "./style.css"
import Header from "../Fixed/Header"
import Nav from "../Fixed/Nav"
import Search from "../Fixed/Search";
import Demand from "./Demand";
import Footer from "../Fixed/Footer";

export default function Demands() {
    return (
        <div className="demands">
            <Header icon="folder_copy" title="Demandas" />
            <Nav />

            <div className="container">
                <Search nav="Demandas > Visualizar Demandas" title="Demandas" />


                <Demand />

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