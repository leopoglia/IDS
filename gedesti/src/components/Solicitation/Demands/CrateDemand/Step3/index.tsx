import "./style.css"
import Header from "../../../../Fixed/Header"
import Nav from "../../../../Fixed/Nav"
import Title from "../../../../Fixed/Search/Title";
import ProgressBar from "../ProgressBar";
import ButtonAction from "../ButtonAction";

export default function CreateDemands3() {
    return (
        <div className="create-demands-3">
            <Header icon="folder_copy" title="create-demand" />
            <Nav />

            <div className="container">
                <div className="background-title">
                    <Title nav="Demandas > Criar Demanda" title="Criar Demanda" />

                    <ProgressBar atual="3" />
                </div>

                <div className="box">

                    <p>Anexos</p>

                    <div className="attachments">
                        <input type="file" id="file" />
                        <label htmlFor="file">
                            <span className="material-symbols-outlined">
                                upload_file
                            </span>

                            Enviar arquivo</label>
                    </div>

                </div>

                <div className="demands-footer">
                    <ButtonAction title="Voltar" click="voltar"></ButtonAction>
                    <ButtonAction title="Avançar" click="avancar"></ButtonAction>
                </div>
            </div>

        </div>
    );
}