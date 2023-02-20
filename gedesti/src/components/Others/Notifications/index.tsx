import "./style.css"
import Header from "../../Fixed/Header"
import Nav from "../../Fixed/Nav"
import Title from "../../Fixed/Search/Title";
import Notification from "./Notification";
import Footer from "../../Fixed/Footer";
import { useState, useEffect, useContext } from "react";
import Services from "../../../services/notificationService";
import UserContext from "../../../context/userContext";

export default function Notifications() {

    const speaks = ["Olá, eu sou a Bia e estou aqui para ajudá-lo no sistema de demandas Gedesti. O que posso fazer por você hoje?"]
    const [notifications, setNotifications]: any = useState([])
    const worker = useContext(UserContext).worker


    useEffect(() => {
        Services.findAll().then((response:any) => {
            setNotifications(response.reverse())
        })
    }, [])



    return (
        <div className="notifications">

            {/* <div className="barrier"></div>
            <img className="bia" src="https://i.imgur.com/r004kLD.png"></img>
            <div className="bubble modal">
                {speaks[0]}
            </div> */}

            <Header/>
            <Nav />

            <div className="container">
                <div className="backgroud-title">
                    <Title nav="notifications" title="notifications" />
                </div>

                {notifications.map((notification: any) => {
                    if (notification.worker.workerCode == worker.id)
                        return (
                            <Notification
                                id={notification.notificationCode}
                                description={notification.description}
                                date={notification.date}
                                icon={notification.icon}
                                view={notification.visualized}
                                type={notification.type}
                            />
                        )
                }, [])}

                <Footer />

            </div>


        </div>
    );
}