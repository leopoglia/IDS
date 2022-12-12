import "./style.css"
import { useState } from "react";
import Header from "../../../Fixed/Header";
import Nav from "../../../Fixed/Nav";
import Title from "../../../Fixed/Search/Title";
import SelectSizeDemand from "./SelectSizeDemand";
import { useTranslation } from "react-i18next";


export default function RankDemand() {
    const { t } = useTranslation();

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

                        <label htmlFor="">Tamanho *</label>

                        <SelectSizeDemand />

                    </div>

                    <div className="bu-requester">

                        <label htmlFor="">BU Solicitante *</label>

                        <SelectSizeDemand />

                    </div>

                    <div className="bu-benefited">

                        <label htmlFor="">BU Beneficiada *</label>

                        <SelectSizeDemand />

                    </div>

                    <div className="ti-section">

                        <label htmlFor="">Seção de TI responsável *</label>

                        <SelectSizeDemand />

                    </div>

                    <div>
                        <span>{t("attachments")}</span>

                        <div className="attachments">
                            <input type="file" id="file" />
                            <label htmlFor="file">
                                <span className="material-symbols-outlined">
                                    upload_file
                                </span>Enviar arquivo</label>
                        </div>

                    </div>
                </div>

                <div className="demands-footer">
                    <button className="btn-secondary">
                        <span>Voltar</span>
                    </button>

                    <button className="btn-primary">
                        <span>Classificar</span>
                    </button>


                </div>

            </div>
        </div>

    );
}