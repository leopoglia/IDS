import { Link, useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import { t } from "i18next";
import ModalChangeStatus from "../ModalChangeStatus";
import "./style.css";
import othersUtil from "../../../../../../utils/othersUtil";


export default function InsetList(props: any) {

    const [modalChangeStatus, setModalChangeStatus] = useState(false);
    const navigate = useNavigate();

    const generatePDF = async () => {

        if (props?.proposal?.proposalCode === undefined) {
            window.open("http://localhost:8443/api/demand/pdf/" + props?.codeDemand, "_blank");
        } else {
            window.open("http://localhost:8443/api/proposal/pdf/" + props?.proposal?.proposalCode, "_blank");
        }
    };

    return (
        <div className="inset-list">
            <div className="modal">
                {props?.codeDemand !== undefined ?
                    <>
                        <Link to={"/messages/message/" + props.codeDemand} >
                            <div className="li li-settings">
                                <span className="material-symbols-outlined">
                                    chat
                                </span>
                                <span>
                                    {t("openConversation")}
                                </span>
                            </div>
                        </Link>

                        <Link to={"/demand/historical/" + props.codeDemand}>
                            <div className="li">
                                <span className="material-symbols-outlined">
                                    history
                                </span>
                                <span>
                                    {t("history")}
                                </span>
                            </div>
                        </Link>

                        <div className="li" onClick={generatePDF}>
                            <span className="material-symbols-outlined">
                                download
                            </span>
                            <span>
                                {t("downloadPDF")}
                            </span>
                        </div>

                        <div className="li" onClick={() => { setModalChangeStatus(!modalChangeStatus) }}>
                            <span className="material-symbols-outlined">
                                change_circle
                            </span>
                            <span>
                                {t("changeStatus")}
                            </span>
                        </div>
                    </>
                    :

                    <>
                        <Link to={"/agenda/create?" + props.agenda.agendaCode} >
                            <div className="li li-settings">
                                <span className="material-symbols-outlined">
                                    edit
                                </span>
                                <span>
                                    {t("edit")}
                                </span>
                            </div>
                        </Link>

                        <div onClick={() => othersUtil.deleteAgenda(props.agenda, navigate)}>
                            <div className="li">
                                <span className="material-symbols-outlined">
                                    close
                                </span>
                                <span>
                                    {t("delete")}
                                </span>
                            </div>
                        </div>
                    </>
                }
            </div>


            {modalChangeStatus && <ModalChangeStatus setModalChangeStatus={setModalChangeStatus} />}

        </div>
    )
}
