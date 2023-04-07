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
import { useEffect, useState } from 'react';
import RealServices from "../../../../../services/realBenefitService";
import QualitativeServices from "../../../../../services/qualitativeBenefitService";
import PotentialServices from "../../../../../services/potentialBenefitService";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';

export default function CreateDemands2() {

    const { t } = useTranslation();
    const navigate = useNavigate();
    const realBenefitsLocalStorage = JSON.parse(localStorage.getItem('realBenefits') || '{}')
    const potentialBenefitsLocalStorage = JSON.parse(localStorage.getItem('potentialBenefits') || '{}')
    const qualitativeBenefitsLocalStorage = JSON.parse(localStorage.getItem('qualitativeBenefits') || '{}')

    const [realMonthlyValue, setRealMonthlyValue] = useState("");
    const [realBenefitDescription, setrealBenefitDescription] = useState("");
    const [realCurrency, setrealCurrency] = useState("");

    const [potentialMonthlyValue, setPotentialMonthlyValue] = useState("");
    const [potentialBenefitDescription, setPotentialBenefitDescription] = useState("");
    const [legalObrigation, setLegalObrigation] = useState("");
    const [potentialCurrency, setPotentialCurrency] = useState("");

    const [qualitativeBenefitDescription, setQualitativeBenefitDescription] = useState("");
    const [frequencyOfUse, setFrequencyOfUse] = useState("");
    const [interalControlsRequirements, setInteralControlsRequirements] = useState("");


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
        let potentialBenefits: any = await PotentialServices.save(Number.parseFloat(potentialMonthlyValue), potentialBenefitDescription, true, potentialCurrencyFinal);
        let qualitativeBenefits: any = await QualitativeServices.save("1", qualitativeBenefitDescription, true);

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
            notify();
        } else {
            navigate('/demand/create/3');
        }
    }

    return (
        <div className="create-demands-2">
            <Header />
            <Nav />

            <div className="container">
                <div className="background-title">
                    <Title nav="demandsCreateDemand" title="createDemand" />

                    <ProgressBar atual="2" />
                </div>

                <div className="box">
                    <p>{t("benefitReal")}</p>

                    <div className="flex">
                        {/* <Input label="monthlyValue" required="*" /> */}
                        <div className="input">
                            <label>{t("monthlyValue")} *</label>
                            <input type="text" onChange={(e) => { setRealMonthlyValue(e.target.value) }} value={realMonthlyValue} />
                        </div>
                        <SelectCoin setrealCurrency={setrealCurrency} type="real" value={realCurrency} />
                    </div>

                    {/* <Input label="description" required=""></Input> */}
                    <div className="input">
                        <label>{t("description")}</label>
                        <input onChange={(e) => { setrealBenefitDescription(e.target.value) }} type="text" value={realBenefitDescription} />
                    </div>

                </div>

                <div className="box">
                    <p>{t("benefitPotential")}</p>

                    <div className="flex-grid">

                        <div className="flex">
                            {/* <Input label="monthlyValue" required="*" /> */}
                            <div className="input">
                                <label>{t("monthlyValue")} *</label>
                                <input type="text" onChange={(e) => { setPotentialMonthlyValue(e.target.value) }} value={potentialMonthlyValue} />
                            </div>
                            <SelectCoin setPotentialCurrency={setPotentialCurrency} type="potencial" value={potentialCurrency} />
                        </div>

                        <div className="flex">
                            {/* <Input label="description" required=""></Input> */}

                            <div className="input">
                                <label>{t("description")}</label>
                                <input onChange={(e) => { setPotentialBenefitDescription(e.target.value) }} type="text" value={potentialBenefitDescription} />
                            </div>

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
                        {/* <div className="input">
                            <label>{t("monthlyValue")} *</label>
                            <input type="text" onChange={(e) => { setFrequencyOfUse(e.target.value) }} value={qualitativeMonthlyValue} />
                        </div> */}
                    </div>

                    <div className="flex">
                        {/* <Input label="description" required=""></Input> */}
                        <div className="input">
                            <label>{t("description")}</label>
                            <input onChange={(e) => { setQualitativeBenefitDescription(e.target.value) }} type="text" value={qualitativeBenefitDescription} />
                        </div>

                        <div className="input-checkbox">
                            <label className="requirements">{t("internalControlRequirements")}</label>
                            <div className="checkbox">
                                <CheckBox />
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

// Notificação de erro ao preencher os campos obrigatórios
const notify = () => {
    toast.error('Preencha todos os campos!', {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
};