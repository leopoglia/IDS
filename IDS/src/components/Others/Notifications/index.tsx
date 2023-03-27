import "./style.css"
import Header from "../../Fixed/Header"
import Nav from "../../Fixed/Nav"
import Title from "../../Fixed/Search/Title";
import Notification from "./Notification";
import Footer from "../../Fixed/Footer";
import { useState, useEffect, useContext } from "react";
import Services from "../../../services/notificationService";
import UserContext from "../../../context/userContext";
import { t } from "i18next";

export default function Notifications() {

    const [notifications, setNotifications]: any = useState([]);
    const [haveNotification, setHaveNotification]: any = useState(0);
    const worker = useContext(UserContext).worker


    useEffect(() => {
        Services.findAll().then((response: any) => {
            setNotifications(response.reverse())
        })
    }, [])



    return (
        <div className="notifications">

            <Header />
            <Nav />

            <div className="container">
                <div className="backgroud-title">
                    <Title nav="notifications" title="notifications" />
                </div>

                <div className="container-background">
                    <div className="boxNoPadding">
                        {notifications.map((notification: any) => {
                            if (notification.worker.workerCode == worker.id) {

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

                            if (notification.worker.workerCode == worker.id) {
                                setHaveNotification(haveNotification + 1)
                            }


                        }, [])
                        }


                    </div>
                </div>

                <div className="h45"></div >

                <Footer />

            </div>


        </div>
    );
}