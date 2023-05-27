import { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import { ToastContainer } from 'react-toastify';
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
        let qualitativeBenefits: any = await QualitativeServices.save("1", qualitativeBenefitDescription, interalControlsRequirements);

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
                    </div>

                    <div className="flex">
                        <div className="input">
                            <Label title="monthlyValue" required="true" />

                            <input type="text" onChange={(e) => { setRealMonthlyValue(e.target.value) }} value={realMonthlyValue} />
                        </div>
                        <SelectCoin setrealCurrency={setrealCurrency} type="real" value={realCurrency} />
                    </div>

                    {/* <Input label="description" required=""></Input> */}
                    <div className="input">
                        <Label title="description" required="true" />
                        <input onChange={(e) => { setrealBenefitDescription(e.target.value) }} type="text" value={realBenefitDescription} />
                    </div>

                </div>

                <div className="box">
                    <p>{t("benefitPotential")}</p>

                    <div className="flex-grid">

                        <div className="flex">
                            {/* <Input label="monthlyValue" required="*" /> */}
                            <div className="input">
                                <Label title="monthlyValue" required="true" />
                                <input type="text" onChange={(e) => { setPotentialMonthlyValue(e.target.value) }} value={potentialMonthlyValue} />
                            </div>
                            <SelectCoin setPotentialCurrency={setPotentialCurrency} type="potencial" value={potentialCurrency} />
                        </div>

                        <div className="flex">
                            {/* <Input label="description" required=""></Input> */}

                            <div className="input">
                                <Label title="description" />
                                <input onChange={(e) => { setPotentialBenefitDescription(e.target.value) }} type="text" value={potentialBenefitDescription} />
                            </div>

                            <div className="input-checkbox">
                                <label>{t("legalObligation")}</label>
                                <div className="checkbox">
                                    <input type="checkbox" id="legalObrigation" name="legalObrigation" checked={legalObrigation} onChange={(e) => { setLegalObrigation(e.target.checked) }} />
                                    <label htmlFor="legalObrigation" className="pl10 mb0">{t("yes")}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="box">
                    <p>{t("benefitQualitative")}</p>

                    <div className="display-grid">
                        <div className="input">
                            <Label title="description" />

                            <Editor setContent={setQualitativeBenefitDescription} content={qualitativeBenefitDescription} />

                        </div>

                        <div className="input-checkbox">
                            <label className="requirements">{t("internalControlRequirements")}</label>
                            <div className="checkbox">
                                <input type="checkbox" id="interalControlsRequirements" name="interalControlsRequirements" checked={interalControlsRequirements} onChange={(e) => { setInteralControlsRequirements(e.target.checked) }} />
                                <label htmlFor="interalControlsRequirements" className="pl10 mb0">{t("yes")}</label>

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

            <ToastContainer position="bottom-right" newestOnTop />

        </div>
    );
}