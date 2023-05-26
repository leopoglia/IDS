import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { t } from "i18next";

import "./style.css";


export default function SelectProposal(props: any) {

    const [information] = useState(<div className="infos">
        <div><p>{t("requester")}: {props.requester}</p></div>
        <div><p>{t("date")}: {props.date}</p></div>
        <div><p>{t("situation")}: {props.status}</p></div>

    </div>);

    const [cheacked, setCheacked] = useState(false);
    const [proposal, setProposal]: any = useState([]);

    useEffect(() => {
        let proposals = JSON.parse(localStorage.getItem("proposals") || "[]");
        setProposal(proposals);

        if (proposals.includes(props.id)) {
            setCheacked(true);
        }

    }, [])

    const handleCheckbox = (event: any) => {
        if (event.target.checked) {
            let proposalStorage = JSON.parse(localStorage.getItem("proposals") || "[]");

            proposalStorage.push(props.id);
            localStorage.setItem("proposals", JSON.stringify(proposalStorage));
            setProposal(proposalStorage);
            setCheacked(true);
        } else {
            let proposalStorage = JSON.parse(localStorage.getItem("proposals") || "[]");
            let index = proposalStorage.indexOf(props.id);
            proposalStorage.splice(index, 1);
            localStorage.setItem("proposals", JSON.stringify(proposalStorage));
            setProposal(proposalStorage);
            setCheacked(false);
        }

    }


    return (
        <div className="select-proposal">

            <div className="display-grid">
                <Link to={"/proposal/view/" + props.id}>

                    <section>
                        <h1>{props.name}</h1>
                    </section>


                    {information}
                </Link>

            </div>

            <div className="checkbox">
                <input onChange={(event) => handleCheckbox(event)} type="checkbox" name="" id="" checked={cheacked} />
            </div>
        </div>
    );
}

