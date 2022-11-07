import "./style.css"
import Header from "../../Fixed/Header"
import Nav from "../../Fixed/Nav"
import Title from "../../Fixed/Search/Title";
import ProgressBar from "../ProgressBar";
import Input from "../Input";
import ButtonAction from "../ButtonAction";
import SelectCoin from "../SelectCoin";
import CheckBox from "../CheckBox";

export default function CreateDemands2() {
    return (
        <div className="create-demands-2">
            <Header icon="folder_copy" title="Criar Demanda" />
            <Nav />

            <div className="container">
                <div className="background-title">
                    <Title nav="Demandas > Criar Demanda" title="Criar Demanda" />

                    <ProgressBar atual="2" />
                </div>

                <div className="box">
                    <p>Beneficio Real</p>

                    <div className="flex">
                        <Input label="Valor Mensal" required="*" />
                        <SelectCoin />
                        <Input label="Descrição" required=""></Input>
                    </div>
                </div>

                <div className="box">
                    <p>Beneficio Potêncial</p>

                    <div className="flex">

                        <Input label="Valor Mensal" required="*" />
                        <SelectCoin />
                        <Input label="Descrição" required=""></Input>


                        <div className="input-checkbox">
                            <label>Obrigação Legal</label>
                            <div className="checkbox">
                                <CheckBox />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="box">
                    <p>Beneficio Qualitativo</p>

                    <div className="flex">
                        <Input label="Valor Mensal" required="*" />
                        <SelectCoin />
                        <Input label="Descrição" required=""></Input>

                        <div className="input-checkbox">
                            <label className="requirements">Requisitos de controles internos</label>
                            <div className="checkbox">
                                <CheckBox />
                            </div>
                        </div>
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