import { useTranslation } from "react-i18next";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

import Title from "../../../Fixed/Search/Title";
import MinuteService from "../../../../services/minuteService";
import DemandService from "../../../../services/demandService";
import RealBenefitService from "../../../../services/realBenefitService";
import PotentialBenefitService from "../../../../services/potentialBenefitService";
import QualitativeService from "../../../../services/qualitativeBenefitService";
import ProposalService from "../../../../services/proposalService";
import AgendaService from "../../../../services/agendaService";
import UserContext from "../../../../context/userContext";
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

    console.log(proposals);

    async function saveMinute() {

        let publishedProposal:any = [];

        await proposals.forEach(async (proposal: any) => {

            publishedProposal.push(proposal.published);

            await RealBenefitService.update(proposal.demand.realBenefit.realBenefitCode, proposal.demand.realBenefit.realMonthlyValue, proposal.demand.realBenefit.realBenefitDescription, proposal.demand.realBenefit.realCurrency);
            await PotentialBenefitService.update(proposal.demand.potentialBenefit.potentialBenefitCode, proposal.demand.potentialBenefit.potentialMonthlyValue, proposal.demand.potentialBenefit.potentialBenefitDescription, proposal.demand.potentialBenefit.legalObrigation, proposal.demand.potentialBenefit.potentialCurrency);
            await QualitativeService.update(proposal.demand.qualitativeBenefit.qualitativeBenefitCode, proposal.demand.qualitativeBenefit.qualitativeBenefitDescription, proposal.demand.qualitativeBenefit.frequencyOfUse === "1" ? true : false, proposal.demand.qualitativeBenefit.interalControlsRequirements);

            await DemandService.findById(proposal.demand.demandCode).then((response: any) => {
                proposal.demand = response[0];
            });

            await DemandService.update(proposal.demand.demandCode, proposal.demand.demandTitle, proposal.demand.currentProblem, proposal.demand.demandObjective,
                proposal.demand.costCenter, proposal.demand.executionPeriod, proposal.demand.realBenefit.realBenefitCode, proposal.demand.potentialBenefit.potentialBenefitCode, proposal.demand.qualitativeBenefit.qualitativeBenefitCode,
                proposal.demand.demandAttachment, proposal.demand.demandDate, proposal.demand.demandStatus, proposal.demand.score, proposal.demand.requesterRegistration.workerCode,
                proposal.demand.classification.classificationCode, proposal.demand.approver);


            await ProposalService.update(proposal.proposalCode, proposal).catch((error: any) => {
                console.log(error)
            });

        });


        if(publishedProposal.includes(true)){  
            MinuteService.save(t("publiquedMinute") + "", code, actualDate, worker.id, "Published");
        }
        if(publishedProposal.includes(null)){
            MinuteService.save(t("unpublishedMinutes") + "", code, actualDate, worker.id, "Not Published");
        }

        navigate("/agenda/view/" + code);
    }


    const handleChange = (event: any, type: any, proposalCode: any) => {

        for (let i = 0; i < proposals.length; i++) {
            if (proposalCode === proposals[i].proposalCode) {

                if (type === "title") {
                    proposals[i].demand.demandTitle = event.target.value;
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
    };




    return (
        <div className="create-minute view-demand">

            <div className="container">
                <div className="background-title">
                    <Title title={t("createMinute")} nav={t("minuteCreateMinute")} />
                </div>

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