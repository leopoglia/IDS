import "./style.css"
import { Link } from "react-router-dom";
import Header from "../../../Fixed/Header"
import Nav from "../../../Fixed/Nav"
import SelectProposal from "./SelectProposal";
import Footer from "../../../Fixed/Footer";
import Title from "../../../Fixed/Search/Title";
import { t } from "i18next";

export default function Proposals() {
    return (
        <div className="proposals">
            <Header icon="content_paste" title="selectProposals" />
            <Nav />

            <div className="container">
                <div className="backgroud-title">
                    <Title nav={t("createProposalSelectProposal")} title={t("selectProposal")} />
                </div>

                <SelectProposal />

                <div className="display-flex-end">
                    <Link to="/agenda/create">
                        <button className="btn-primary">{t("add")}</button>
                    </Link>

                </div>

                <Footer />

            </div>
        </div>
    );
}