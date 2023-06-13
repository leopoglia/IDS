import { t } from "i18next";
import { Link, useNavigate } from "react-router-dom";

import ButtonActionAnalyst from "../ButtonActionAnalyst";

export default function ButtonsActions(props: any) {

    const navigate = useNavigate();


    return (
        <div className="display-flex-end">
            {  /* Botões superiores 1 - Download e Edit */  props.demand.requesterRegistration.workerCode === props.workerId ? (
                <>
                    <button className="btn-primary" onClick={props.generatePDF}>
                        <span className="material-symbols-outlined">
                            download
                        </span>
                        <span>{t("generatePDF")}</span>
                    </button>

                    {props.demand.demandStatus === "BacklogEdit" &&
                        <button onClick={() => { navigate("/demand/edit/" + props.demand.demandCode) }} className="btn-primary btn-download btn-mini">
                            <span className="material-symbols-outlined">
                                edit
                            </span>
                        </button>
                    }
                </>
            ) :/* Botões superiores 2 - Reprovar e Classificar */  (props.actionsDemand === 2) ? (
                <>

                    <Link to={"/demand/disapprove/" + props.demand.demandCode}>
                        <button className="btn-secondary">
                            <span>{t("fail")}</span>
                        </button>
                    </Link>

                    <button onClick={() => props.giveBack()} className="btn-secondary">
                        <span>{t("giveback")}</span>
                    </button>


                    <Link to={"/demand/rank/" + props.demand.demandCode}>
                        <button className="btn-primary">
                            <span>{t("toRank")}</span>
                        </button>
                    </Link>


                    <ButtonActionAnalyst codeDemand={props.demand.demandCode} />
                </>

            ) : /* Botões superiores 3 - Reprovar e Aprovar */ (props.actionsDemand === 3) ? (
                <>

                    <Link to={"/demand/disapprove/" + props.demand.demandCode}>
                        <button className="btn-secondary">
                            <span>{t("fail")}</span>
                        </button>
                    </Link>

                    <button onClick={() => { props.approveDemand() }} className="btn-primary">
                        <span>{t("approve")}</span>
                    </button>


                    <ButtonActionAnalyst codeDemand={props.demand.demandCode} />
                </>

            ) : /* Botões superiores 4 - Complementar*/ (props.actionsDemand === 4) ? (
                <>
                    <Link to={"/demand/complement/" + props.demand.demandCode} >
                        <button className="btn-primary">
                            <span>{t("complementary")}</span>
                        </button>
                    </Link>

                    <ButtonActionAnalyst codeDemand={props.demand.demandCode} />
                </>
            ) : /* Botões superiores 5 - Gerar Proposta */ (props.actionsDemand === 5) ? (
                <>
                    <Link to={"/proposal/demand/" + props.demand.demandCode} >
                        <button className="btn-primary">
                            <span>{t("generateProposal")}</span>
                        </button>
                    </Link>

                    <ButtonActionAnalyst />
                </>
            ) : /* Botões superiores 6 - Histórico, Editar... */(props.actionsDemand === 6) ? (
                <ButtonActionAnalyst codeDemand={props.demand.demandCode} />
            ) : /* Botões superiores 7 - Editar... */(props.actionsDemand === 7) ? (
                <>
                    <button onClick={() => { navigate("/proposal/edit/" + props.proposal.proposalCode) }} className="btn-primary btn-download btn-mini">
                        <span className="material-symbols-outlined">
                            edit
                        </span>
                    </button>

                    <ButtonActionAnalyst codeDemand={props.demand.demandCode} />
                </>
            ) : (
                <button className="btn-primary" onClick={props.generatePDF}>
                    <span className="material-symbols-outlined">
                        download
                    </span>
                    <span>{t("generatePDF")}</span>
                </button>
            )
            }
        </div >
    )
}