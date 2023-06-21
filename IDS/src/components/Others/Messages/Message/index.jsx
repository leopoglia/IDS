import React from 'react';
import { useContext, useEffect, useState, useRef } from 'react'
import { useTranslation } from "react-i18next";
import { useParams } from 'react-router';
import { WebSocketContext } from '../../../../services/webSocketService';
import { Link } from 'react-router-dom';

import Title from "../../../Fixed/Search/Title";
import ServicesMessage from '../../../../services/messageService'
import ServicesDemand from '../../../../services/demandService';
import ServicesAttachment from '../../../../services/attachmentService';
import UserContext from '../../../../context/userContext';
import ServicesWorker from '../../../../services/workerService';
import EmojiPicker from "emoji-picker-react";
import othersUtil from '../../../../utils/othersUtil';
import "./style.css"
import Profile from '../../../Fixed/Profile';


const ChatRoom = () => {
    const { t } = useTranslation();
    const [emoji, setEmoji] = useState(false);
    const [selectedEmoji, setSelectedEmoji] = useState("");
    const [workerDemand, setWorkerDemand] = useState({});
    const [fileAttachment, setFileAttachment] = useState();
    const [demand, setDemand] = useState({});

    const demandCode = parseInt(useParams().id || "null");
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [subscribeMessage, setSubscribeMessage] = useState(null);
    const [subscribeNotification, setSubscribeNotification] = useState(null);

    let notification = {};

    const { send, subscribe, stompClient } = useContext(WebSocketContext);
    const { worker } = useContext(UserContext);
    const divRef = useRef(null);

    const [sender, setSender] = useState({});

    let [chat, setChat] = useState([]);

    let lastProcessedDate = '';

    useEffect(() => {
        divRef.current.scrollTop = divRef.current.scrollHeight;

        if (messages[messages.length - 1]?.sender?.workerCode !== worker.id && workerDemand.workerName === "Analista") {
            ServicesWorker.findById(messages[messages.length - 1]?.sender.workerCode).then((response) => {
                setWorkerDemand({ workerCode: response.workerCode, workerName: response.workerName });
            }).catch((error) => {
                console.log(error);
            })

            setWorkerDemand({ workerCode: messages[messages.length - 1]?.sender.workerCode });
        }

        const newMessage = (response) => {
            const messageReceived = JSON.parse(response.body);
            setMessages((previousMessages) => [...previousMessages, messageReceived]);
        }
        ServicesMessage.findChatByDemand(demandCode).then((response) => {
            setChat(response);
        })

        if (stompClient && !subscribeMessage) {
            setSubscribeMessage(subscribe("/" + demandCode + "/chat", newMessage));
        }

        ServicesMessage.findSender(worker.id, message.demandCode).then((response) => {
            setSender(response);
        })


    }, [messages, stompClient]);

    useEffect(() => {

        async function getDemand() {
            await ServicesDemand.findById(demandCode)
                .then((response) => {

                    setDemand(response);

                    if (response.requesterRegistration.workerCode !== parseInt(localStorage.getItem("id"))) {
                        setWorkerDemand(response.requesterRegistration);
                    } else {
                        setWorkerDemand({ workerName: "Analista" });
                    }

                }).catch((error) => {
                    console.log(error);
                })
        }

        getDemand();

        if (stompClient && !subscribeNotification) {
            setSubscribeNotification(subscribe("/notifications/" + demand?.requesterRegistration?.workerCode, notification));
        }

        async function loading() {
            await ServicesMessage.findById(demandCode)
                .then((response) => {

                    setMessages(response);
                }).catch((error) => {
                    console.log(error);
                })
            setDefaultMessage();
        }
        loading();
    }, [demandCode, stompClient]);

    const handleFileSelected = (e) => {
        const files = Array.from(e.target.files)
        let filesArray = [];
        for (let i = 0; i < files.length; i++) {
            filesArray.push(files[i]);
        }
        ServicesAttachment.save(filesArray[0]).then((response) => {
            setFileAttachment(response);
            setMessage({ message: message.message, dateMessage: new Date().toLocaleString(), sender: { workerCode: worker.id || parseInt(localStorage.getItem("id")) }, demandCode: demandCode, attachment: { attachmentCode: response?.attachmentCode } });
        })
        reloadMessage();
    }

    const setDefaultMessage = () => {

        console.log("fileAttachment ==> ", fileAttachment)

        setMessage({
            demandCode: demandCode,
            sender: { workerCode: worker.id || parseInt(localStorage.getItem("id")) },
            message: "",
            dateMessage: null,
            attachment: null
        })
    }

    const reloadMessage = (event) => {
        event.preventDefault();
        const { value } = event.target;
        if (fileAttachment === null || fileAttachment === undefined) {
            setMessage({ ...message, message: value, dateMessage: new Date().toLocaleString(), sender: { workerCode: worker.id || parseInt(localStorage.getItem("id")) }, demandCode: demandCode });
        } else {
            setMessage({ ...message, message: value, dateMessage: new Date().toLocaleString(), sender: { workerCode: worker.id || parseInt(localStorage.getItem("id")) }, demandCode: demandCode, attachment: { attachmentCode: fileAttachment?.attachmentCode } });
        }
    }

    const submit = (event) => {
        event.preventDefault();
        send("/api/demand/" + demandCode, message);
        setDefaultMessage();

        if (messages.length === 0) {
            setNotification();
            send("/api/worker/" + demand.requesterRegistration.workerCode, setNotification());
        }

        setFileAttachment(null);
    }

    const setNotification = () => {
        return notification = {
            date: new Date(),
            description: worker.name.split(" ")[0] + " startedConversation " + demandCode,
            worker: { workerCode: JSON.parse(demand.requesterRegistration.workerCode) },
            icon: "chat_bubble",
            type: "chat",
        };
    }

    function onClick(emojiData) {
        setSelectedEmoji(emojiData.unified);

        setMessage({ ...message, message: message.message + emojiData.emoji, dateMessage: new Date().toLocaleString() });
    }


    return (
        <div className="messages">
            <div className="container">
                <div className="backgroud-title">
                    <Title nav="chatMessages" title="message" />
                </div>

                <div className="box-message">
                    {
                        !messages.includes(workerDemand) && workerDemand.workerCode !== worker.id ? (
                            <Link className="profile" to={"/profile/" + workerDemand.workerCode}>
                                <Profile workerCode={workerDemand.workerCode} image={workerDemand.workerName?.slice(0, 1)} workerName={workerDemand.workerName} />
                            </Link>
                        ) : (
                            <Profile workerCode={sender.workerCode} image={sender.workerName?.slice(0, 1)} workerName={sender.workerName} />
                        )

                    }

                    <div className="chat-box display-flex">

                        <div className="chat-content ">

                            <ul className="chat-messages" ref={divRef}>

                                {messages.length > 0 &&
                                    messages.map((message, index) => {
                                        const messageDate = message?.dateMessage.split(",")[0].split("/");

                                        const currentDate = new Date();

                                        // Verificar se a data é hoje
                                        const isToday =
                                            parseInt(messageDate[0]) === currentDate.getDate() &&
                                            parseInt(messageDate[1]) === currentDate.getMonth() + 1 &&
                                            parseInt(messageDate[2]) === currentDate.getFullYear();

                                        // Obter a representação da data a ser exibida
                                        const displayDate = isToday ? "Hoje" : message.dateMessage.split(",")[0];

                                        // Verificar se a data é diferente da última data processada
                                        const isDifferentDate = displayDate !== lastProcessedDate;

                                        // Atualizar a última data processada com a data atual da mensagem
                                        lastProcessedDate = displayDate;

                                        console.log(message)

                                        return (
                                            <React.Fragment key={message.id}>
                                                {isDifferentDate && (
                                                    <li className="separation">
                                                        <span className="display-date">{displayDate}</span>
                                                    </li>
                                                )}

                                                <li
                                                    className={
                                                        message.sender?.workerCode === worker.id ||
                                                            message.sender?.workerCode === parseInt(localStorage.getItem("id"))
                                                            ? "message-two"
                                                            : null
                                                    }
                                                >

                                                    <div className='box-message-attachment'>
                                                        {message.message &&
                                                            <div className='content-message'>
                                                                <div className="message-user">
                                                                    <span>{message.message}</span>
                                                                    <div className="display-flex-end message-content-date">

                                                                        <div className='display-block w100'>
                                                                            <div className='display-flex-end'>
                                                                                <div className="message-data">
                                                                                    <span>{message.dateMessage.split(",")[1]}</span>
                                                                                </div>

                                                                                {message.sender?.workerCode === worker.id ||
                                                                                    message.sender?.workerCode === parseInt(localStorage.getItem("id")) ? (
                                                                                    <span className="material-symbols-outlined check-done">done</span>
                                                                                ) : null}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        }
                                                        {message.attachment &&
                                                            <div className="attachments-message">

                                                                <div className='attachment-message display-flex-align-center display-flex-end'>
                                                                    <span>{message.attachment.name}</span>

                                                                    <div className="attachment">
                                                                        <div className="attachment-image">
                                                                            <img src={"/attachment/" + othersUtil.attatchmentType(message.attachment) + ".png"} alt="" />
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        }
                                                    </div>

                                                </li>
                                            </React.Fragment>
                                        );
                                    })}




                            </ul>

                            <div className="send-message">


                                <form onSubmit={submit}>

                                    <div className="display-flex">

                                        <div className="input-message">

                                            {fileAttachment &&
                                                <div className="attachments">

                                                    <div className="attachment">
                                                        <div className="attachment-image">
                                                            <img src={"/attachment/" + othersUtil.attatchmentType(fileAttachment) + ".png"} alt="" />
                                                        </div>
                                                        <span>{fileAttachment.name}</span>
                                                    </div>
                                                </div>
                                            }

                                            <input
                                                type="text"
                                                placeholder={t("sendYourMessage")}
                                                onChange={reloadMessage}
                                                value={message?.message}
                                            />


                                            <div className="actions-message">

                                                <div className='file-message'>
                                                    <label className="attach_file" htmlFor="file">
                                                        <span className="material-symbols-outlined">
                                                            attach_file
                                                        </span>
                                                    </label>

                                                    <input type="file" id='file' onChange={handleFileSelected} />
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