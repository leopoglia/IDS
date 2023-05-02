import "./style.css"
import { useState } from "react";
import ModalActionAnalyst from "../ModalActionAnalyst";



export default function ButtonActionAnalyst(props:any) {

    const [modal, setModal]: any = useState(false);


    return (
        <div className="modal-action">
            <button className="btn-primary-unique" onClick={() => setModal(!modal)}>
                <span className="material-symbols-outlined">
                    more_vert
                </span>
            </button>

            {modal && (
                <div className="modal-action-analyst">
                    <ModalActionAnalyst codeDemand={props.codeDemand} />
                </div>
            )}
        </div>
    );
}