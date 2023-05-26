import Title from "../../../Fixed/Search/Title";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import MinuteService from "../../../../services/minuteService";
import AgendaService from "../../../../services/agendaService";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../../../context/userContext";
import Editor from "../../Proposals/EditProposalScope/Editor";
import { useNavigate } from "react-router";
import BoxProposal from "./BoxProposal";


export default function CreateMinute() {
    const { t } = useTranslation();
    const code = parseInt(window.location.pathname.split("/")[3]);
    const actualDate = new Date().getUTCDate() + "/" + (new Date().getUTCMonth() + 1) + "/" + new Date().getUTCFullYear();
    const worker = useContext(UserContext).worker;
    const [proposals, setProposals]: any = useState([]);



    useEffect(() => {

        AgendaService.findById(code).then((response: any) => {

            setProposals(response[0].proposals);
        })


    }, [])


    function saveMinute() {

        proposals.forEach((element: any) => {
            console.log(element)
        });


        MinuteService.save(t("unpublishedMinutes") + "", code, actualDate, worker.id, "Not Published");
        MinuteService.save(t("publiquedMinute") + "", code, actualDate, worker.id, "Published");
    }



    return (
        <div className="create-minute view-demand">

            <div className="container">
                <div className="background-title">
                    <Title title={t("createMinute")} nav={t("minuteCreateMinute")} />
                </div>

                {/* <Editor /> */}

                <div className="box">

                    <p className="mb10">{t("proposals")}</p>

                    {proposals?.map((proposal: any, index: any) => {
                        return (
                            <BoxProposal proposal={proposal} index={index} />
                        )
                    })}

                </div>

                <div className="display-flex-end">
                    <Link to="/minutes/1">
                        <button onClick={saveMinute} className="btn-primary">{t("save")}</button>
                    </Link>

                </div>


            </div>
        </div>
    );
}