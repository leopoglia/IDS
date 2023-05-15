import "./style.css"
import Title from "../../Fixed/Search/Title";
import Footer from "../../Fixed/Footer";
import Message from "./MessageBox";
import { useEffect, useState } from "react";
import MessageService from "../../../services/messageService";
import { useContext } from "react";
import UserContext from "../../../context/userContext";

export default function Messages() {
    const worker:any = useContext(UserContext).worker;
    let [messages, setMessages]:any = useState([]);

    useEffect(() => {
        MessageService.findChatByDemand(worker.id).then((response: any) => {
            setMessages(response);
        })
    }, []);

    return (
        <div className="messages">
         

            <div className="container">
                <div className="backgroud-title">
                    <Title nav="messages" title="messages" />
                </div>

                <div className="container-background">
                    <div className="boxNoPadding">
                        {
                            messages.map((val: any, index: any) => {
                                if (index > 5 && messages.length - 1 === index) {
                                    return (
                                        <div>
                                            <Message message={messages[index]} bottom={false} />
                                        </div>
                                    );
                                } else {
                                    return (
                                        <div>
                                            <Message message={messages[index]} bottom={true} />
                                        </div>
                                    );
                                }

                            })
                        }

                    </div>
                </div>


                <div className="h45"></div >

                <Footer />
            </div>
        </div>
    );
}