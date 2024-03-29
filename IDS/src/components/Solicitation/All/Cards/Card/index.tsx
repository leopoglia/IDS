import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useContext, useEffect, useState } from "react";
import { Tooltip } from "@mui/material";

import Situation from "./Situation/index";
import UserContext from "../../../../../context/userContext";
import "./style.css";
import othersUtil from "../../../../../utils/othersUtil";

export default function Demand(props: any) {

    const { t } = useTranslation();
    const worker: any = useContext(UserContext).worker;
    const [urlFinal, setUrlFinal] = useState(props.type === "demand" ? "?" + props.demandVersion : "");
    const [formatDate, setFormatDate] = useState("");

    useEffect(() => {
        if (props.type === "agenda") {
            const date = new Date(props.year);

            let year = date.getFullYear();
            let month = String(date.getMonth() + 1).padStart(2, '0');
            let day = String(date.getDate()).padStart(2, '0');
            let hour = String(date.getHours()).padStart(2, '0');
            let minute = String(date.getMinutes()).padStart(2, '0');

            setFormatDate(`${day}/${month}/${year} ${hour}:${minute}`);
        } else {
            const date = new Date(props.date);

            let year = date.getFullYear();
            let month = String(date.getMonth() + 1).padStart(2, '0');
            let day = String(date.getDate()).padStart(2, '0');

            setFormatDate(`${day}/${month}/${year}`);
        }

    }, [props.year, props.date])


    const information = () => {
        if (props.type === "demand") {
            return (
                (<div className="infos">
                    <div className="code">{props.demandCode}</div>
                    <div className="requester"><p>{t("requester")}: {props.requester}</p></div>
                    <div className="date"><p>{t("date")}: {formatDate}</p></div>
                    <div className="situation"><p>{t("situation")}: {t(props.situation)}</p></div>

                </div>)
            )

        } else if (props.type === "proposal") {
            return (
                (<div className="infos">
                    <div className="code">{props.demandCode}</div>
                    <div className="requester"><p>{t("requester")}: {props.requester}</p></div>
                    <div><p>{t("date")}: {formatDate}</p></div>
                    <div className="analyst"><p>{t("analyst")}: {props.analyst}</p></div>
                </div>)
            )
        } else if (props.type === "agenda") {
            return (
                (<div className="infos">
                    <div className="code">{props.demandCode}</div>
                    <div className="requester"><p>{t("analyst")}: {props.requester}</p></div>
                    <div className="analyst"><p>{t("dateAgenda")}: {formatDate}</p></div>
                </div>)
            )
        } else if (props.type === "minute") {
            return (
                (<div className="infos">
                    <div className="code">{props.demandCode}</div>
                    <div className="number-sequential"><p>{t("sequentialNumber")}: {props.number}</p></div>
                    <div><p>{t("date")}: {othersUtil.addZeroDate(props.date)}</p></div>
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
        } else if (props.situation === "BacklogEdit") {
            return (
                <div className="openProposal">
                    <Tooltip title={t("BacklogEdit")} placement="left" arrow>
                        <button className="btn-secondary btn-unique">
                            <span className="material-symbols-outlined">
                                warning
                            </span>
                        </button>
                    </Tooltip>
                </div>
            );
        }
    }

    const situation = () => {
        if (props.type === "demand" || props.type === "proposal" || props.type === "minute" || props.type === "agenda") {
            return (
                <div className="situation-demand">
                    <Situation id={props.id} type={props.type} situation={props.situation} demandCode={props.demandCode} agenda={props.agenda} score={props.score} />
                </div>
            );
        }
    }


    if (props.listDirection === false && props.type === "demand") {
        return (
            <div className={"demand-" + props.id}>
                <Link to={"/" + props.type + "/view/" + props.demandCode + "?" + props.demandVersion}>
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
    } else if (props.listDirection === false && props.type === "demand") {
        return (
            <div>

                <Link to={"/" + props.type + "/view/" + props.demandCode + "?" + props.demandVersion}>
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
    } else if (props.listDirection === false) {
        return (
            <div className={"demand-" + props.id}>
                <Link to={"/" + props.type + "/view/" + props.demandCode}>
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

                <Link to={"/" + props.type + "/view/" + props.demandCode}>
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