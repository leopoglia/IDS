import "./style.css";
import { useState } from "react";

export default function Demand() {

    const [information, setInformation] = useState(<div className="infos">
        <div><p>Solicitante: Leonardo Heitor Poglia</p></div>
        <div><p>Data da solicitação: 27/04/2022</p></div>
        <div><p>Situação: Backlog</p></div>
    </div>);


    return (
        <div className="demand">
            <section>
                <h1>Nome da Solicitação</h1>

                <div className="graphic">
                    <div className="situation"></div>
                </div>
            </section>

            {information}


        </div>
    );
}