import "./style.css"
import { useState } from "react";
import ModalActionAnalyst from "../ModalActionAnalyst";


export default function ButtonActionAnalyst() {

    const [modal, setModal] = useState(false);


    return (
        <div>
            <button className="btn-primary-unique" onClick={() => setModal(!modal)}>
                <span className="material-symbols-outlined">
                    more_vert
                </span>
            </button>

            {modal && (
                <div className="modal-action-analyst">
                    <ModalActionAnalyst />
                </div>
            )}
        </div>
    );
}
