import "./style.css"
import Header from "../../Fixed/Header"
import Nav from "../../Fixed/Nav"
import Title from "../../Fixed/Search/Title";
import ProgressBar from "../ProgressBar";

export default function CreateDemands2() {
    return (
        <div className="create-demands-2">
            <Header />
            <Nav />

            <div className="container">
                <div className="background-title">
                    <Title nav="Demandas > Criar Demanda" title="Criar Demanda" />

                    <ProgressBar atual="2" />
                </div>

                <div className="box">

                </div>

            </div>

        </div>
    );
}