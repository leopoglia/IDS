import { Link } from "react-router-dom";
import { useState } from "react";
import "./style.css";
import ModalChangeStatus from "../ModalChangeStatus";

export default function InsetList() {

    const [modalChangeStatus, setModalChangeStatus] = useState(false);




    return (
        <div className="inset-list">
            <div className="modal">

                <Link to="/messages/message">
                    <div className="li li-settings">
                        <span className="material-symbols-outlined">
                            chat
                        </span>
                        <span>
                            Abrir conversa
                        </span>
                    </div>
                </Link>

                <Link to="/demand/historical">
                    <div className="li">
                        <span className="material-symbols-outlined">
                            history
                        </span>
                        <span>
                            Histórico
                        </span>
                    </div>
                </Link>

                <Link to="/">
                    <div className="li">
                        <span className="material-symbols-outlined">
                            download
                        </span>
                        <span>
                            Baixar PDF
                        </span>
                    </div>
                </Link>

                <div className="li" onClick={() => { setModalChangeStatus(!modalChangeStatus) }}>
                    <span className="material-symbols-outlined">
                        change_circle
                    </span>
                    <span>
                        Alterar Status
                    </span>
                </div>

            </div>

            {modalChangeStatus && <ModalChangeStatus />}
            
        </div>
    )
}
