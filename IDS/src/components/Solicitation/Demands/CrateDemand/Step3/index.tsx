import { useState, useEffect, useContext } from 'react';
import "./style.css"
import Title from "../../../../Fixed/Search/Title";
import ProgressBar from "../ProgressBar";
import ButtonAction from "../ButtonAction";
import { useTranslation } from "react-i18next";
import Services from "../../../../../services/demandService";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";
import UserContext from "../../../../../context/userContext";
import othersUtil from '../../../../../utils/othersUtil';

export default function CreateDemands3() {

    const { t } = useTranslation();
    const navigate = useNavigate();

    // const [demandAttachment, setdemandAttachment]: any = useState(""); 
    const [executionPeriod, setExecutionPeriod]: any = useState(""); // Periodo de execução
    const [demandInitial, setDemand]: any = useState({}); // Demanda inicial
    const [fileAttachment, setFileAttachment]: any = useState([]); // Anexo

    useEffect(() => { 
        // Pegando a demanda inicial
        setDemand(JSON.parse(localStorage.getItem("demand") || "{}"));
    }, []);

    let worker: any = useContext(UserContext).worker; // Pegando o funcionário
    let workerCode = worker.id; // Código do funcionário

    async function cadastrarDemanda() {
        // Verificando se os campos obrigatórios foram preenchidos
        if (executionPeriod === "") {
            notify();
            return;
        }

        let demandTitle: any = demandInitial.titleInput; // Título da demanda
        let currentProblem: any = demandInitial.currentSituation; // Problema atual
        let demandObjective: any = demandInitial.objective; // Objetivo 
        let costCenter: any = demandInitial.costCenter; // Centro de custo

        let realBenefits: any = localStorage.getItem("realBenefits"); // Pegando o benefício real
        let realBenefitCode = JSON.parse(realBenefits).realBenefitCode; // Código do benefício real
        let potentialBenefits: any = localStorage.getItem("potentialBenefits"); // Pegando o benefício potencial
        let potentialBenefitCode = JSON.parse(potentialBenefits).potentialBenefitCode; // Código do benefício potencial
        let qualitativeBenefits: any = localStorage.getItem("qualitativeBenefits"); // Pegando o benefício qualitativo
        let qualitativeBenefitCode = JSON.parse(qualitativeBenefits).qualitativeBenefitCode; // Código do benefício qualitativo

        // Salvando a demanda
        await Services.save(demandTitle,
            currentProblem,
            demandObjective,
            costCenter,
            "Backlog",
            null,
            executionPeriod,
            workerCode,
            realBenefitCode,
            potentialBenefitCode,
            qualitativeBenefitCode,
            fileAttachment[0]
            ).then((response) => {
            // Salvando a rota para redirecionar para a página de demandas
            localStorage.setItem("route", "create-demand")
            // Redirecionando para a página de demandas
            navigate("/demands/1");
        }).catch((error) => {
            console.log(error)
        })

        // Limpando o localStorage 
        localStorage.removeItem("demand");
        localStorage.removeItem("realBenefits");
        localStorage.removeItem("potentialBenefits");
        localStorage.removeItem("qualitativeBenefits");
    }

    // Função para pegar o arquivo selecionado
    const handleFileSelected = (e: any): void => {
        const files = Array.from(e.target.files)
        let filesArray: any = [];
        for (let i = 0; i < files.length; i++) {
            filesArray.push(files[i]);
        }

        setFileAttachment(filesArray);
    }

    // const attatchmentType = (demand: any) => {
    //     if (demand.type === "image/png" || demand.type === "image/jpeg") {
    //         return "png";
    //     } else if (demand.type === "application/pdf") {
    //         return "pdf";
    //     } else if (demand.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
    //         return "word";
    //     } else if (demand.type === "application/msword" || demand.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
    //         demand.demandAttachment.type === "application/vnd.ms-excel") {
    //         return "excel";
    //     } else if (demand.type === "application/zip") {
    //         return "zip";
    //     } else if (demand.type === "application/x-rar-compressed") {
    //         return "rar";
    //     }
    // }

    return (
        <div className="create-demands-3">
    

            <div className="container">
                <div className="background-title">
                    <Title nav="demandsCreateDemand" title="createDemand" />

                    <ProgressBar atual="3" />
                </div>

                <div className="box">

                    <p>{t("additionals")}</p>

                    <div className="frequency">
                        <label>{t("frequencyUse")} * </label>
                        <input type="text" onChange={(e) => { setExecutionPeriod(e.target.value) }} />
                    </div>


                    <div className="attachments display-flex">

                        <div className=''></div>

                        <div className='display-block'>
                            <span>{t("attachments")}</span>

                            <input type="file" id="file" onChange={handleFileSelected} multiple />
                            <label htmlFor="file">
                                <span className="material-symbols-outlined">
                                    upload_file
                                </span>{t("sendAttachment")}</label>
                        </div>



                        {
                            fileAttachment.map((file: any, index: any) => {
                                return (
                                    <div className="attachments" key={index}>

                                        <div className="attachment">
                                            <div className="attachment-image">
                                                <img src={"/attachment/" + othersUtil.attatchmentType(file) + ".png"} alt="" />
                                            </div>
                                            <span>{file.name}</span>
                                        </div>


                                    </div>
                                )
                            })
                        }
                    </div>

                </div>

                <div className="demands-footer">
                    <ButtonAction page="2" click="voltar"></ButtonAction>
                    <div onClick={() => { cadastrarDemanda() }}>
                        <ButtonAction click="avancar"></ButtonAction>
                    </div>
                </div>
            </div>

            <ToastContainer position="bottom-right" newestOnTop />

        </div>
    );
}

// Notificação de erro ao preencher os campos obrigatórios
const notify = () => {
    toast.error('Preencha todos os campos!', {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
};