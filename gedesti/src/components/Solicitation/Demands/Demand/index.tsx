import "./style.css";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Demand(props: any) {

    const information = () => {
        return (
            (<div className="infos">
                <div><p>Solicitante: {props.requester}</p></div>
                <div><p>Data da solicitação: {props.date}</p></div>
                <div><p>Situação: {props.situation}</p></div>
            </div>)
        )
    }

    const btnGenerateProposal = () => {
        if (props.situation === "Backlog") {
            return (
                <Link to="/proposal/execution-costs">
                    <button className="btn-primary">Gerar Proposta</button>
                </Link>
            );
        }
    }

    if (props.listDirection === false) {
        return (
            <Link to={"/"+ props.type + "/view"}>
                <div className="demand">
                    <section>
                        <h1>{props.name}</h1>


                        <div className="display-grid">
                            <div className="graphic">
                                <div className="situation"></div>
                            </div>

                        </div>

                    </section>


                    <div className="display-flex">
                        {information()}

                        {btnGenerateProposal()}

                    </div>


                </div>
            </Link>
        );
    } else {
        return (
            <Link to={"/"+ props.type + "/view"}>
                <div className="demand-list">
                    <section>
                        <h1>Nome da Solicitação</h1>

                    </section>


                    <div className="display-flex">
                        {information()}

                        <div className="graphic">
                            <div className="situation"></div>
                        </div>


                        {btnGenerateProposal()}

                    </div>

                </div>

            </Link>
        );
    }
}