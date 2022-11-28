import "./style.css";
import { Link } from "react-router-dom";
import Situation from "./Situation/index";

export default function Demand(props: any) {

    const information = () => {
        return (
            (<div className="infos">
                <div className="requester"><p>Solicitante: {props.requester}</p></div>
                <div><p>Data da solicitação: {props.date}</p></div>
                <div className="situation"><p>Situação: {props.situation}</p></div>
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
            <Link to={"/" + props.type + "/view"}>
                <div className="demand">
                    <section>
                        <h1>{props.name}</h1>


                        <div className="display-grid">

                            <Situation situation={props.situation} />

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
            <Link to={"/" + props.type + "/view"}>
                <div className="demand-list">
                    <section>
                        <h1>Nome da Solicitação</h1>

                    </section>


                    <div className="display-flex">
                        {information()}

                        <Situation situation={props.situation} />


                    </div>

                </div>

            </Link>
        );
    }
}