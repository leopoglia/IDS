import "./style.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { t } from "i18next";

export default function SelectProposal(props: any) {

    const [information, setInformation] = useState(<div className="infos">
        <div><p>{t("requester")}: {props.requester}</p></div>
        <div><p>{t("date")}: {props.date}</p></div>
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

