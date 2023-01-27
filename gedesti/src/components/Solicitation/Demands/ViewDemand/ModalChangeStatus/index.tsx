import "./style.css";
import SelectNewStatus from "./SelectNewStatus";
import { t } from "i18next";
import { useEffect, useState } from 'react';

export default function ModalChangeStatus(props: any) {

    return (
        <div className="modalChangeStatus">
            <div className="modal">
                <div className="modal-header">
                    <p>{t("changeStatus")}</p>



                    <button className="closeModal">

                        <span onClick={() => props.setModalChangeStatus(false)} className="material-symbols-outlined">
                            close
                        </span>

                    </button>
                </div>

                <div className="change">
                    <div className="current">
                        <p>Backlog</p>

                    </div>

                    <div className="display-flex-center">
                        <span className="material-symbols-outlined">
                            sync_alt
                        </span>
                    </div>


                    <div className="new">
                        <SelectNewStatus class="select-new-status" />
                    </div>

                    <button className="btn-primary">{t("confirm")}</button>

                </div>
            </div>
        </div>
    )
}