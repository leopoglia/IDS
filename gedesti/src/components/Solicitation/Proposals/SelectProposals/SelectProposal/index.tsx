import "./style.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { t } from "i18next";

export default function SelectProposal() {

    const [information, setInformation] = useState(<div className="infos">
        <div><p>{t("resquester")}: Leonardo Heitor Poglia</p></div>
        <div><p>{t("date")}: 27/04/2022</p></div>
        <div><p>{t("situation")}: Aprovado</p></div>

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

