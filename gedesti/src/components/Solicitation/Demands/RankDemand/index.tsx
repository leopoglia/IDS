import "./style.css"
import { useState, useEffect } from "react";
import Header from "../../../Fixed/Header";
import Nav from "../../../Fixed/Nav";
import Title from "../../../Fixed/Search/Title";
import SelectSizeDemand from "./SelectSizeDemand";
import { useTranslation } from "react-i18next";
import Service from "../../../../services/classificationService"
import Services from "../../../../services/demandService";
import { Link } from "react-router-dom";
import { toast, ToastContainer, TypeOptions } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";


export default function RankDemand() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [buBenefited, setBuBenefited] = useState("");
    const [buBenefiteds, setBuBenefiteds]: any = useState([]);
    const [demand, setDemand]: any = useState({});
    const url = parseInt(window.location.href.split("/")[5]);

    useEffect(() => {
        getDemand();
        console.log(demand)
    }, [])

    async function getDemand() {
        setDemand(await Services.findById(url))
    }


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

    function saveToRank() {
        let classification = JSON.parse(localStorage.getItem("classification") || "{}");
        let analysis = JSON.parse(localStorage.getItem("worker") || "{}");


        if (classification.size === "" || classification.ti === "" || classification.buReq === "" || classification.buBenList.length === 0) {
            notify();
            return;
        } else {

            Service.save(classification.size, classification.ti, -1, "", classification.buReq, classification.buBenList, analysis.id).then((response: any) => {
                console.log(response)

                let classificationCode = response.classificationCode;

                Services.updateClassification(demand.demandCode, classificationCode).then((response: any) => {
                    console.log(response)

                    navigate("/demand/view/" + url)

                    localStorage.removeItem("classification");

                }).catch((error: any) => {
                    console.log(error)
                })


            }).catch((error: any) => {
                console.log(error)
            })
        }



    }


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
        </div>

    );
}