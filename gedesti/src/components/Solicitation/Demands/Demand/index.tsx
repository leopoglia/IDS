import "./style.css";
import { Link } from "react-router-dom";
import Situation from "./Situation/index";
import { useTranslation } from "react-i18next";
import { useState } from "react";


export default function Demand(props: any) {
    const worker: any = localStorage.getItem("worker");
    const office = JSON.parse(worker).office;
    const { t } = useTranslation();

    const information = () => {
        if (props.analyst == null) {
            if (props.director == null) {
                return (
                    (<div className="infos">
                        <div className="code">1000025500</div>
                        <div className="requester"><p>{t("requester")}: {props.requester}</p></div>
                        <div><p>{t("date")}: {props.date}</p></div>
                        <div className="situation"><p>{t("situation")}: {props.situation}</p></div>
                    </div>)
                )
            } else {
                return (
                    (<div className="infos">
                        <div className="code">1000025500</div>
                        <div className="requester"><p>{t("director")}: {props.director}</p></div>
                        <div><p>{t("date")}: {props.date}</p></div>
                        <div className="analyst"><p>{t("coordinator")}: {props.coordinator}</p></div>
                    </div>)
                )
            }
        } else if (props.analyst != null) {
            return (
                (<div className="infos">
                    <div className="code">1000025500</div>
                    <div className="requester"><p>{t("requester")}: {props.requester}</p></div>
                    <div><p>{t("date")}: {props.date}</p></div>
                    <div className="analyst"><p>{t("analyst")}: {props.analyst}</p></div>
                </div>)
            )
        }
    }

    const btnGenerateProposal = () => {
        if (props.situation === "Backlog") {
            if (office === "analyst" || office === "ti") {
                return (
                    <Link to={"/proposal/demand/" + props.demandCode}>
                        <button className="btn-primary">{t("generateProposal")}</button>
                    </Link>
                );
            }
        }
    }

    const [showModal, setShowModal] = useState(false);

    const handleMouseOver = () => {
        setShowModal(true);
    }

    const handleMouseOut = () => {
        setTimeout(() => {
            setShowModal(false);
        }, 500);
    }


    const situation = () => {
        if (props.type === "demand" || props.type === "proposal") {
            return (
                <div className="situation-demand" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                    <Situation type={props.type} situation={props.situation} />
                </div>
            );
        }
    }


    if (props.type === "minute") {
        if (props.listDirection === false) {
            return (
                <div className="demand">
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
                {showModal &&
                    <div className="background-modal">
                        <div className="modal">
                            <div className="title-situation">{t("situation")}: Já foi classificada pelo Analista</div>
                            <div className="progress">
                                <div className="progress-bar" role="progressbar" style={{ width: "25%" }} aria-valuenow={25} aria-valuemin={0} aria-valuemax={100} />
                            </div>
                        </div>
                    </div>
                }

                <Link to={"/" + props.type + "/view/" + props.demandCode}>
                    <div className="demand">
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
                </Link>
            </div>
        );
    } else {
        return (
            <div>
                {showModal &&
                    <div className="background-modal">
                        <div className="modal">
                            <div className="title-situation">{t("situation")}: Já foi classificada pelo Analista</div>
                            <div className="progress">
                                <div className="progress-bar" role="progressbar" style={{ width: "25%" }} aria-valuenow={25} aria-valuemin={0} aria-valuemax={100} />
                            </div>
                        </div>
                    </div>
                }
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