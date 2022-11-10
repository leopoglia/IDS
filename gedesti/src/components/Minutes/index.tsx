import "./style.css"
import Header from "../Fixed/Header"
import Nav from "../Fixed/Nav"
import Search from "../Fixed/Search";
import Minute from "./Minute";
import Footer from "../Fixed/Footer";

export default function Minutes() {
    return (
        <div className="minutes">
            <Header icon="description" title="Atas" />
            <Nav />

            <div className="container">
                <Search nav="Atas > Visualizar Atas" title="Atas" button="Criar Ata" link="/minutes/create" />


                <Minute />

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