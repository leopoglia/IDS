import "./style.css"
import { useState } from "react";
import Header from "../../../Fixed/Header";
import Nav from "../../../Fixed/Nav";
import Title from "../../../Fixed/Search/Title";
import SelectSizeDemand from "./SelectSizeDemand";
import { useTranslation } from "react-i18next";
import Service from "../../../../services/classificationService"


export default function RankDemand() {
    const { t } = useTranslation();
    const [buBenefited, setBuBenefited] = useState("");
    const [buBenefiteds, setBuBenefiteds]: any = useState([]);

    function saveToRank() {
        console.log("salvou");

        let classification = JSON.parse(localStorage.getItem("classification") || "{}");
        let analysis = JSON.parse(localStorage.getItem("worker") || "{}");
                        
        Service.save(classification.size, classification.ti, -1, "", classification.buReq, classification.buBenList, analysis.id);

        
    }

    console.log("buBenefiteds -> ", buBenefiteds);


    function deleteBuBenefited(bu: any) {

        return () => {
            const index = buBenefiteds.indexOf(bu);
            console.log("index -> ", index);
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
            <Header icon="bar_chart" title="rankDemand" />

            <Nav />


            <div className="container">

                <div className="background-title">

                    <Title nav="Demandas > Visualizar Demanda > Classificar Demanda" title="Classificar Demanda" />

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
                        <span>{t("attachments")}</span>

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
                    <button className="btn-secondary">
                        <span>{t("return")}</span>
                    </button>

                    <button onClick={() => saveToRank()} className="btn-primary">
                        <span>{t("toRank")}</span>
                    </button>

                </div>

            </div>
        </div>

    );
}