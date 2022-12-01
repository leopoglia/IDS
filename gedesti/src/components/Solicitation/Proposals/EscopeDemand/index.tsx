import { t } from "i18next";
import { Link } from "react-router-dom";
import Header from "../../../Fixed/Header";
import Nav from "../../../Fixed/Nav";
import Title from "../../../Fixed/Search/Title";
import ButtonAction from "../../Demands/CrateDemand/ButtonAction";
import CheckBox from "../../Demands/CrateDemand/CheckBox";
import Input from "../../Demands/CrateDemand/Input";
import ProgressBar from "../../Demands/CrateDemand/ProgressBar";
import SelectCoin from "../../Demands/CrateDemand/SelectCoin";
import TextArea from "../../Demands/CrateDemand/TextArea";
import "./style.css"


export default function EscopeDemand() {
    return (
        <div className="create-demands-1">
            <Header icon="folder_copy" title="create-demand" />
            <Nav />

            <div className="container">
                <div className="background-title">
                    <Title nav="Proposta > Editar Demanda" title="proposal" />

                </div>

                <div className="box">
                    <p>Informações Gerais</p>


                    <Input label="Titulo" required="*" />

                    <TextArea label="Problema a ser resolvido (Situação atual)" required="*" />

                    <TextArea label="Proposta" required="*" />

                    <Input label="Centro de Custos" required="*"></Input>

                </div>

                <div className="box">
                    <p>{t("benefitReal")}</p>

                    <div className="flex">
                        <Input label="Valor Mensal" required="*" />
                        <SelectCoin />
                    </div>

                    <Input label="Descrição" required=""></Input>

                </div>

                <div className="box">
                    <p>{t("benefitPotential")}</p>

                    <div className="flex-grid">

                        <div className="flex">
                            <Input label="Valor Mensal" required="*" />
                            <SelectCoin />
                        </div>

                        <div className="flex">
                            <Input label="Descrição" required=""></Input>

                            <div className="input-checkbox">
                                <label>Obrigação Legal</label>
                                <div className="checkbox">
                                    <CheckBox />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="box">
                    <p>{t("benefitQualitative")}</p>

                    <div className="flex">
                        <Input label="Valor Mensal" required="*" />
                        <SelectCoin />
                    </div>

                    <div className="flex">
                        <Input label="Descrição" required=""></Input>

                        <div className="input-checkbox">
                            <label className="requirements">Requisitos de controles internos</label>
                            <div className="checkbox">
                                <CheckBox />
                            </div>
                        </div>
                    </div>

                </div>

                <div className="display-flex-end">
                    <Link to="/proposal/edit-scope">
                        <button className="btn-primary">Avançar</button>
                    </Link>
                </div>

            </div>

        </div>
    );
}