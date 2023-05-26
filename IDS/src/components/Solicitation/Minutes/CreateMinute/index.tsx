import Title from "../../../Fixed/Search/Title";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import MinuteService from "../../../../services/minuteService";
import ProposalService from "../../../../services/proposalService";
import AgendaService from "../../../../services/agendaService";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../../../context/userContext";
import { useNavigate } from "react-router";
import BoxProposal from "./BoxProposal";


export default function CreateMinute() {

    const { t } = useTranslation();
    const navigate = useNavigate();
    const code = parseInt(window.location.pathname.split("/")[3]);
    const actualDate = new Date().getUTCDate() + "/" + (new Date().getUTCMonth() + 1) + "/" + new Date().getUTCFullYear();
    const worker = useContext(UserContext).worker;
    const [proposals, setProposals]: any = useState([]);



    useEffect(() => {

        AgendaService.findById(code).then((response: any) => {

            setProposals(response[0].proposals);
        })

    }, [])


    function saveMinute() {

        proposals.forEach(async (proposal: any) => {

            await ProposalService.update(proposal.proposalCode, proposal).then((response: any) => {
                console.log(response)
            })
        });

        MinuteService.save(t("unpublishedMinutes") + "", code, actualDate, worker.id, "Not Published");
        MinuteService.save(t("publiquedMinute") + "", code, actualDate, worker.id, "Published");

        navigate("/minutes/1");
    }


    const handleChange = (event: any, type: any, proposalCode: any) => {

        console.log(event.target.value)
        console.log(type)
        console.log(proposalCode)

        for (let i = 0; i < proposals.length; i++) {
            if (proposalCode === proposals[i].proposalCode) {

                if (type === "title") {
                    proposals[i].proposalName = event.target.value;
                } else if (type === "objective") {
                    proposals[i].demand.demandObjective = event.target.value;
                } else if (type === "scope") {
                    proposals[i].descriptiveProposal = event.target.value;
                } else if (type === "benefitQualitative") {
                    proposals[i].demand.qualitativeBenefit.qualitativeBenefitDescription = event.target.value;
                } else if (type === "benefitPotential") {
                    proposals[i].demand.potentialBenefit.potentialBenefitDescription = event.target.value;
                } else if (type === "dateStart") {
                    proposals[i].initialRunPeriod = event.target.value;
                } else if (type === "dateEnd") {
                    proposals[i].finalRunPeriod = event.target.value;
                }
            }

            setProposals(proposals);
        }

        console.log(proposals)
    };




    return (
        <div className="create-minute view-demand">

            <div className="container">
                <div className="background-title">
                    <Title title={t("createMinute")} nav={t("minuteCreateMinute")} />
                </div>

                {/* <Editor /> */}

                <div className="box">

                    <p className="mb10">{t("proposals")}</p>

                    {proposals?.map((proposal: any, index: any) => {
                        return (
                            <BoxProposal proposal={proposal} handleChange={handleChange} index={index} />
                        )
                    })}

                </div>

                <div className="display-flex-end">
                    <button onClick={saveMinute} className="btn-primary">{t("save")}</button>
                </div>


            </div>
        </div>
    );
}