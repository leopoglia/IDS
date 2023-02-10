import "./style.css"
import Header from "../../Fixed/Header"
import Nav from "../../Fixed/Nav"
import Title from "../../Fixed/Search/Title";
import Notification from "./Notification";
import Footer from "../../Fixed/Footer";
import { useState, useEffect } from "react";
import Services from "../../../services/notificationService";

export default function Notifications() {

    const speaks = ["Olá, eu sou a Bia e estou aqui para ajudá-lo no sistema de demandas Gedesti. O que posso fazer por você hoje?"]
    const [notifications, setNotifications]: any = useState([])
    const worker = JSON.parse(localStorage.getItem("worker") || "{}")


    useEffect(() => {
        Services.findAll().then((response:any) => {
            setNotifications(response.reverse())
            console.log(response)
        })
    }, [])



    return (
        <div className="notifications">

            {/* <div className="barrier"></div>
            <img className="bia" src="https://i.imgur.com/r004kLD.png"></img>
            <div className="bubble modal">
                {speaks[0]}
            </div> */}

            <Header icon="notifications" title="notifications" />
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