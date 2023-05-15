import Title from "../../../Fixed/Search/Title";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import MinuteService from "../../../../services/minuteService";
import AgendaService from "../../../../services/agendaService";
import { useContext } from "react";
import UserContext from "../../../../context/userContext";

export default function CreateMinute() {
    const { t } = useTranslation();
    const code = parseInt(window.location.pathname.split("/")[3]);
    const actualDate = new Date().getUTCDate() + "/" + (new Date().getUTCMonth() + 1) + "/" + new Date().getUTCFullYear();
    const worker = useContext(UserContext).worker;

    let agenda = AgendaService.findById(code);  


    function saveMinute() {
        MinuteService.save(t("unpublishedMinutes") + " "+ code, code, actualDate, worker.id, "Not Published");
        MinuteService.save(t("publiquedMinute") + " " + code, code, actualDate, worker.id, "Published");
    }
 
    return (
        <div className="create-minute">
       
            <div className="container">
                <div className="background-title">
                    <Title title={t("createMinute")} nav={t("minuteCreateMinute")} />
                </div>

                {/* <Editor /> */}

                <Link to="/minutes/1">
                    <div className="display-flex-end">
                        <button onClick={saveMinute} className="btn-primary">{t("save")}</button>
                    </div>
                </Link>


            </div>
        </div>
    );
}