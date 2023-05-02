import "./style.css"
import { useNavigate } from "react-router-dom";
import Header from "../../../Fixed/Header"
import Nav from "../../../Fixed/Nav"
import SelectProposal from "./SelectProposal";
import Footer from "../../../Fixed/Footer";
import Title from "../../../Fixed/Search/Title";
import { t } from "i18next";
import ServicesProposal from "../../../../services/proposalService";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

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

                </div>


                <div className="display-flex-end">

                    <button onClick={() => nextAdd()} className="btn-primary">{t("add")}</button>

                </div>

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

