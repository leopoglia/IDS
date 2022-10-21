import "./style.css"
import Header from "../../Fixed/Header"
import Nav from "../../Fixed/Nav"
import Title from "../../Fixed/Search/Title";
import ProgressBar from "../ProgressBar";
import ButtonAction from "../ButtonAction";

export default function CreateDemands3() {
    return (
        <div className="create-demands-3">
            <Header icon="folder_copy" title="Criar Demanda" />
            <Nav />

            <div className="container">
                <div className="background-title">
                    <Title nav="Demandas > Criar Demanda" title="Criar Demanda" />

                    <ProgressBar atual="3" />
                </div>

                <div className="box">

                    <p>Anexos</p>

                    <input type="file" />

                </div>

                <div className="demands-footer">
                    <ButtonAction title="Voltar"></ButtonAction>
                    <ButtonAction title="Avançar"></ButtonAction>
                </div>
            </div>

        </div>
    );
}