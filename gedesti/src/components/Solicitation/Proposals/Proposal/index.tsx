import "./style.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { t } from "i18next";

export default function Proposal() {

    const [information, setInformation] = useState(<div className="infos">
        <div><p>{t("requester")}: Leonardo Heitor Poglia</p></div>
        <div><p>{t("date")}: 27/04/2022</p></div>
        <div><p>{t("situation")}: Aprovado</p></div>
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