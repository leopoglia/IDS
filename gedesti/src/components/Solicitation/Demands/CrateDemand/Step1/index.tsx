import "./style.css"
import Header from "../../../../Fixed/Header"
import Nav from "../../../../Fixed/Nav"
import Title from "../../../../Fixed/Search/Title";
import ProgressBar from "../ProgressBar";
import Input from "../Input";
import TextArea from "../TextArea";
import ButtonAction from "../ButtonAction";
import { useTranslation } from "react-i18next";

export default function CreateDemands1() {

    const { t } = useTranslation();

    return (
        <div className="create-demands-1">
            <Header icon="folder_copy" title="createDemand" />
            <Nav />

            <div className="container">
                <div className="background-title">
                    <Title nav="Demandas > Criar Demanda" title="createDemand" />

                    <ProgressBar atual="1" />
                </div>



                <div className="box">
                    <p>{t("generalInformation")}</p>


                    <Input label="titleInput" required="*"></Input>

                    <TextArea label="currentSituation" required="*"></TextArea>

                    <TextArea label="proposal" required="*"></TextArea>

                    <Input label="costCenter" required="*"></Input>

                </div>

                <div className="demands-footer">
                    <ButtonAction title="Voltar" click="voltar"></ButtonAction>
                    <ButtonAction title="Avançar" click="avancar"></ButtonAction>

                </div>

            </div>

        </div>
    );
}