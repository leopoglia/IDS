import "./style.css";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Proposal() {

    const [information, setInformation] = useState(<div className="infos">
        <div><p>Solicitante: Leonardo Heitor Poglia</p></div>
        <div><p>Data da solicitação: 27/04/2022</p></div>
        <div><p>Situação: Backlog</p></div>
    </div>);


    return (
        <Link to={"/demand/view"}>
            <div className="demand">
                <section>
                    <h1>Nome da Propostas</h1>


                    <div className="display-grid">
                        <div className="graphic">
                            <div className="situation"></div>
                        </div>

                    </div>

                </section>


                {information}



            </div>
        </Link>
    );
}