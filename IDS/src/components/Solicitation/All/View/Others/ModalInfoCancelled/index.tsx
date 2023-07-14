import { t } from "i18next";
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useTranslation } from "react-i18next";

import ServicesReproach from "../../../../../../services/reproachService";
import "../ModalChangeStatus/style.css";

export default function ModalInfoCancelled(props: any) {

    const { t } = useTranslation();
    const demandCode: any = JSON.parse(window.location.pathname.split("/")[3]);
    const [reproach, setReproach] = useState<any>();

    useEffect(() => {
        ServicesReproach.findByDemandCode(demandCode).then((response) => {
            setReproach(response);
        })

    }, []);


    return (
        <div className="modalChangeStatus modalInfoCancelled">
            <div className="modal">
                <div className="modal-header">
                    <p>{t("reasonForDisapproval")}</p>

                    <button className="closeModal">

                        <span onClick={() => props.setModalCancelled(false)} className="material-symbols-outlined">
                            close
                        </span>

                    </button>
                </div>

                <div className="change">

                    <span className="reproachDescription">{reproach?.reproachDescription}</span>

                    <span>{t("repprover")}: {reproach?.worker.workerName}</span>

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