import "./style.css";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Demand(props: any) {

    const [information, setInformation] = useState(<div className="infos">
        <div><p>Solicitante: Leonardo Heitor Poglia</p></div>
        <div><p>Data da solicitação: 27/04/2022</p></div>
        <div><p>Situação: Backlog</p></div>
    </div>);


    if (props.listDirection === false) {
        return (
            <Link to={"/demand/view"}>
                <div className="demand">
                    <section>
                        <h1>Nome da Solicitação</h1>


                        <div className="display-grid">
                            <div className="graphic">
                                <div className="situation"></div>
                            </div>

                        </div>

                    </section>


                    <div className="display-flex">
                        {information}

                        <Link to="/proposal/execution-costs">
                            <button className="btn-primary">Gerar Proposta</button>
                        </Link>
                    </div>


                </div>
            </Link>
        );
    } else {
        return (
            <Link to={"/demand/view"}>
                <div className="demand-list">
                    <section>
                        <h1>Nome da Solicitação</h1>

                    </section>


                    <div className="display-flex">
                        {information}

                        <div className="graphic">
                            <div className="situation"></div>
                        </div>

                        <Link to="/proposal/execution-costs">
                            <button className="btn-primary">Gerar Proposta</button>
                        </Link>
                    </div>

                </div>

            </Link>
        );
    }
}