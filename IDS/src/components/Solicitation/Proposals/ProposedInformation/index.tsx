import Header from "../../../Fixed/Header";
import Nav from "../../../Fixed/Nav";
import Title from "../../../Fixed/Search/Title";
import SelectCostExecution from "./SelectCostExecution";
import { Link } from "react-router-dom";
import "./style.css";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import ButtonAction from "../../Demands/CrateDemand/ButtonAction";


export default function ProposedInformation() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const demandCode = parseInt(window.location.href.split("/")[5]);

    const [responsibleBussiness, setResponsibleBussiness]: any = useState("");
    const [responsiblesBussiness, setResponsiblesBussiness]: any = useState([]);
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [fileAttachment, setFileAttachment]: any = useState();



    const handleFileSelected = (e: any): void => {
        const files = Array.from(e.target.files)
        setFileAttachment(files[0])
    }

    const addResponsible = () => {

        if (responsibleBussiness !== "") {
            responsiblesBussiness.push(responsibleBussiness);
        } else {
            notifyResponsible();
        }


        setResponsibleBussiness("");
    }

    const deleteResponsible = (responsible: any): any => {
        let index = responsiblesBussiness.indexOf(responsible);
        responsiblesBussiness.splice(index, 1);
        setResponsiblesBussiness(responsiblesBussiness);

        if (responsibleBussiness === "") {
            setResponsibleBussiness(" ");
        } else {
            setResponsibleBussiness("");
        }
    }


    const nextStep = () => {
        let proposal = { responsiblesBussiness, start, end, fileAttachment }
        localStorage.setItem('proposal', JSON.stringify(proposal));
        
        if (responsiblesBussiness === "" || responsiblesBussiness === "" || end === "" || start === "") {
            notify();
        } else {
            navigate('/proposal/execution-costs/' + demandCode);
        }
    }

    return (
        <div className="execution-costs">

            <Header />

            <Nav />

            <div className="container">


                <div className="background-title">
                    <Title title={t("responsiblesForTheProject")} nav={t("demandResponsibleForTheProject")} />
                </div>

                <div className="box">


                    <div className="display-flex-grid">
                        <div className="display-flex">

                            <div>
                                <label>{t("responsibleBussiness")} *</label>
                                <input type="text" onChange={(e) => { setResponsibleBussiness(e.target.value) }} />
                            </div>
                            <div className="btn-primary w45" onClick={addResponsible}>
                                <span className="material-symbols-outlined">add</span>
                            </div>
                        </div>

                    </div>

                    <div>

                        {
                            responsiblesBussiness.map((responsible: any, index: number) => {
                                return (
                                    <div className="costCenter" key={index}>
                                        {responsible}

                                        <span className="material-symbols-outlined delete-cost-center" onClick={deleteResponsible}>
                                            delete
                                        </span>
                                    </div>
                                )
                            })
                        }

                    </div>

                    <div className="display-flex-grid">
                        <div className="one">
                            <label>{t("start")} *</label>
                            <input type="date" onChange={(e) => { setStart(e.target.value) }} />
                        </div>

                        <div>
                            <label>{t("end")} *</label>
                            <input type="date" onChange={(e) => { setEnd(e.target.value) }} />
                        </div>
                    </div>

                    <div className="display-btn-anexo">
                        <label>{t("attachment")}</label>
                        <div className="attachments">
                            <input type="file" id="file" onChange={handleFileSelected} />
                            <label htmlFor="file">
                                <span className="material-symbols-outlined">
                                    upload_file
                                </span>

                                {t("sendAttachment")}</label>
                        </div>
                    </div>
                </div>

                <div className="demands-footer">
                    <Link to={"/proposal/edit-scope/" + demandCode}>
                        <button className="btn-secondary">{t("return")}</button>
                    </Link>

                    <div onClick={() => { nextStep() }}>
                        <ButtonAction click="advance"></ButtonAction>
                    </div>
                </div>
            </div>
            <ToastContainer position="bottom-right" newestOnTop />

        </div >
    );
}

// Notificação de erro ao preencher os campos obrigatórios
const notify = () => {
    toast.error('Preencha todos os campos!', {
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

const notifyResponsible = () => {
    toast.error('Adicione um responsavel', {
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