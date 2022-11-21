import "./style.css";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function SelectProposal() {

    const [information, setInformation] = useState(<div className="infos">
        <div><p>Solicitante: Leonardo Heitor Poglia</p></div>
        <div><p>Data da solicitação: 27/04/2022</p></div>
        <div><p>Situação: Aprovado</p></div>

    </div>);


    return (
        <div className="select-proposal">

            <div className="display-grid">
                <Link to={"/proposal/view"}>

                    <section>
                        <h1>Nome da Propostas</h1>
                    </section>


                    {information}
                </Link>

            </div>

            <div className="checkbox">
                <input type="checkbox" name="" id="" />
            </div>
        </div>
    );
}

