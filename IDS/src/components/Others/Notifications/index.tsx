import "./style.css"
import Title from "../../Fixed/Search/Title";
import Notification from "./Notification";
import Footer from "../../Fixed/Footer";
import { useState, useEffect, useContext } from "react";
import Services from "../../../services/notificationService";
import UserContext from "../../../context/userContext";
import { useTranslation } from "react-i18next";
import Load from "../../Fixed/Load";


export default function Notifications() {

    const [notifications, setNotifications]: any = useState([]);
    const [haveNotification, setHaveNotification]: any = useState(0);
    const [loading, setLoading] = useState(true);
    const worker = useContext(UserContext).worker;
    const { t } = useTranslation();


    useEffect(() => {
        Services.findAll().then((response: any) => {
            setNotifications(response.reverse());
            setLoading(false);
        })
    }, [notifications])



    return (
        <div className="notifications">


            <div className="container">
                <div className="backgroud-title">
                    <Title nav="notifications" title="notifications" />
                </div>

                <div className="container-background">
                    <div className="boxNoPadding">
                        {
                            loading === true ? (
                                <Load />
                            ) :
                                notifications.length > 0 ? (
                                    notifications.map((notification: any) => {
                                        if (notification.worker.workerCode === worker.id) {

                                            return (
                                                <Notification
                                                    key={notification.notificationCode}
                                                    id={notification.notificationCode}
                                                    description={notification.description}
                                                    date={notification.date}
                                                    icon={notification.icon}
                                                    view={notification.visualized}
                                                    type={notification.type}
                                                />
                                            )
                                        }

                                        if (notification.worker.workerCode === worker.id) {
                                            setHaveNotification(haveNotification + 1)
                                        }


                                    })
                                ) : (
                                    <div className="no-results">
                                        <span className="material-symbols-outlined">notifications</span>
                                        <h1>{t("noResults")}</h1>
                                    </div>
                                )
                        }


                    </div>
                </div>

                <div className="h45"></div >

                <Footer />

            </div>


        </div>
    );
}