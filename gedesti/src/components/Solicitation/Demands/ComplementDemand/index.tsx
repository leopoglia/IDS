import { t } from "i18next"
import Header from "../../../Fixed/Header"
import Nav from "../../../Fixed/Nav"
import Title from "../../../Fixed/Search/Title"
import SelectSizeDemand from "../RankDemand/SelectSizeDemand"
import { Link } from "react-router-dom"
import './style.css'

export default function ComplementDemand() {
    return (
        <div className="complement-demand">

            <Header icon="playlist_add" title="complement-demand" />

            <Nav />


            <div className="container">


                <div className="background-title">

                    <Title nav="Demandas > Visualizar Demanda > Complementar Demanda" title="Complementar Demanda" />

                </div>


                <div className="box">
                    <div className="display-grid-select">
                        <label htmlFor="">{t("deadlineDemand")} *</label>
                        <SelectSizeDemand />
                    </div>
                    <div className="display-grid">
                        <label htmlFor="">{t("ppmCode")} *</label>
                        <input type="text" />
                    </div>
                    <div className="display-grid">
                        <label htmlFor="">{t("linkEpicJira")} *</label>
                        <input type="text" />
                    </div>



                    <div className="attatchments-complements">
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
                <div className="display-flex-end">
                    <Link to="/demands">
                        <button className="btn-primary">{t("complementary")}</button>
                    </Link>
                </div>
            </div>
        </div >
    )
}