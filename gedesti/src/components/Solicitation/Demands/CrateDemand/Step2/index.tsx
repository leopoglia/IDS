import "./style.css"
import "../Input/style.css"
import Header from "../../../../Fixed/Header"
import Nav from "../../../../Fixed/Nav"
import Title from "../../../../Fixed/Search/Title";
import ProgressBar from "../ProgressBar";
import Input from "../Input";
import ButtonAction from "../ButtonAction";
import SelectCoin from "../SelectCoin";
import CheckBox from "../CheckBox";
import { useTranslation } from "react-i18next";
import { useState } from 'react';
import BenefitServices from "../../../../../services/realBenefitService";
import QualitativeServices from "../../../../../services/qualitativeBenefitService";
import PotentialServices from "../../../../../services/potentialBenefitService";

export default function CreateDemands2() {

    const { t } = useTranslation();

    const [realMonthlyValue, setRealMonthlyValue] = useState("");
    const [realBenefitDescription, setrealBenefitDescription] = useState("");
    const [realCurrency, setrealCurrency] = useState("");

    const [potentialMonthlyValue, setPotentialMonthlyValue] = useState("");
    const [legalObrigation, setLegalObrigation] = useState("");
    const [potentialCurrency, setPotentialCurrency] = useState("");

    const [frequencyOfUse, setFrequencyOfUse] = useState("");
    const [interalControlsRequirements, setInteralControlsRequirements] = useState("");

    async function cadastrarBeneficios() {
        await BenefitServices.save(Number.parseFloat(realMonthlyValue), realBenefitDescription, "real");
        await PotentialServices.save(Number.parseFloat(potentialMonthlyValue), true, "real");
        await QualitativeServices.save(frequencyOfUse, true);
    }

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
                        {/* <Input label="monthlyValue" required="*" /> */}
                        <div className="input">
                            <label>{t("monthlyValue")} *</label>
                            <input type="text" onChange={(e) => { setRealMonthlyValue(e.target.value) }} />
                        </div>
                        <SelectCoin />
                    </div>

                    {/* <Input label="description" required=""></Input> */}
                    <div className="input">
                        <label>{t("description")}</label>
                        <input onChange={(e) => { setrealBenefitDescription(e.target.value)}} type="text" />
                    </div>

                </div>

                <div className="box">
                    <p>{t("benefitPotential")}</p>

                    <div className="flex-grid">

                        <div className="flex">
                            {/* <Input label="monthlyValue" required="*" /> */}
                            <div className="input">
                                <label>{t("monthlyValue")} *</label>
                                <input type="text" onChange={(e) => { setPotentialMonthlyValue(e.target.value) }} />
                            </div>
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
                        {/* <Input label="monthlyValue" required="*" /> */}
                        <div className="input">
                            <label>{t("Frequency Of Use")} </label>
                            <input type="text" onChange={(e) => { setFrequencyOfUse(e.target.value) }} />
                        </div>
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
                    <button onClick={() => { cadastrarBeneficios() }}>
                        <ButtonAction title="Avançar" click="avancar"></ButtonAction>
                    </button>
                </div>


            </div>

        </div>
    );
}