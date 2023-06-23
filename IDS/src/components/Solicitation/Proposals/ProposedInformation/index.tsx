import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

import Title from "../../../Fixed/Search/Title";
import ButtonAction from "../../Demands/CrateDemand/Others/ButtonAction";
import notifyUtil from "../../../../utils/notifyUtil";
import "./style.css";
import Input from "../../Demands/CrateDemand/Others/Input";
import ProgressBar from "../../Demands/CrateDemand/Others/ProgressBar";
import ServicesWorker from "../../../../services/workerService";


export default function ProposedInformation() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const demandCode = parseInt(useParams().id || "null");

    const [responsibleBussiness, setResponsibleBussiness]: any = useState("");
    const [responsiblesBussiness, setResponsiblesBussiness]: any = useState([]);
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [fileAttachment, setFileAttachment]: any = useState();



    const handleFileSelected = (e: any): void => {
        const files = Array.from(e.target.files)
        setFileAttachment(files[0])
    }

    const addResponsible = async () => {

        if (responsibleBussiness !== "") {
            // responsiblesBussiness.push(responsibleBussiness);

            await ServicesWorker.findById(responsibleBussiness).then((response: any) => {
                if (response?.workerName !== undefined) {
                    responsiblesBussiness.push(response);
                    setResponsiblesBussiness(responsiblesBussiness);
                } else {
                    notifyUtil.error("Não foi encontrado nenhum usuário.")
                }

            }).catch((error: any) => {
                notifyUtil.error("Não foi encontrado nenhum usuário.")
            });


            if (responsibleBussiness === "") {
                setResponsibleBussiness(" ");
            } else {
                setResponsibleBussiness("");
            }
        } else {
            notifyResponsible();
        }


        setResponsibleBussiness("");
    }

    const deleteResponsible = (responsible: any, index: any): any => {

        responsiblesBussiness.splice(index, 1);
        setResponsiblesBussiness(responsiblesBussiness);

        if (responsibleBussiness === "") {
            setResponsibleBussiness(" ");
        } else {
            setResponsibleBussiness("");
        }
    }


    const nextStep = () => {
        const idResponsiblesBussiness = responsiblesBussiness.map((responsible: any) => {
            return responsible.workerCode;
        })

        let proposal = { idResponsiblesBussiness, start, end, fileAttachment }
        localStorage.setItem('proposal', JSON.stringify(proposal));

        if (responsiblesBussiness === "" || responsiblesBussiness === "" || end === "" || start === "") {
            notifyUtil.error(t("fillAllFields"))
        } else {
            navigate('/proposal/execution-costs/' + demandCode);
        }
    }

    return (
        <div className="create-demands-1 execution-costs">

            <div className="container">


                <div className="background-title">
                    <Title title={t("createProposal")} nav={t("demandResponsibleForTheProject")} />
                    <ProgressBar atual="3" proposal={true} />

                </div>

                <div className="box">


                    <div className="display-flex-grid">
                        <div className="display-flex">

                            <Input label={"responsibleBussiness"} type="text" value={responsibleBussiness} setValue={setResponsibleBussiness} required="true" />

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
                                        <div className="display-flex-align-center">
                                            <div className="code mr20 ml0">{responsible.workerCode}</div>
                                            <span>{responsible.workerName}</span>
                                        </div>
                                        <span className="material-symbols-outlined delete-cost-center" onClick={(e) => deleteResponsible(e, index)}>
                                            delete
                                        </span>
                                    </div>
                                )
                            })
                        }

                    </div>

                    <div className="display-flex-grid dates-input">
                        <div className="date-first">
                            <Input label={"dateStart"} type="date" value={start} setValue={setStart} required="true" />
                        </div>
                        <Input label={"dateEnd"} type="date" value={end} setValue={setEnd} required="true" />
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
        </div >
    );
}


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