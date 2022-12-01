import { Link } from "react-router-dom";
import "./style.css";
import SelectNewStatus from "./SelectNewStatus";

export default function ModalChangeStatus() {
    return (
        <div className="modalChangeStatus">
            <div className="modal">
                <div className="modal-header">
                    <p>Alterar Status</p>



                    <button className="closeModal">

                        <span class="material-symbols-outlined">
                            close
                        </span>

                    </button>
                </div>

                <div className="change">
                    <div className="current">
                        <p>Backlog</p>

                    </div>

                    <div className="display-flex-center">
                        <span class="material-symbols-outlined">
                            sync_alt
                        </span>
                    </div>


                    <div className="new">
                        <SelectNewStatus className="select-new-status"/>
                    </div>

                    <button className="btn-primary">Confirmar</button>

                </div>
            </div>
        </div>
    )
}
