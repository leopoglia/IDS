import "./style.css"
import Header from "../../Fixed/Header"
import Nav from "../../Fixed/Nav"
import Title from "../../Fixed/Search/Title";
import ProgressBar from "../ProgressBar";
import Input from "../Input";
import TextArea from "../TextArea";
import ButtonAction from "../ButtonAction";

export default function CreateDemands1() {
    return (
        <div className="create-demands-1">
            <Header icon="folder_copy" title="Criar Demanda" />
            <Nav />

            <div className="container">
                <div className="background-title">
                    <Title nav="Demandas > Criar Demanda" title="Criar Demanda" />

                    <ProgressBar atual="1" />
                </div>



                <div className="box">
                    <p>Informações Gerais</p>


                    <Input label="Titulo" required="*"></Input>

                    <TextArea label="Problema a ser resolvido (Situação atual)" required="*"></TextArea>

                    <TextArea label="Proposta" required="*"></TextArea>

                    <Input label="Centro de Custos" required="*"></Input>

                </div>

                <div className="demands-footer">
                    <ButtonAction title="Voltar" click="voltar"></ButtonAction>
                    <ButtonAction title="Avançar" click="avancar"></ButtonAction>

                </div>

            </div>

        </div>
    );
}