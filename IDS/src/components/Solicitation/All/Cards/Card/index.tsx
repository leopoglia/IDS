import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useContext, useEffect, useState } from "react";
import { Tooltip } from "@mui/material";

import Situation from "./Situation/index";
import UserContext from "../../../../../context/userContext";
import "./style.css";

export default function Demand(props: any) {

    const { t } = useTranslation();
    const worker: any = useContext(UserContext).worker;
    const [urlFinal, setUrlFinal] = useState(props.type === "demand" ? "?" + props.demandVersion : "");
    const [formatDate, setFormatDate] = useState("");

    useEffect(() => {
        const date = new Date(props.year);

        let year = date.getFullYear();
        let month = String(date.getMonth() + 1).padStart(2, '0');
        let day = String(date.getDate()).padStart(2, '0');
        let hour = String(date.getHours()).padStart(2, '0');
        let minute = String(date.getMinutes()).padStart(2, '0');

        setFormatDate(`${day}/${month}/${year} ${hour}:${minute}`);

    }, [props.year])


    const information = () => {
        if (props.type === "demand") {
            return (
                (<div className="infos">
                    <div className="code">{props.demandCode}</div>
                    <div className="requester"><p>{t("requester")}: {props.requester}</p></div>
                    <div><p>{t("date")}: {props.date}</p></div>
                    <div className="situation"><p>{t("situation")}: {t(props.situation)}</p></div>

                </div>)
            )

        } else if (props.type === "proposal") {
            return (
                (<div className="infos">
                    <div className="code">{props.demandCode}</div>
                    <div className="requester"><p>{t("requester")}: {props.requester}</p></div>
                    <div><p>{t("date")}: {props.date}</p></div>
                    <div className="analyst"><p>{t("analyst")}: {props.analyst}</p></div>
                </div>)
            )
        } else if (props.type === "agenda") {
            return (
                (<div className="infos">
                    <div className="code">{props.demandCode}</div>
                    <div className="requester"><p>{t("sequentialNumber")}: {props.number}</p></div>
                    <div><p>{t("date")}: {props.date}</p></div>
                    <div className="analyst"><p>{t("dateAgenda")}: {formatDate}</p></div>
                </div>)
            )
        } else if (props.type === "minute") {
            return (
                (<div className="infos">
                    <div className="code">{props.demandCode}</div>
                    <div className="requester"><p>{t("sequentialNumber")}: {props.number}</p></div>
                    <div><p>{t("date")}: {props.date}</p></div>
                    <div className="analyst"><p>{t("Director")}: {props.director}</p></div>
                </div>)
            )
        }
    }

    const btnGenerateProposal = () => {
        if (props.situation === "BacklogComplement") {
            if (worker.office === "analyst" || worker.office === "ti") {
                return (
                    <Link to={"/proposal/demand/" + props.demandCode}>
                        <button className="btn-primary">{t("generateProposal")}</button>
                    </Link>
                );
            }
        } else if (props.situation === "Assesment" && worker.office !== "requester") {
            return (
                <div className="openProposal">
                    <Link to={"/proposal/view/" + props.proposalCode}>
                        <Tooltip title={t("openProposal")} placement="left" arrow>
                            <button className="btn-secondary btn-unique">
                                <span className="material-symbols-outlined">
                                    open_in_new
                                </span>
                            </button>
                        </Tooltip>
                    </Link>
                </div>

            );
        }
    }

    const situation = () => {
        if (props.type === "demand" || props.type === "proposal") {
            return (
                <div className="situation-demand">
                    <Situation type={props.type} situation={props.situation} demandCode={props.demandCode} />
                </div>
            );
        }
    }


    if (props.type !== "minute") {
        if (props.listDirection === false) {
            return (
                <div>
                    <Link to={"/" + props.type + "/view/" + props.demandCode + urlFinal}>
                        <div className="demand">
                            <div className="content-demand">

                                <section>
                                    <div className="name-code">
                                        <h1>{t(props.name)}</h1>
                                    </div>


                                    <div className="display-grid">

                                        {situation()}
                                    </div>

                                </section>


                                <div className="display-flex">

                                    {information()}

                                    {btnGenerateProposal()}
                                </div>
                            </div>

                        </div>
                    </Link>
                </div>
            );
        } else {
            return (
                <div>

                    <Link to={"/" + props.type + "/view/" + props.demandCode + urlFinal}>
                        <div className="demand-list">
                            <section>
                                <h1>{props.name}</h1>
                            </section>


                            <div className="display-flex">
                                {information()}

                                {situation()}


                            </div>

                        </div>

                    </Link>
                </div>
            );
        }
    } else {
        if (props.listDirection === false) {
            return (
                <div>
                    <Link to={"http://localhost:8443/api/minutes/pdf/" + props.demandCode}>
                        <div className="demand">
                            <div className="content-demand">

                                <section>
                                    <div className="name-code">
                                        <h1>{t(props.name)}</h1>
                                    </div>


                                    <div className="display-grid">

                                        {situation()}
                                    </div>

                                </section>


                                <div className="display-flex">

                                    {information()}

                                    {btnGenerateProposal()}
                                </div>
                            </div>

                        </div>
                    </Link>
                </div>
            );
        } else {
            return (
                <div>

                    <Link to={"/" + props.type + "/view/" + props.demandCode + urlFinal}>
                        <div className="demand-list">
                            <section>
                                <h1>{props.name}</h1>
                            </section>


                            <div className="display-flex">
                                {information()}

                                {situation()}


                            </div>

                        </div>

                    </Link>
                </div>
            );
        }
    }
}