import "./style.css"
import Header from "../../../../Fixed/Header"
import Nav from "../../../../Fixed/Nav"
import Title from "../../../../Fixed/Search/Title";
import ProgressBar from "../ProgressBar";
import ButtonAction from "../ButtonAction";
import { useTranslation } from "react-i18next";

export default function CreateDemands3() {

    const { t, i18n } = useTranslation();

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

                    <p>Extras</p>

                    <div className="frequency">
                        <label>Frequência de Uso</label>
                        <input type="text" />
                    </div>

                    <label>{t("attachments")}</label>

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