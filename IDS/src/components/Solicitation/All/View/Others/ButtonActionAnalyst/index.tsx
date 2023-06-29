import { useState } from "react";

import ModalActionAnalyst from "../ModalActionAnalyst";
import "./style.css";

export default function ButtonActionAnalyst(props: any) {

    const [modal, setModal]: any = useState(false);

    return (
        <div className="modal-action">
            <button className="btn-primary-unique" onClick={() => setModal(!modal)}>
                <span className="material-symbols-outlined">
                    more_vert
                </span>
            </button>

            {props.agenda === undefined ?
                modal && (
                    <div className="modal-action-analyst">
                        <ModalActionAnalyst codeDemand={props.codeDemand} proposal={props.proposal} />
                    </div>
                )
                :
                modal && (
                    <div className="modal-action-analyst">
                        <ModalActionAnalyst agenda={props.agenda} />
                    </div>
                )
            }
        </div>
    );
}