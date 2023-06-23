import { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';

import Title from "../../../../Fixed/Search/Title";
import ProgressBar from "../Others/ProgressBar";
import ButtonAction from "../Others/ButtonAction";
import SelectCoin from "../Others/SelectCoin";
import RealServices from "../../../../../services/realBenefitService";
import QualitativeServices from "../../../../../services/qualitativeBenefitService";
import PotentialServices from "../../../../../services/potentialBenefitService";
import Editor from "../../../Proposals/EditProposalScope/Editor";
import Label from "../Others/Label/label";
import "../Others/Input/style.css"
import notifyUtil from "../../../../../utils/notifyUtil";
import "./style.css"
import Input from '../Others/Input';
import { Tooltip } from '@mui/material';

export default function CreateDemands2() {

    const { t } = useTranslation();
    const navigate = useNavigate();

    const [realMonthlyValue, setRealMonthlyValue] = useState("");
    const [realBenefitDescription, setrealBenefitDescription] = useState("");
    const [realCurrency, setrealCurrency] = useState("");

    const [potentialMonthlyValue, setPotentialMonthlyValue] = useState("");
    const [potentialBenefitDescription, setPotentialBenefitDescription] = useState("");
    const [legalObrigation, setLegalObrigation] = useState(false);
    const [potentialCurrency, setPotentialCurrency] = useState("");

    const [qualitativeBenefitDescription, setQualitativeBenefitDescription] = useState("");
    const [frequencyOfUse, setFrequencyOfUse] = useState("");
    const [interalControlsRequirements, setInteralControlsRequirements] = useState(false);

    useEffect(() => {


        let realBenefits = JSON.parse(localStorage.getItem("realBenefits") || "{}");
        setRealMonthlyValue(realBenefits.realMonthlyValue);
        setPotentialCurrency("R$");

        setrealBenefitDescription(realBenefits.realBenefitDescription);
        setrealCurrency(realBenefits.realCurrency);

        let potentialBenefits = JSON.parse(localStorage.getItem("potentialBenefits") || "{}");
        setPotentialMonthlyValue(potentialBenefits.potentialMonthlyValue);
        setPotentialBenefitDescription(potentialBenefits.potentialBenefitDescription);
        setLegalObrigation(potentialBenefits.legalObrigation);

        if (potentialBenefits.potentialCurrency !== undefined) {
            setPotentialCurrency(potentialBenefits.potentialCurrency);
        } else {
            setPotentialCurrency("R$");
        }

        let qualitativeBenefits = JSON.parse(localStorage.getItem("qualitativeBenefits") || "{}");
        setQualitativeBenefitDescription(qualitativeBenefits.qualitativeBenefitDescription);
        setFrequencyOfUse(qualitativeBenefits.frequencyOfUse);
        setInteralControlsRequirements(qualitativeBenefits.interalControlsRequirements);

    }, [])


    async function addBenefits() {
        let realCurrencyFinal = realCurrency;
        let potentialCurrencyFinal = potentialCurrency;

        if (realCurrency === undefined || realCurrency === "") {
            realCurrencyFinal = "R$";
        }

        if (potentialCurrency === undefined || potentialCurrency === "") {
            potentialCurrencyFinal = "R$";
        }



        let realBenefits: any = await RealServices.save(Number.parseFloat(realMonthlyValue), realBenefitDescription, realCurrencyFinal);
        let potentialBenefits: any = await PotentialServices.save(Number.parseFloat(potentialMonthlyValue), potentialBenefitDescription, legalObrigation, potentialCurrencyFinal);
        let qualitativeBenefits: any = await QualitativeServices.save(frequencyOfUse, qualitativeBenefitDescription, interalControlsRequirements);

        localStorage.setItem("realBenefits", JSON.stringify(realBenefits));
        localStorage.setItem("potentialBenefits", JSON.stringify(potentialBenefits));
        localStorage.setItem("qualitativeBenefits", JSON.stringify(qualitativeBenefits));

    }


    const nextStep = () => {
        localStorage.getItem("demand");
        let demand = JSON.parse(localStorage.getItem("demand") || "{}");

        addBenefits();
        if (realMonthlyValue === undefined || realBenefitDescription === undefined || potentialMonthlyValue === undefined || potentialBenefitDescription === undefined || qualitativeBenefitDescription === undefined ||
            realMonthlyValue === "" || realBenefitDescription === "" || potentialMonthlyValue === "" || potentialBenefitDescription === "" || qualitativeBenefitDescription === "") {
            notifyUtil.error(t("fillAllFields"))
        } else {
            navigate('/demand/create/3');
        }
    }

    return (
        <div className="create-demands-2">


            <div className="container">
                <div className="background-title">
                    <Title nav="demandsCreateDemand" title="createDemand" />

                    <ProgressBar atual="2" />
                </div>

                <div className="box">
                    <div className="display-flex">
                        <p>{t("benefitReal")}</p>

                        <Tooltip title={t("decriptionRealBenefit")} placement="right" arrow>
                            <p className="obs">
                                <span className='material-symbols-outlined info-benefit'>
                                    info
                                </span>
                            </p>
                        </Tooltip>
                    </div>

                    <div className="flex">
                        <div className="display-grid w100">

                            <Input type="number" label="monthlyValue" setValue={setRealMonthlyValue} value={realMonthlyValue} required="true" />

                        </div>
                        <SelectCoin setrealCurrency={setrealCurrency} type="real" value={realCurrency} />
                    </div>

                    <div className="display-grid">

                        <Input type="text" label="description" setValue={setrealBenefitDescription} value={realBenefitDescription} required="true" />
                    </div>

                </div>

                <div className="box">
                    <div className='display-flex'>
                        <p>{t("benefitPotential")}</p>

                        <Tooltip title={t("decriptionPotentialBenefit")} placement="right" arrow>
                            <p className="obs">
                                <span className='material-symbols-outlined info-benefit'>
                                    info
                                </span>
                            </p>
                        </Tooltip>
                    </div>

                    <div className="flex-grid">

                        <div className="flex">
                            <div className="display-grid w100">

                                <Input type="number" label="monthlyValue" setValue={setPotentialMonthlyValue} value={potentialMonthlyValue} required="true" />
                            </div>
                            <SelectCoin setPotentialCurrency={setPotentialCurrency} type="potencial" value={potentialCurrency} />
                        </div>

                        <div className="flex">
                            <div className="display-grid w100">
                                <Input type="text" label="description" setValue={setPotentialBenefitDescription} value={potentialBenefitDescription} required="true" />
                            </div>

                            <div className="input-checkbox">
                                <label>{t("legalObligation")}</label>
                                <div className="display-flex mt10">

                                    <label className="checkbox">
                                        <input type="checkbox" id="legalObrigation" name="legalObrigation" checked={legalObrigation} onChange={(e) => { setLegalObrigation(e.target.checked) }} />
                                        <span className="checkmark"></span>
                                    </label>


                                    <label htmlFor="legalObrigation" className="pl10 mt3">{t("yes")}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="box">
                    <div className='display-flex'>
                        <p>{t("benefitQualitative")}</p>

                        <Tooltip title={t("decriptionQualitativeBenefit")} placement="right" arrow>
                            <p className="obs">
                                <span className='material-symbols-outlined info-benefit'>
                                    info
                                </span>
                            </p>
                        </Tooltip>
                    </div>

                    <Label title="description" />

                    <Editor setContent={setQualitativeBenefitDescription} content={qualitativeBenefitDescription} />


                    <div className='display-flex'>
                        <Input type="text" label="frequencyUse" setValue={setFrequencyOfUse} value={frequencyOfUse} />


                        <div className="input-checkbox">
                            <label className="requirements">{t("internalControlRequirements")}</label>
                            <div className="display-flex mt10">
                                <label className='checkbox'>
                                    <input type="checkbox" id="interalControlsRequirements" name="interalControlsRequirements" checked={interalControlsRequirements} onChange={(e) => { setInteralControlsRequirements(e.target.checked) }} />
                                    <span className="checkmark"></span>

                                </label>
                                <label htmlFor="interalControlsRequirements" className="pl10 mt5">{t("yes")}</label>


                            </div>
                        </div>
                    </div>

                </div>

                <div className="demands-footer">
                    <ButtonAction page="1" click="voltar"></ButtonAction>
                    <div onClick={() => { nextStep() }}>
                        <ButtonAction click="avancar"></ButtonAction>
                    </div>
                </div>

            </div>

        </div >
    );
}