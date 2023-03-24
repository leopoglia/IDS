import "./style.css";
import { Link } from "react-router-dom";
import Situation from "./Situation/index";
import { useTranslation } from "react-i18next";
import { useState, useEffect, useContext } from "react";
import UserContext from "../../../../context/userContext";


export default function Demand(props: any) {

    const { t } = useTranslation();
    const worker: any = useContext(UserContext).worker;

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
                    <div className="analyst"><p>{t("year")}: {props.year}</p></div>
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
        }
    }




    const situation = () => {
        if (props.type === "demand" || props.type === "proposal") {
            return (
                <div className="situation-demand">
                    <Situation type={props.type} situation={props.situation} />
                </div>
            );
        }
    }


    if (props.type === "minute") {
        if (props.listDirection === false) {
            return (
                <div className="demand">
                    <div className="content-demand">
                        <section>
                            <div className="name-code">
                                <h1>{props.name}</h1>
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
            )
        } else {
            return (
                <div className="demand-list">
                    <section>
                        <div className="name-code">
                            <h1>{props.name}</h1>
                        </div>


                        <div className="display-grid">

                            {situation()}
                        </div>

                    </section>


                    <div className="display-flex">

                        {information()}

                    </div>


                </div>
            )
        }
    }


    if (props.listDirection === false) {
        return (
            <div>
                <Link to={"/" + props.type + "/view/" + props.demandCode}>
                    <div className="demand">
                        <div className="content-demand">

                            <section>
                                <div className="name-code">
                                    <h1>{props.name}</h1>
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