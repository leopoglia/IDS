import { useState, useEffect, useContext } from 'react';
import "./style.css"
import Header from "../../../../Fixed/Header"
import Nav from "../../../../Fixed/Nav"
import Title from "../../../../Fixed/Search/Title";
import ProgressBar from "../ProgressBar";
import ButtonAction from "../ButtonAction";
import { useTranslation } from "react-i18next";
import Services from "../../../../../services/demandService";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";
import UserContext from "../../../../../context/userContext";

export default function CreateDemands3() {

    const { t } = useTranslation();
    const navigate = useNavigate();

    // const [demandAttachment, setdemandAttachment]: any = useState(""); 
    const [executionPeriod, setExecutionPeriod]: any = useState(""); // Periodo de execução
    const [demandInitial, setDemand]: any = useState({}); // Demanda inicial
    const [fileAttachment, setFileAttachment]: any = useState(); // Anexo

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

        let actualDate = new Date().getUTCDate() + "/" + (new Date().getUTCMonth() + 1) + "/" + new Date().getUTCFullYear(); // Data atual

        // Salvando a demanda
        await Services.save(demandTitle,
            currentProblem,
            demandObjective,
            costCenter,
            "Backlog",
            20,
            executionPeriod,
            workerCode,
            realBenefitCode,
            potentialBenefitCode,
            qualitativeBenefitCode,
            fileAttachment,
            actualDate
        ).then((response) => {
            // Salvando a rota para redirecionar para a página de demandas
            localStorage.setItem("route", "create-demand")
            // Redirecionando para a página de demandas
            navigate("/demands");
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
        setFileAttachment(files[0])
    }

    return (
        <div className="create-demands-3">
            <Header />
            <Nav />

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

                    <label>{t("attachments")}</label>

                    <div className="attachments">
                        <input type="file" id="file" onChange={handleFileSelected} />
                        <label htmlFor="file">
                            <span className="material-symbols-outlined">
                                upload_file
                            </span>{t("sendAttachment")}</label>
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