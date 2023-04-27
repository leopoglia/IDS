import React, { useContext, useEffect, useState, useRef } from 'react'
import EmojiPicker from "emoji-picker-react";
import { useTranslation } from "react-i18next";
import "./style.css"
import Header from "../../../Fixed/Header"
import Nav from "../../../Fixed/Nav"
import Title from "../../../Fixed/Search/Title";
import { useParams } from 'react-router';
import { WebSocketContext } from '../../../../services/webSocketService';
import ServicesMessage from '../../../../services/messageService'
import UserContext from '../../../../context/userContext';

const ChatRoom = () => {

    const { t } = useTranslation();
    const [emoji, setEmoji] = useState(false);
    const [selectedEmoji, setSelectedEmoji] = useState("");

    const demandCode = useParams().id;
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const { send, subscribe, stompClient } = useContext(WebSocketContext);
    const { worker } = useContext(UserContext);
    const divRef = useRef(null);

    useEffect(() => {
        divRef.current.scrollTop = divRef.current.scrollHeight;

        const newMessage = (response) => {
            const messageReceived = JSON.parse(response.body);
            console.log(messageReceived);
            setMessages([...messages, messageReceived]);
        }

        if (stompClient) {
            subscribe("/" + demandCode + "/chat", newMessage);
        }
    }, [messages]);

    useEffect(() => {

        async function loading() {
            await ServicesMessage.findById(demandCode)
                .then((response) => {
                    console.log(response);
                    setMessages(response);
                }).catch((error) => {
                    console.log(error);
                })
            setDefaultMessage();
        }
        loading();
    }, []);

    const setDefaultMessage = () => {

        setMessage({
            demand: { demandCode: demandCode },
            sender: { workerCode: worker.id || parseInt(localStorage.getItem("id")) },
            message: null,
            dateMessage: null,
        })
        console.log("MENSAGEM --> ", message)
    }

    const reloadMessage = (event) => {
        event.preventDefault();
        const { value } = event.target;
        setMessage({ ...message, message: value, dateMessage: new Date().toLocaleString() });
    }

    const submit = (event) => {
        event.preventDefault();
        send("/api/demand/" + demandCode, message);
        setDefaultMessage();
        setMessage({ ...message, message: "" });
    }



    function onClick(emojiData, event) {
        setSelectedEmoji(emojiData.unified);
        console.log(emojiData);

        setMessage({ ...message, message: message.message + emojiData.emoji });
    }



    return (
        <div className="messages">
            <Header />
            <Nav />


            <div className="container">

                <div className="backgroud-title">
                    <Title nav="chatMessages" title="message" />
                </div>

                <div className="box-message">
                    <div className="profile">
                        <img className="user-picture" src="https://media-exp1.licdn.com/dms/image/C5603AQGoPhhWyeL2-Q/profile-displayphoto-shrink_200_200/0/1516833080377?e=2147483647&v=beta&t=O_q0eYPuycqoRh8ACadEX5gQhrVbPnomvJKRFQTIycI" alt="" />
                        <div className="message-name">
                            <span className="username">Jair - Analista da demanda 01</span>

                            <div className="online">
                                <span>online</span>

                            </div>
                        </div>
                    </div>


                    <div className="chat-box">



                        <div className="chat-content">
                            <ul className="chat-messages" ref={divRef}>

                                {
                                    Object.values(messages).map((message) => (
                                        <li key={message.id} className={
                                            message.sender.workerCode === worker.id || message.sender.workerCode === parseInt(localStorage.getItem("id")) ? "message-two" : null}>

                                            <div className='message-user'>

                                                <span>{message?.message}</span>

                                                <div className="message-data">
                                                    <span>{message?.dateMessage.split(",")[1]}</span>
                                                </div>

                                            </div>

                                        </li>
                                    ))
                                }

                            </ul>

                            <div className="send-message">


                                <form onSubmit={submit}>

                                    <div className="display-flex">

                                        <div className="input-message">
                                            <input
                                                type="text"
                                                placeholder={t("sendYourMessage")}
                                                onChange={reloadMessage}
                                                value={message.message}
                                            />


                                            <div className="actions-message">

                                                <div className="attach_file">
                                                    <span className="material-symbols-outlined">
                                                        attach_file
                                                    </span>
                                                </div>


                                                <div className="add-reaction" onClick={() => setEmoji(!emoji)}>
                                                    <span className="material-symbols-outlined">
                                                        add_reaction
                                                    </span>
                                                </div>

                                            </div>
                                        </div>



                                        <button type="submit" className="send send-ubtton">
                                            <span className="material-symbols-outlined">
                                                send
                                            </span>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>
                    <div className="text-field">

                        {emoji ? (
                            <div className="Emoji">
                                <EmojiPicker

                                    onEmojiClick={onClick}
                                    autoFocusSearch={false} />
                            </div>
                        ) : null
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatRoom;