import { useTranslation } from "react-i18next";

import Title from '../../../Fixed/Search/Title';
import ServicesDemand from "../../../../services/demandService";
import ServicesProposal from "../../../../services/proposalService";
import ServicesAgenda from "../../../../services/agendaService";
import './style.css';
import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";

export default function Workerflow() {

    const { t } = useTranslation();

    const demandCode: number = parseInt(useParams().id as string);
    const [stepActual, setStepActual] = useState(-1);
    const [workerState, setWorkerState] = useState<any>([]);

    const steps = ["Criação da demanda", "Classificação pelo analista", "Aprovação do gerente", "Complemento do analista", "Criação da proposta", "Inserção em uma pauta de reunião", "Aprovação da comissão", "Aprovação da DG", "Desenvolvimento"];


    useEffect(() => {
        ServicesDemand.findById(demandCode).then(async (demand: any) => {
            var proposal: any = {};
            var agenda: any = {};
            let stepActualAux = 0;

            try {
                await ServicesProposal.findByDemandCode(demandCode).then((response: any) => {
                    proposal = response;
                })
                await ServicesAgenda.findByProposals(proposal.proposalCode).then((response: any) => {
                    agenda = response;
                })
            } catch (error) {
            }


            if (demand?.demandStatus === "Backlog") {
                setStepActual(0);
                stepActualAux = 0;
            } else if (demand?.demandStatus === "BacklogRanked") {
                setStepActual(1);
                stepActualAux = 1;
            } else if (demand?.demandStatus === "BacklogRankApproved") {
                setStepActual(2);
                stepActualAux = 2;
            } else if (demand?.demandStatus === "BacklogComplement") {
                setStepActual(3);
                stepActualAux = 3;
            } else if (demand?.demandStatus === "Assesment") {




                if (proposal.proposalStatus === "Pending") {
                    setStepActual(4);
                    stepActualAux = 4;

                    if (agenda?.analistRegistry !== null) {
                        setStepActual(5);
                        stepActualAux = 5;
                    }
                } else if (proposal.proposalStatus === "ApprovedComission") {
                    setStepActual(6);
                    stepActualAux = 6;
                } else if (proposal.proposalStatus === "ApprovedDG") {
                    setStepActual(7);
                    stepActualAux = 7;
                }
            }

            if (stepActualAux >= 0) {
                workerState.push(demand.requesterRegistration.workerName);
                setWorkerState(workerState);
            }
            if (stepActualAux >= 1) {
                workerState.push(demand.classification.analistRegistry.workerName);
                setWorkerState(workerState);
            }
            if (stepActualAux >= 2) {
                workerState.push(demand.approver.workerName);
                setWorkerState(workerState);
            }
            if (stepActualAux >= 3) {
                workerState.push(demand.classification.analistRegistry.workerName);
                setWorkerState(workerState);
            }
            if (stepActualAux >= 4) {
                workerState.push(proposal.responsibleAnalyst.workerName);
                setWorkerState(workerState);
            }
            if (stepActualAux >= 5) {
                workerState.push(agenda.analistRegistry.workerName);
                setWorkerState(workerState);
            }
            if (stepActualAux >= 6) {
                let comissions = "";
                for (let i = 0; i < agenda.commission.length; i++) {
                    if (i === agenda.commission.length - 1) {
                        comissions += agenda.commission[i].commissionName;
                        break;
                    }
                    comissions += agenda.commission[i].commissionName + ", ";
                }

                workerState.push(comissions);
                setWorkerState(workerState);
            }
        })
    }, [setStepActual])



    const step = (number: any, text: any, index: number) => {
        return (
            <div key={index}>

                <div className={"step step-" + index}>
                    <div className={"ellipse ellipse-" + number} >
                        {number !== "done" ? <span className="number">{number}</span> : <span className="material-symbols-outlined">done</span>
                        }
                    </div>

                    <span className="ellipse-text">
                        {t(text)}
                    </span>

                    <span className="worker">

                        {workerState[index]}
                    </span>
                </div>

                {index !== 8 &&
                    < div className="background-line">

                        <div className={"line line-" + (index <= stepActual - 1 ? true : false)} />
                    </div>
                }
            </div >
        )
    }


    return (
        <div className="workflow">
            <div className="container">

                <div className="backgroud-title">
                    <Title nav={t("demandWorkFlow")} title="workFlow" />
                </div>


                <div className="boxNoPadding h100">

                    <div>
                        {
                            steps.map((steps, index) => {
                                if (index <= stepActual) {
                                    return step("done", steps, index);
                                } else {
                                    return step(index + 1, steps, index);
                                }
                            })
                        }
                    </div>

                </div>
            </div>
        </div>
    )
}