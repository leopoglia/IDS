import "./style.css"
import { useTranslation } from "react-i18next";
import Tooltip from '@mui/material/Tooltip';
import { useEffect, useState } from "react";

export default function Situation(props: any) {

    const { t } = useTranslation();

    useEffect(() => { 

        // if (props.situation) {
        //     // dar espaço quando a letra for maiuscula no props.situation
        //     setSituationSeparate(props.situation.replace(/([A-Z])/g, ' $1'));
        // }




    }, [props.situation])


    const situation = () => {
        if (props.situation === "Backlog" || props.situation === "BacklogEdit") {
            return (<div className="situation-backlog">10%</div>);
        } else if (props.situation === "BacklogRanked") {
            return (<div className="situation-backlog-ranked">15%</div>);
        } else if (props.situation === "BacklogRankApproved") {
            return (<div className="situation-backlog-ranked-approved">20%</div>);
        } else if (props.situation === "BacklogComplement") {
            return (<div className="situation-backlog-complement">25%</div>);
        } else if (props.situation === "Assesment") {
            return (<div className="situation-assesment">30%</div>);
        } else if (props.situation === "Business Case") {
            return (<div className="situation-business-case">40%</div>);
        } else if (props.situation === "To-do") {
            return (<div className="situation-to-do">60%</div>);
        } else if (props.situation === "Design and Build") {
            return (<div className="situation-design-and-build">80%</div>);
        } else if (props.situation === "Cancelled") {
            return (<div className="situation-cancelled">{t("canceled")}</div>);
        } else if (props.situation === "Support") {
            return (<div className="situation-support">{t("support")}</div>);
        } else if (props.situation === "Done") {
            return (<div className="situation-done">100%</div>);
        }

        if (props.situation === "Approved") {
            return (<div className="graphic-proposal">{t("approved")}<div className="situation-approved"></div></div>);
        } else if (props.situation === "Rejected") {
            return (<div className="graphic-proposal">{t("rejected")}<div className="situation-rejected"></div></div>);
        } else if (props.situation === "Pending") {
            return (<div className="graphic-proposal">{t("pending")}<div className="situation-pending"></div></div>);
        }
    }

    if (props.type === "demand") {
        return (
            <Tooltip title={t("situation-" + props.situation)} arrow>
                <div className="graphic">
                    {situation()}
                </div>
            </Tooltip>
        );
    } else if (props.type === "proposal") {
        return (
            <Tooltip title={t(props.situation)} arrow>
                <div className="graphic-proposal">
                    {situation()}
                </div>
            </Tooltip>
        );
    } else {
        return (
            <div>
            </div>
        );
    }
}