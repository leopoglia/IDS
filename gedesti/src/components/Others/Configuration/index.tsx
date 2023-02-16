import "./style.css"
import Header from "../../Fixed/Header"
import Nav from "../../Fixed/Nav"
import Title from "../../Fixed/Search/Title";
import Footer from "../../Fixed/Footer";
import { useTranslation } from "react-i18next";
import ServicesWorker from "../../../services/workerService";


export default function Configuration() {
    const { t } = useTranslation();

    const worker: any = localStorage.getItem("worker");
    const name: any = JSON.parse(worker).name;
    const email = JSON.parse(worker).email;
    const image = name.substr(0, 1);


    function changeName(){
    }


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
                        <div className="picture-profile">{image}</div>
                        <div className="email-name">
                            <div className="flex">
                                <span className="name">{name}</span>
                                <span className="material-symbols-outlined">
                                    edit
                                </span>
                            </div>
                            <span className="email">{email}</span>
                        </div>
                    </div>

                    <div className="change-configuration">
                        <div className="flex">
                            <span className="title-confuration">{t("password")}</span>
                            <span className="material-symbols-outlined">
                                edit
                            </span>
                        </div>

                        <div className="display-flex">
                            <span className="subtitle-confuration">{t("changePassword")}</span>

                            <input type="password" className="input-password" value={"123456789124354235423516534424354235234532345678"} disabled />
                        </div>
                    </div>

                    <div className="change-configuration">
                        <span className="title-confuration">{t("notifications")}</span>

                        <div className="display-flex">
                            <span className="subtitle-confuration">{t("messagesNotify")}</span>

                            <div className="switch">
                                <input type="checkbox" id="switch" name="switch" />
                                <label htmlFor="switch" />
                            </div>

                        </div>

                    </div>
                </div>

                <Footer />


            </div>


        </div >
    );
}