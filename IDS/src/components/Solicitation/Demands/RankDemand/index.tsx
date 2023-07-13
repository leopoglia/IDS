import { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { WebSocketContext } from '../../../../services/webSocketService';

import Title from "../../../Fixed/Search/Title";
import SelectSizeDemand from "./SelectSizeDemand";
import ServicesClassification from "../../../../services/classificationService"
import ServicesDemand from "../../../../services/demandService";
import ServicesBu from "../../../../services/buService";
import UserContext from "../../../../context/userContext";
import othersUtil from "../../../../utils/othersUtil";
import notifyUtil from "../../../../utils/notifyUtil";
import "./style.css"
import Input from "../CrateDemand/Others/Input";
import { Tooltip } from "@mui/material";


export default function RankDemand() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [buBenefited, setBuBenefited] = useState(""); // Unidade de negócio beneficiada
    const [buBenefiteds, setBuBenefiteds]: any = useState([]); // Unidades de negócio beneficiadas
    const [buBenefitedsList, setBuBenefitedsList]: any = useState([]); // Lista de unidades de negócio beneficiadas
    const [ppmCode, setPpmCode] = useState(""); // Código do ppm
    const [linkEpicJira, setLinkEpicJira] = useState(""); // Link do epic jira
    const [demand, setDemand]: any = useState({}); // Demanda
    const [fileAttachment, setFileAttachment]: any = useState([]);
    const { send, subscribe, stompClient }: any = useContext(WebSocketContext);
    const [subscribeId, setSubscribeId] = useState(null);
    const url: any = parseInt(useParams().id || "null"); // Pegando o id da demanda
    const editProposalCode = window.location.href.split("?")[1] // Número da proposta para edição
    const view: any = window.location.href.split("?")[2] // Verificando se está em modo visualização

    let notification = {}; // Notificações do usuário

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

        if (demand !== undefined) {
            if (stompClient && !subscribeId) {
                setSubscribeId(subscribe("/notifications/" + demand?.requesterRegistration?.workerCode, notification));
            }
        }

    }, [buBenefiteds, stompClient])

    useEffect(() => {

        const classification = JSON.parse(localStorage.getItem("classification") || "{}"); // Pegando os dados da classificação
        const busAux: any[] = []

        if (classification.buBenList) {
            for (let i = 0; i < classification.buBenList.length; i++)
                ServicesBu.findById(classification.buBenList[i]).then((response: any) => {
                    busAux.push(response)
                }).catch((error: any) => {
                    console.log(error)
                })
        }

        setBuBenefitedsList(busAux);
    }, [])

    async function getDemand() {
        setDemand(await ServicesDemand.findById(url));
    }

    // Salvando a classificação da demanda
    let analysis = useContext(UserContext).worker; // Pegando o analista


    function saveToRank() {
        let classification = JSON.parse(localStorage.getItem("classification") || "{}"); // Pegando os dados da classificação

        classification.ppmCode = ppmCode;
        classification.epicJiraLink = linkEpicJira;


        if (classification.size === "" || classification.ti === "" || classification.buReq === "" || classification.buBenList === undefined) {
            notifyUtil.error(t("fillAllFields"))
            return;
        } else {
            if (view !== "edit") {
                ServicesClassification.save(classification.size, classification.ti, 0, "", classification.buReq, classification.buBenList, analysis.id, fileAttachment).then((response: any) => {
                    let classificationCode = response.classificationCode; // Pegando o código da classificação

                    // Atualizando a classificação da demanda
                    ServicesDemand.updateClassification(demand.demandCode, classificationCode).then((response: any) => {

                        ServicesDemand.updateStatus(url, "BacklogRanked").then((response: any) => {
                            localStorage.setItem("route", "classification");
                            localStorage.removeItem("classification");
                            send("/api/worker/" + demand.requesterRegistration.workerCode, setRankNotification());
                            // ServicesNotification.save("Um analista classificou a sua demanda de código  " + demand.demandCode, demand.requesterRegistration.workerCode, "done", "demand");

                            window.history.back();

                        }).catch((error: any) => {
                            console.log(error)
                        })


                    }).catch((error: any) => {
                        console.log(error)
                    })

                }).catch((error: any) => {
                    console.log(error)
                })
            } else {
                if (classification.ppmCode === "" || classification.epicJiraLink === "") {
                    notifyUtil.error(t("fillAllFields"))
                } else {
                    ServicesClassification.save(classification.size, classification.ti, classification.ppmCode, classification.epicJiraLink, classification.buReq, classification.buBenList, analysis.id, fileAttachment).then((response: any) => {
                        let classificationCode = response.classificationCode; // Pegando o código da classificação

                        ServicesDemand.updateClassification(demand.demandCode, classificationCode).then((response: any) => {


                            navigate("/proposal/view/" + editProposalCode)

                        }).catch((error: any) => {
                            console.log(error)
                        })

                    }).catch((error: any) => {
                        console.log(error)
                    })
                }

            }
        }

    }

    const setRankNotification = () => {
        return notification = {
            date: new Date(),
            description: "AnalystRankDemand " + demand.demandCode,
            worker: { workerCode: JSON.parse(demand.requesterRegistration.workerCode) },
            icon: "done",
            type: "demand",
        };
    }

    // Deletando a unidade de negócio beneficiada
    function deleteBuBenefited(index: any) {
        return () => {
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

    return (
        <div className="rank-demand">


            <div className="container">

                <div className="background-title">

                    <Title nav="demandViewDemandClassify" title="classifyDemand" />

                    <Tooltip className="display-flex-end" title={t("viewDemand")} placement="bottom" arrow>
                        <Link to={view === "edit" ? "/proposal/view/" + editProposalCode + "?view" : "/demand/view/" + demand.demandCode + "?" + demand.demandVersion + "?view"}>
                            <div className="visibility-demand">
                                <span className="material-symbols-outlined">
                                    visibility
                                </span>
                            </div>
                        </Link>
                    </Tooltip>

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

                        {buBenefitedsList.map((bu: any, index: any) => {
                            return <div className="costCenter" key={index}>
                                <span>{bu?.bu}</span>
                                <span className="material-symbols-outlined delete-cost-center" onClick={deleteBuBenefited(index)}>
                                    delete
                                </span>
                            </div>
                        })
                        }
                    </div>

                    {editProposalCode && view === "edit" ?
                        <>
                            <div className="hr" />

                            <div className="display-grid">
                                <Input type="text" label="ppmCode" value={ppmCode} SetValue={setPpmCode} />
                            </div>
                            <div className="display-grid mt10 mb10">
                                <Input type="text" label="linkEpicJira" value={linkEpicJira} SetValue={setLinkEpicJira} />
                            </div>
                        </>
                        : null
                    }

                    <div>

                        <div className="attachments display-flex">


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
                </div>


                <div className="display-flex-end">

                    <button onClick={() => saveToRank()} className="btn-primary">
                        <span>{t("toRank")}</span>
                    </button>



                </div>

            </div>

        </div>

    );
}