import "./style.css"
import Header from "../../Fixed/Header"
import Nav from "../../Fixed/Nav"
import Title from "../../Fixed/Search/Title";


export default function CreateDemands1() {
    return (
        <div className="create-demands-1">
            <Header />
            <Nav />

            <div className="container">
                <div className="background-title">
                    <Title nav="Demandas > Criar Demanda" title="Criar Demanda" />

                    <div className="progress-bar">
                        <div className="line">
                            <div className="ellipse">1</div>
                            <div className="ellipse">2</div>
                            <div className="ellipse">3</div>
                        </div>
                    </div>
                </div>



                <div className="box">

                </div>

            </div>

        </div>
    );
}