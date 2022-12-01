import "./style.css"
import Header from "../../../../Fixed/Header"
import Nav from "../../../../Fixed/Nav"
import Title from "../../../../Fixed/Search/Title";
import ProgressBar from "../ProgressBar";
import Input from "../Input";
import ButtonAction from "../ButtonAction";
import SelectCoin from "../SelectCoin";
import CheckBox from "../CheckBox";
import { useTranslation } from "react-i18next";

export default function CreateDemands2() {

    const { t, i18n } = useTranslation();

    return (
        <div className="create-demands-2">
            <Header icon="folder_copy" title="createDemand" />
            <Nav />

            <div className="container">
                <div className="background-title">
                    <Title nav="Demandas > Criar Demanda" title="createDemand" />

                    <ProgressBar atual="2" />
                </div>

                <div className="box">
                    <p>{t("benefitReal")}</p>

                    <div className="flex">
                        <Input label="monthlyValue" required="*" />
                        <SelectCoin />
                    </div>

                    <Input label="description" required=""></Input>

                </div>

                <div className="box">
                    <p>{t("benefitPotential")}</p>

                    <div className="flex-grid">

                        <div className="flex">
                            <Input label="monthlyValue" required="*" />
                            <SelectCoin />
                        </div>

                        <div className="flex">
                            <Input label="description" required=""></Input>

                            <div className="input-checkbox">
                                <label>{t("legalObligation")}</label>
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
                        <Input label="monthlyValue" required="*" />
                        <SelectCoin />
                    </div>

                    <div className="flex">
                        <Input label="description" required=""></Input>

                        <div className="input-checkbox">
                            <label className="requirements">{t("internalControlRequirements")}</label>
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