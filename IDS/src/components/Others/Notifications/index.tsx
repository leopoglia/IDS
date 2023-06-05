import { useState, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";

import Title from "../../Fixed/Search/Title";
import Notification from "./Notification";
import Footer from "../../Fixed/Footer";
import Services from "../../../services/notificationService";
import UserContext from "../../../context/userContext";
import Load from "../../Fixed/Load";
import "./style.css"
import Input from "../../Solicitation/Demands/CrateDemand/Others/Input";
import Modal from "../../Fixed/User/Modal";

export default function Notifications() {

    const [notifications, setNotifications]: any = useState([]);
    const [haveNotification, setHaveNotification]: any = useState(0);
    const [loading, setLoading] = useState(true);
    const worker = useContext(UserContext).worker;
    const { t } = useTranslation();

    const [search, setSearch]: any = useState(""); // Retorno do campo de busca de demandas
    const [moreActions, setMoreActions]: any = useState(false); // Abre modal de ações
    const [checked, setChecked] = useState(false);
    const [updateCheckeds, setUpdateCheckeds] = useState(false); 


    useEffect(() => {
        Services.findAll().then((response: any) => {
            setNotifications(response.reverse());
            setLoading(false);
        })

    }, [])

    const selectAll = () => {


        if (checked === false) {
            for (let i = 0; i < notifications.length; i++) {
                notifications[i].checked = true
            }
            setChecked(true)
        } else {
            for (let i = 0; i < notifications.length; i++) {
                notifications[i].checked = false
            }
            setChecked(false)
        }
        setNotifications(notifications)
    }

    const selection = (id: any) => {

        for (let i = 0; i < notifications.length; i++) {

            if (notifications[i].notificationCode === id) {
                notifications[i].checked = !notifications[i].checked
            }
        }
        setNotifications(notifications)
        setUpdateCheckeds(!updateCheckeds)
    }

    const deleteNotification = () => {
        for(let i = 0; i < notifications.length; i++){
            if(notifications[i].checked === true){
                Services.delete(notifications[i].notificationCode)
            }
        }
    }

    const updateNotificationVisualized = () => {
        for(let i = 0; i < notifications.length; i++){
            if(notifications[i].checked === true){
                Services.updateNotificationVisualized(notifications[i].notificationCode)
            }
        }
    }

    const [textSelect, setTextSelect] = useState("Nenhum selecionado");
    
    useEffect(() => {
        console.log(notifications)

        let count = 0;
        for(let i = 0; i < notifications.length; i++){
            if(notifications[i].checked === true){
                count++
            }
        }

        if(count === 0){
            setTextSelect("Nenhum selecionado")
        }else if(count === 1){
            setTextSelect("1 selecionado")
        } else if(count === notifications.length){
            setTextSelect("Todos selecionados")
        }else{
            setTextSelect(count + " selecionados")
        }



    }, [checked, updateCheckeds])



    return (
        <div className="notifications">


            <div className="container">
                <div className="backgroud-title">
                    <Title nav="notifications" title="notifications" />
                </div>

                <div className="container-background">
                    <div className="boxNoPadding">
                        <div className="header display-flex-space-between">


                            <span className="selects display-flex-align-center">

                                <input type="checkbox" onClick={selectAll} />

                                {textSelect}
                            </span>



                            <div className="display-flex">
                                <Input background={"input-search"} setValue={setSearch} value={search} icon={"search"} type="text" placeholder={t("searchNotification")} required={true} />

                                <div>
                                    <span className="material-symbols-outlined more_vert" onClick={() => setMoreActions(!moreActions)} >
                                        more_vert
                                    </span>

                                    <div className="modal-more">
                                        {moreActions ?
                                            <Modal type="notification" /> : null
                                        }
                                    </div>
                                </div>
                            </div>

                        </div>

                        {
                            loading === true ? (
                                <Load />
                            ) :
                                notifications.length > 0 ? (

                                    notifications.filter((notification: any) => {


                                        if (search === "") {
                                            return notification
                                        } else if (notification.description.toLowerCase().includes(search.toLowerCase())) {
                                            return notification
                                        }

                                    }).map((notification: any) => {
                                        if (notification.worker.workerCode === worker.id) {
                                            return (
                                                <Notification
                                                    key={notification.notificationCode}
                                                    onClick={() => { selection(notification.notificationCode) }}
                                                    checked={notification.checked}
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