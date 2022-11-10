import "./style.css";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Minute() {

    const [information, setInformation] = useState(<div className="infos">
        <div><p>Solicitante: Leonardo Heitor Poglia</p></div>
        <div><p>Data da solicitação: 27/04/2022</p></div>
        <div><p>Situação: Backlog</p></div>
    </div>);


    return (
        <Link to={"/minute/view"}>
            <div className="minute">
                <section>
                    <h1>Nome da Ata</h1>


                </section>


                {information}



            </div>
        </Link>
    );
}