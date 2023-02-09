import "./style.css"
import { useState, useEffect } from "react";
import Header from "../../../Fixed/Header";
import Nav from "../../../Fixed/Nav";
import Title from "../../../Fixed/Search/Title";
import SelectSizeDemand from "./SelectSizeDemand";
import { useTranslation } from "react-i18next";
import ServicesClassification from "../../../../services/classificationService"
import ServicesDemand from "../../../../services/demandService";
import ServicesNotification from "../../../../services/notificationService";
import { Link } from "react-router-dom";
import { toast, ToastContainer, TypeOptions } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";


export default function RankDemand() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [buBenefited, setBuBenefited] = useState(""); // Unidade de negócio beneficiada
    const [buBenefiteds, setBuBenefiteds]: any = useState([]); // Unidades de negócio beneficiadas
    const [demand, setDemand]: any = useState({}); // Demanda
    const url = parseInt(window.location.href.split("/")[5]); // Pegando o id da demanda

    useEffect(() => {
        // Pegando a demanda inicial
        getDemand();
    }, [])

    async function getDemand() {
        setDemand(await ServicesDemand.findById(url));
    }

    // Salvando a classificação da demanda
    function saveToRank() {
        let classification = JSON.parse(localStorage.getItem("classification") || "{}"); // Pegando os dados da classificação
        let analysis = JSON.parse(localStorage.getItem("worker") || "{}"); // Pegando os dados do analista


        if (classification.size === "" || classification.ti === "" || classification.buReq === "" || classification.buBenList === undefined) {
            notify();
            return;
        } else {
            // Salvando a classificação
            ServicesClassification.save(classification.size, classification.ti, -1, "", classification.buReq, classification.buBenList, analysis.id).then((response: any) => {
                let classificationCode = response.classificationCode; // Pegando o código da classificação

                // Atualizando a classificação da demanda
                ServicesDemand.updateClassification(demand.demandCode, classificationCode).then((response: any) => {

                    ServicesDemand.updateStatus(url, "BacklogRanked").then((response: any) => {
                        localStorage.setItem("route", "classification");
                        localStorage.removeItem("classification");

                        ServicesNotification.save("Um analista classificou a sua demanda de código  " + demand.demandCode, demand.requesterRegistration.workerCode , "done");

                        navigate("/demand/view/" + url)
                    }).catch((error: any) => {
                        console.log(error)
                    })

                }).catch((error: any) => {
                    console.log(error)
                })

            }).catch((error: any) => {
                console.log(error)
            })
        }



    }

    // Deletando a unidade de negócio beneficiada
    function deleteBuBenefited(bu: any) {

        return () => {
            const index = buBenefiteds.indexOf(bu);
            if (index > -1) {
                buBenefiteds.splice(index, 1);
            }
            setBuBenefiteds(buBenefiteds);

            let classification = JSON.parse(localStorage.getItem("classification") || "{}");
            classification.buBenList = buBenefiteds;
            localStorage.setItem("classification", JSON.stringify(classification));

            if (buBenefited === " ") {
                setBuBenefited("");
            } else {
                setBuBenefited(" ");
            }
        }

    }

    return (
        <div className="rank-demand">
            <Header icon="bar_chart" title="classifyDemand" />

            <Nav />


            <div className="container">

                <div className="background-title">

                    <Title nav="demandViewDemandClassify" title="classifyDemand" />

                </div>

                <div className="box">

                    <div className="size-demand">

                        <label htmlFor="">{t("size")} *</label>

                        <SelectSizeDemand type="size" />

                    </div>

                    <div className="ti-section">

                        <label htmlFor="">{t("responsibleItSession")} *</label>

                        <SelectSizeDemand type="ti" />

                    </div>

                    <div className="bu-requester">

                        <label htmlFor="">{t("requesterBU")} *</label>

                        <SelectSizeDemand type="buReq" />

                    </div>

                    <div className="bu-benefited">

                        <label htmlFor="">{t("buBenefited")} *</label>


                        <div className="select-bu display-flex">
                            <SelectSizeDemand setBuBenefiteds={setBuBenefiteds} buBenefiteds={buBenefiteds} type="buBen" />
                        </div>

                        {buBenefiteds.map((bu: any) => {
                            return <div className="costCenter">{bu}
                                <span className="material-symbols-outlined delete-cost-center" onClick={deleteBuBenefited(bu)}>
                                    delete
                                </span>
                            </div>
                        })
                        }
                    </div>


                    <div>

                        <label htmlFor="">{t("attachments")} </label>

                        <div className="attachments">
                            <input type="file" id="file" />
                            <label htmlFor="file">
                                <span className="material-symbols-outlined">
                                    upload_file
                                </span>{t("sendAttachment")}</label>
                        </div>

                    </div>
                </div>

                <div className="demands-footer">

                    <Link to={"/demand/view/" + url}>
                        <button className="btn-secondary">
                            <span>{t("return")}</span>
                        </button>
                    </Link>


                    <button onClick={() => saveToRank()} className="btn-primary">
                        <span>{t("toRank")}</span>
                    </button>



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