import "./style.css";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Proposal() {

    const [information, setInformation] = useState(<div className="infos">
        <div><p>Solicitante: Leonardo Heitor Poglia</p></div>
        <div><p>Data da solicitação: 27/04/2022</p></div>
        <div><p>Situação: Aprovado</p></div>
    </div>);


    return (
        <Link to={"/proposal/view"}>
            <div className="proposal">
                <section>
                    <h1>Nome da Propostas</h1>

                </section>


                {information}



            </div>
        </Link>
    );
}