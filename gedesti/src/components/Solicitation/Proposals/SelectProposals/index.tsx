import "./style.css"
import { Link } from "react-router-dom";
import Header from "../../../Fixed/Header"
import Nav from "../../../Fixed/Nav"
import SelectProposal from "./SelectProposal";
import Footer from "../../../Fixed/Footer";
import Title from "../../../Fixed/Search/Title";
import { t } from "i18next";
import ServicesProposal from "../../../../services/proposalService";
import { useEffect, useState } from "react";

export default function Proposals() {

    const [proposals, setProposals] = useState([]);

    useEffect(() => {
        ServicesProposal.findAll().then((response: any) => {
            setProposals(response);
        })
    }, [])

    console.log(proposals);


    return (
        <div className="proposals">
            <Header icon="content_paste" title="selectProposals" />
            <Nav />

            <div className="container">
                <div className="backgroud-title">
                    <Title nav={t("createProposalSelectProposal")} title={t("selectProposal")} />
                </div>

                <div>
                    {proposals.map((proposal: any) => {
                        return (
                            <SelectProposal requester={proposal.demand.requesterRegistration.workerName} date={proposal.demand.demandDate} />
                        )
                    })}

                </div>


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