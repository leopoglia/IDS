import { useContext } from "react";
import "./style.css"
import Title from "../../Fixed/Search/Title";
import Footer from "../../Fixed/Footer";
import { useTranslation } from "react-i18next";
import UserContext from "../../../context/userContext";


export default function Configuration() {
    const { t } = useTranslation();

    const worker: any = useContext(UserContext).worker;
    const name: any = worker.name;
    const email = worker.email;
    const image = name.substring(0, 1);


    function changeName() {
    }


    const handleChange = (event: any) => {

        console.log("event ->", event.target.checked)

        if(event.target.checked === false){
            document.documentElement.style.setProperty('--r', ".375rem");
            document.documentElement.style.setProperty('--rr', "50px");
        } else{
            document.documentElement.style.setProperty('--r', ".10rem");
            document.documentElement.style.setProperty('--rr', "4px");
        }
    }

    return (
        <div className="configuration">


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
                                <input type="checkbox" id="slider" name="slider" />
                                <label htmlFor="slider" />
                            </div>

                        </div>

                    </div>

                    <div className="change-configuration">
                        <span className="title-confuration">{t("rounded")}</span>

                        <div className="display-flex">
                            <span className="subtitle-confuration">{t("messagesNotify")}</span>

                            <div className="switch">
                                <input onChange={(e) => handleChange(e)} type="checkbox" id="switch" name="switch" />
                                <label htmlFor="switch" />
                            </div>
                        </div>

                    </div>


                </div>

                <div className="h45"></div>

                <Footer />

            </div>


        </div >
    );
}