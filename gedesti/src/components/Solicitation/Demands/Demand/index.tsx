import "./style.css";
import { Link } from "react-router-dom";
import Situation from "./Situation/index";
import { useTranslation } from "react-i18next";


export default function Demand(props: any) {
    const { t, i18n } = useTranslation();

    const information = () => {
        if (props.analyst == null) {
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
                    <div className="requester"><p>{t("requester")}: {props.requester}</p></div>
                    <div><p>{t("date")}: {props.date}</p></div>
                    <div className="analyst"><p>{t("analyst")}: {props.analyst}</p></div>
                </div>)
            )
        }
    }

    const btnGenerateProposal = () => {
        if (props.situation === "Backlog") {
            return (
                <Link to="/proposal/demand">
                    <button className="btn-primary">{t("generateProposal")}</button>
                </Link>
            );
        }
    }

    const situation = () => {
        if (props.type === "demand" || props.type === "proposal") {
            return (
                <Situation type={props.type} situation={props.situation} />
            );
        }
    }


    if (props.listDirection === false) {
        return (
            <Link to={"/" + props.type + "/view"}>
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
        );
    } else {
        return (
            <Link to={"/" + props.type + "/view"}>
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
        );
    }
}