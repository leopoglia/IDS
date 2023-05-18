import "./style.css"
import Title from "../../Fixed/Search/Title";
import Footer from "../../Fixed/Footer";
import Message from "./MessageBox";
import { useEffect, useState } from "react";
import MessageService from "../../../services/messageService";
import { useContext } from "react";
import UserContext from "../../../context/userContext";
import { useTranslation } from "react-i18next";

export default function Messages() {
    const worker: any = useContext(UserContext).worker;
    let [messages, setMessages]: any = useState([]);
    const { t } = useTranslation();

    useEffect(() => {
        MessageService.findChatByDemand(worker.id).then((response: any) => {
            setMessages(response);
        })

    }, [worker.id]);

    return (
        <div className="messages">


            <div className="container">
                <div className="backgroud-title">
                    <Title nav="messages" title="messages" />
                </div>

                <div className="container-background">
                    <div className="boxNoPadding">

                        {
                            messages.length > 0 ?
                                (
                                    messages.map((val: any, index: any) => {
                                        if (val !== null) {
                                            if (index > 5 && messages.length - 1 === index) {
                                                return (
                                                    <div key={index}>
                                                        <Message message={val} bottom={false} />
                                                    </div>
                                                );
                                            } else {
                                                return (
                                                    <div key={index}>
                                                        <Message message={val} bottom={true} />
                                                    </div>
                                                );
                                            }
                                        }
                                    })
                                ) : (

                                    <div className="no-results">
                                        <span className="material-symbols-outlined">chat_bubble</span>
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