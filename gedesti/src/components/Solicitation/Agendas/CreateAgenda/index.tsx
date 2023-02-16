import Header from "../../../Fixed/Header";
import Nav from "../../../Fixed/Nav";
import Title from "../../../Fixed/Search/Title";
import "./style.css";
import { Link } from "react-router-dom";
import Input from "../../Demands/CrateDemand/Input";
import { useTranslation } from "react-i18next";

export default function CreateAgenda() {

    const { t } = useTranslation();

    return (
        <div className="create-agenda">
            <Header icon="file_copy" title="createAgenda" />
            <Nav />
            <div className="container">
                <div className="background-title">
                    <Title title={t("createAgenda")} nav={t("agendaCreateAgenda")} />
                </div>

                <div className="box">

                    <div className="display-flex">
                        <p>{t("proposals")}</p>

                    </div>


                    <div className="proposals-agenda">
                        <div className="proposal">
                            <div className="proposal-agenda">
                                <span>{t("proposalName")}</span>


                                <div className="delete-proposal-agenda">
                                    <span className="material-symbols-outlined">
                                        delete
                                    </span>


                                </div>


                            </div>


                            <div className="check-box">

                                <input type="checkbox" />

                                <label>{t("publiquedMinute")}</label>

                            </div>
                        </div>

                        <div className="display-flex-end">
                            <Link to="/agenda/select-proposals">
                                <button className="btn-primary">{t("addProposal")}</button>
                            </Link>
                        </div>


                    </div>


                    <div className="display-flex">
                        <Input label={t("agendaName")} required="*" />
                        <Input label={t("number")} required="*" />
                        <Input label={t("year")} required="*" />
                    </div>


                </div>


                <div className="display-flex-end">
                    <Link to="/agendas">
                        <button className="btn-primary">{t("save")}</button>
                    </Link>
                </div>

            </div>
        </div>

    )
}