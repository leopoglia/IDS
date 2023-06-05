import { Link } from "react-router-dom";
import { useState } from "react";
import { t } from "i18next";

import ModalChangeStatus from "../ModalChangeStatus";
import "./style.css";


export default function InsetList(props: any) {

    const [modalChangeStatus, setModalChangeStatus] = useState(false);

    const generatePDF = async () => {
        window.open("http://localhost:8443/api/demand/pdf/" + props.codeDemand, "_blank");
    };




    return (
        <div className="inset-list">
            <div className="modal">

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

            </div>

            {modalChangeStatus && <ModalChangeStatus setModalChangeStatus={setModalChangeStatus} />}

        </div>
    )
}
