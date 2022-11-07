import "./style.css"
import { useState } from "react";


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
                <div className="modal-analyst">
                    <div>
                        <span>
                            Abrir conversa
                        </span>
                    </div>

                    <div>
                        <span>
                            Baixar em PDF
                        </span>
                    </div>

                    <div>
                        <span>
                            Histórico
                        </span>
                    </div>

                </div>
            )}
        </div>
    );
}
