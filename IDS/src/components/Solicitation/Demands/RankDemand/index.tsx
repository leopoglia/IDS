import "./style.css"
import { useState, useEffect, useContext } from "react";
import Header from "../../../Fixed/Header";
import Nav from "../../../Fixed/Nav";
import Title from "../../../Fixed/Search/Title";
import SelectSizeDemand from "./SelectSizeDemand";
import { useTranslation } from "react-i18next";
import ServicesClassification from "../../../../services/classificationService"
import ServicesDemand from "../../../../services/demandService";
import ServicesNotification from "../../../../services/notificationService";
import ServicesBu from "../../../../services/buService";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import UserContext from "../../../../context/userContext";


export default function RankDemand() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [buBenefited, setBuBenefited] = useState(""); // Unidade de negócio beneficiada
    const [buBenefiteds, setBuBenefiteds]: any = useState([]); // Unidades de negócio beneficiadas
    const [buBenefitedsList, setBuBenefitedsList]: any = useState([]); // Lista de unidades de negócio beneficiadas
    const [demand, setDemand]: any = useState({}); // Demanda
    const [fileAttachment, setFileAttachment]: any = useState([]);
    const url = parseInt(window.location.href.split("/")[5]); // Pegando o id da demanda

    useEffect(() => { 
        // Pegando a demanda inicial
        getDemand();

        for (let i = 0; i < buBenefiteds.length; i++) {
            ServicesBu.findById(buBenefiteds[i]).then((response: any) => {
                setBuBenefitedsList([...buBenefitedsList, response]);
            }).catch((error: any) => {
                console.log(error)
            })
        }


    }, [buBenefiteds])

    async function getDemand() {
        setDemand(await ServicesDemand.findById(url));
    }

    // Salvando a classificação da demanda
    let analysis = useContext(UserContext).worker; // Pegando o analista


    function saveToRank() {
        let classification = JSON.parse(localStorage.getItem("classification") || "{}"); // Pegando os dados da classificação


        if (classification.size === "" || classification.ti === "" || classification.buReq === "" || classification.buBenList === undefined) {
            notify();
            return;
        } else {
            // Salvando a classificação
            ServicesClassification.save(classification.size, classification.ti, -1, "", classification.buReq, classification.buBenList, analysis.id, fileAttachment[0]).then((response: any) => {
                let classificationCode = response.classificationCode; // Pegando o código da classificação

                // Atualizando a classificação da demanda
                ServicesDemand.updateClassification(demand.demandCode, classificationCode).then((response: any) => {

                    ServicesDemand.updateStatus(url, "BacklogRanked").then((response: any) => {
                        localStorage.setItem("route", "classification");
                        localStorage.removeItem("classification");

                        ServicesNotification.save("Um analista classificou a sua demanda de código  " + demand.demandCode, demand.requesterRegistration.workerCode, "done", "demand");

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
            const index = buBenefiteds.indexOf(bu.buCode);
            if (index > -1) {
                buBenefiteds.splice(index, 1);
                buBenefitedsList.splice(index, 1);
            }
            setBuBenefiteds(buBenefiteds);
            setBuBenefitedsList(buBenefitedsList);
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

    const handleFileSelected = (e: any): void => {
        const files = Array.from(e.target.files)
        let filesArray: any = [];
        for (let i = 0; i < files.length; i++) {
            filesArray.push(files[i]);
        }

        setFileAttachment(filesArray);
    }


    const attatchmentType = (demand: any) => {
        if (demand.type === "image/png" || demand.type === "image/jpeg") {
            return "png";
        } else if (demand.type === "application/pdf") {
            return "pdf";
        } else if (demand.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
            return "word";
        } else if (demand.type === "application/msword" || demand.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
            demand.demandAttachment.type === "application/vnd.ms-excel") {
            return "excel";
        } else if (demand.type === "application/zip") {
            return "zip";
        } else if (demand.type === "application/x-rar-compressed") {
            return "rar";
        }
    }

    return (
        <div className="rank-demand">
          

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

                        {buBenefitedsList.map((bu: any, index:any) => {
                            return <div className="costCenter" key={index}>
                                <span>{bu.bu}</span>
                                <span className="material-symbols-outlined delete-cost-center" onClick={deleteBuBenefited(bu)}>
                                    delete
                                </span>
                            </div>
                        })
                        }
                    </div>


                    <div>

                        <div className="attachments display-flex">


                            <div className='display-block'>
                                <span>{t("attachments")}</span>

                                <input type="file" id="file" onChange={handleFileSelected} />
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
                                                    <img src={"/attachment/" + attatchmentType(file) + ".png"} alt="" />
                                                </div>
                                                <span>{file.name}</span>
                                            </div>
                                        </div>
                                    )
                                })
                            }
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