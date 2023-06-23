import { t } from "i18next";
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

import ServicesDemand from "../../../../../../services/demandService";
import SelectNewStatus from "./SelectNewStatus";
import "./style.css";

export default function ModalChangeStatus(props: any) {


    const [status, setStatus] = useState("");
    const [statusChange, setStatusChange] = useState("");
    const demandCode: number = JSON.parse(window.location.pathname.split("/")[3]);


    useEffect(() => {
        ServicesDemand.findById(demandCode).then((response: any) => {
            setStatus(response.demandStatus);
        })
    }, [props.codeDemand])

    const changeStatus = () => {
        ServicesDemand.updateStatus(demandCode, statusChange).then((response: any) => {
            notifySucess();
            props.setModalChangeStatus(false);
        })
    }

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
                        <p>{status}</p>

                    </div>

                    <div className="display-flex-center">
                        <span className="material-symbols-outlined">
                            sync_alt
                        </span>
                    </div>


                    <div className="new">
                        <SelectNewStatus setStatusChange={setStatusChange} class="select-new-status" />
                    </div>

                    <button className="btn-primary" onClick={changeStatus}>{t("confirm")}</button>

                </div>
            </div>
        </div>
    )
}

const notifySucess = () => {
    toast.success('Status aleterado!', {
        position: "bottom-right",
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
};