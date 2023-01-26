import Header from "../../../Fixed/Header";
import Nav from "../../../Fixed/Nav";
import Title from "../../../Fixed/Search/Title";
import Editor from "../../Proposals/EditProposalScope/Editor";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";


export default function CreateMinute() {
    const { t } = useTranslation();

    return (
        <div className="create-minute">
            <Header icon="file_copy" title="createMinute" />
            <Nav />
            <div className="container">
                <div className="background-title">
                    <Title title={t("createMinute")} nav={t("minuteCreateMinute")} />
                </div>

                <Editor />

                <Link to="/agendas">
                    <div className="display-flex-end">
                        <button className="btn-primary">{t("save")}</button>
                    </div>
                </Link>


            </div>
        </div>
    );
}