import "./style.css"
import Header from "../../Fixed/Header"
import Nav from "../../Fixed/Nav"
import Title from "../../Fixed/Search/Title";


export default function CreateDemands3() {
    return (
        <div className="create-demands-3">
            <Header />
            <Nav />

            <div className="container">
                <div className="background-title">
                    <Title nav="Demandas > Criar Demanda" title="Crira Demanda" />

                    <div className="progress-bar">

                    </div>
                </div>

                <div className="box">

                </div>

            </div>

        </div>
    );
}