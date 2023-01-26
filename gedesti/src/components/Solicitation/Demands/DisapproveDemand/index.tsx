import { t } from "i18next";
import Footer from "../../../Fixed/Footer";
import Header from "../../../Fixed/Header";
import Nav from "../../../Fixed/Nav";
import Title from "../../../Fixed/Search/Title";
import "./style.css"
import { Link } from "react-router-dom";


export default function DisapproveDemand() {

    return (
        <div className="disapprove-demand">

            <Header icon="close" title="disapproveDemand" />

            <Nav />

            <div className="container">

                <div className="background-title">

                    <Title nav={t("demandViewDisapprove")} title={t("disapproveDemand")} />

                </div>

                <div className="box">

                    <div className="disapprove-demand">

                        <div className="display-grid">
                            <label htmlFor="">{t("reasonForDisapproval")} *</label>

                            <textarea />
                        </div>
                    </div>

                </div>

                <div className="demands-footer">

                    <Link to="/demand/view/1">
                    <button className="btn-secondary">{t("return")}</button>
                    </Link>

                    <Link to="/demand/view/1">
                    <button className="btn-primary">{t("fail")}</button>
                    </Link>

                </div>

                <Footer />

            </div>

        </div>
    );
}