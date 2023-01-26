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
import { useTranslation } from "react-i18next";



export default function EscopeDemand() {

    const { t } = useTranslation();

    return (
        <div className="create-demands-1">
            <Header icon="folder_copy" title="createDemand" />
            <Nav />

            <div className="container">
                <div className="background-title">
                    <Title nav="proposalEditDemand" title="proposal" />

                </div>

                <div className="box">
                    <p>{t("generalInformations")}</p>


                    {/* <Input label="titleProposal" required="*" /> */}

                    <div className="input">
                        <label>{t("titleProposal")} *</label>
                        <input type="text"/>
                    </div>

                    <TextArea label="problemToBeSolved" required="*" />

                    <TextArea label="proposal" required="*" />

                    <Input label="costCenter" required="*"></Input>

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

                        <div className="input-checkbox requirements">
                            <label>{t("internalControlRequirements")}</label>
                            <div className="checkbox">
                                <CheckBox />
                            </div>
                        </div>
                    </div>

                </div>

                <div className="display-flex-end">
                    <Link to="/proposal/edit-scope">
                        <button className="btn-primary">{t("advance")}</button>
                    </Link>
                </div>

            </div>

        </div>
    );
}