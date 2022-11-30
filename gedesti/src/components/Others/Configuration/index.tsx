import "./style.css"
import Header from "../../Fixed/Header"
import Nav from "../../Fixed/Nav"
import Title from "../../Fixed/Search/Title";
import Footer from "../../Fixed/Footer";
import { useTranslation } from "react-i18next";


export default function Configuration() {
    const { t, i18n } = useTranslation();

    return (
        <div className="configuration">
            <Header icon="settings" title="configurations" />
            <Nav />

            <div className="container">
                <div className="background-title">
                    <Title nav="configurations" title="configurations" />
                </div>

                <div className="box">
                    <div className="profile">
                        <img className="picture-profile" src="https://media-exp1.licdn.com/dms/image/C5603AQGoPhhWyeL2-Q/profile-displayphoto-shrink_200_200/0/1516833080377?e=2147483647&v=beta&t=O_q0eYPuycqoRh8ACadEX5gQhrVbPnomvJKRFQTIycI" alt="" />
                        <div className="email-name">
                            <div className="flex">
                                <span className="name">Jair Paulo Satig</span>
                                <span className="material-symbols-outlined">
                                    edit
                                </span>
                            </div>
                            <span className="email">jair@weg.net</span>
                        </div>
                    </div>

                    <div className="change-configuration">
                        <div className="flex">
                            <span className="title-confuration">{t("password")}</span>
                            <span className="material-symbols-outlined">
                                edit
                            </span>
                        </div>
                        <span className="subtitle-confuration">{t("changePassword")}</span>
                    </div>

                    <div className="change-configuration">
                        <span className="title-confuration">{t("accessibility")}</span>
                        <span className="subtitle-confuration">{t("fontSize")}</span>
                    </div>

                    <div className="change-configuration">
                        <span className="title-confuration">{t("notifications")}</span>
                        <span className="subtitle-confuration">{t("messagesNotify")}</span>
                    </div>
                </div>

                <Footer />


            </div>


        </div>
    );
}