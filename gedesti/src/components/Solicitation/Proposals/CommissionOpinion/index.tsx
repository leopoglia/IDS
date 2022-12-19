import Header from "../../../Fixed/Header";
import Nav from "../../../Fixed/Nav";
import Title from "../../../Fixed/Search/Title";
import { Link } from "react-router-dom";
import "./style.css";
import { useTranslation } from "react-i18next";

export default function CommissionOpinion() {

    const { t } = useTranslation();

    return (
        <div className="commission-opinion">

            <Header title="Parecer da  Comissão" icon="edit" />

            <Nav />

            <div className="container">

                <div className="background-title">

                    <Title title={t("commissionOpinion")} nav={t("proposalComissionOpinion")} />


                </div>

                <div className="box">

                    <p>{t("commissionOpinion")}</p>

                    <div className="display-flex">
                        <div className="display-grid">
                            <label htmlFor="yes">{t("approve")}</label>
                            <input type="radio" id="yes" name="parecer" />
                        </div>

                        <div className="display-grid">

                            <label htmlFor="no">{t("fail")}</label>
                            <input type="radio" id="no" name="parecer" />
                        </div>
                    </div>


                    <p>{t("observations")}</p>

                    <textarea className="textarea" />
                </div>

                <div className="display-flex-end">
                    <Link to="/agenda/view">
                        <button className="btn-primary">{t("save")}</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}