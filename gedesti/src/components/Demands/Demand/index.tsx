import "./style.css";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Demand() {

    const [information, setInformation] = useState(<div className="infos">
        <div><p>Solicitante: Leonardo Heitor Poglia</p></div>
        <div><p>Data da solicitação: 27/04/2022</p></div>
        <div><p>Situação: Backlog</p></div>
    </div>);


    return (
        <Link to={"/demand/view"}>
            <div className="demand">
                <section>
                    <h1>Nome da Solicitação</h1>

                    <div className="graphic">
                        <div className="situation"></div>
                    </div>
                </section>

                {information}


            </div>
        </Link>
    );
}