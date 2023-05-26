import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import { t } from "i18next";

import SelectProposal from "./SelectProposal";
import Footer from "../../../Fixed/Footer";
import Title from "../../../Fixed/Search/Title";
import ServicesProposal from "../../../../services/proposalService";
import "./style.css"


export default function Proposals() {

    const [proposals, setProposals] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        ServicesProposal.findAll().then((response: any) => {
            setProposals(response);
        })
    }, [])

    function nextAdd() {
        let proposals = JSON.parse(localStorage.getItem("proposals") || "[]");
        if (proposals.length === 0) {
            notifyError()
        } else {
            navigate("/agenda/create")
        }
    }

    return (
        <div className="proposals">


            <div className="container">
                <div className="backgroud-title">
                    <Title nav={t("createProposalSelectProposal")} title={t("selectProposal")} />
                </div>

                <div>
                    {proposals.map((proposal: any) => {
                        if (proposal.proposalStatus === "Pending") {
                            return (
                                <SelectProposal name={proposal.proposalName} requester={proposal.demand.requesterRegistration.workerName} date={proposal.demand.demandDate} status={proposal.proposalStatus} id={proposal.proposalCode} />
                            )
                        }
                    })}

                    {proposals.filter((proposal: any) => proposal.proposalStatus === "Pending").length === 0 &&
                        <div className="box-proposal">
                            <div className="no-results">
                                <span className="material-symbols-outlined">request_quote</span>
                                <h1>{t("noResults")}</h1>
                            </div>
                        </div>
                    }

                </div>


                {proposals.filter((proposal: any) => proposal.proposalStatus === "Pending").length !== 0 &&

                    <div className="display-flex-end">

                        <button onClick={() => nextAdd()} className="btn-primary">{t("add")}</button>

                    </div>
                }

                <Footer />

            </div>

            <ToastContainer position="bottom-right" newestOnTop />

        </div>
    );
}

const notifyError = () => {
    toast.error('Selecione alguma proposta!', {
        position: "bottom-right",
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
};

