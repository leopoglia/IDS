import Header from "../../../Fixed/Header";
import Nav from "../../../Fixed/Nav";
import Title from "../../../Fixed/Search/Title";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import MinuteService from "../../../../services/minuteService";

export default function CreateMinute() {
    const { t } = useTranslation();
    const code = parseInt(window.location.pathname.split("/")[3]);

    console.log(code);

    function saveMinute() {
        console.log("salvar");
        MinuteService.save("minute 01", "", null, code);
    }
 
    return (
        <div className="create-minute">
            <Header/>
            <Nav />
            <div className="container">
                <div className="background-title">
                    <Title title={t("createMinute")} nav={t("minuteCreateMinute")} />
                </div>

                {/* <Editor /> */}

                <Link to="/agendas/1">
                    <div className="display-flex-end">
                        <button onClick={saveMinute} className="btn-primary">{t("save")}</button>
                    </div>
                </Link>


            </div>
        </div>
    );
}