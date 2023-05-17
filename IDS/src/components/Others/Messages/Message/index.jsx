import { useContext, useEffect, useState, useRef } from 'react'
import EmojiPicker from "emoji-picker-react";
import { useTranslation } from "react-i18next";
import "./style.css"


import Title from "../../../Fixed/Search/Title";
import { useParams } from 'react-router';
import { WebSocketContext } from '../../../../services/webSocketService';
import ServicesMessage from '../../../../services/messageService'
import ServicesDemand from '../../../../services/demandService';
import UserContext from '../../../../context/userContext';
import ServicesWorker from '../../../../services/workerService';

const ChatRoom = () => {

    const { t } = useTranslation();
    const [emoji, setEmoji] = useState(false);
    const [selectedEmoji, setSelectedEmoji] = useState("");
    const [workerDemand, setWorkerDemand] = useState({});

    const demandCode = useParams().id;
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [subscribeId, setSubscribeId] = useState(null);

    const { send, subscribe, stompClient } = useContext(WebSocketContext);
    const { worker } = useContext(UserContext);
    const divRef = useRef(null);

    const [chatsOpen, setChatsOpen] = useState(true);

    let [chat, setChat] = useState([]);

    useEffect(() => {
        divRef.current.scrollTop = divRef.current.scrollHeight;

        const newMessage = (response) => {
            const messageReceived = JSON.parse(response.body);
            setMessages((previousMessages) => [...previousMessages, messageReceived]);
        }

        ServicesMessage.findChatByDemand(demandCode).then((response) => {
            setChat(response);
        })

        if (messages[messages.length - 1]?.sender?.workerCode !== worker.id && workerDemand.workerName === "Analista") {
            ServicesWorker.findById(messages[messages.length - 1]?.sender.workerCode).then((response) => {
                setWorkerDemand({ workerCode: response.workerCode, workerName: response.workerName });
            }).catch((error) => {
                console.log(error);
            })


            setWorkerDemand({ workerCode: messages[messages.length - 1]?.sender.workerCode });
        }


        if (stompClient && !subscribeId) {
            setSubscribeId(subscribe("/" + demandCode + "/chat", newMessage));
        }


    }, [messages, stompClient]);

    useEffect(() => {

        async function getDemand() {
            await ServicesDemand.findById(demandCode)
                .then((response) => {


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


    }, [demandCode]);


    const setDefaultMessage = () => {

        setMessage({
            demandCode: demandCode,
            sender: { workerCode: worker.id || parseInt(localStorage.getItem("id")) },
            message: "",
            dateMessage: null,
        })
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
                    <div className="profile">

                        <div className='person'>
                            <span>
                                {workerDemand.workerName?.slice(0, 1)}
                            </span>
                        </div>

                        <div className="message-name">
                            <span className="username">{workerDemand.workerName}</span>

                            <div className="online">
                                <span>online</span>

                            </div>
                        </div>
                    </div>

                    <div className="chat-box display-flex">

                        {worker.office !== "requester" ?
                            (
                                <div className={'chats chats-' + chatsOpen}>

                                    {
                                    chat?.length > 0 &&
                                    chat.map((item) => (
                                        <div className="chats-profile">

                                            <div className="person">
                                                <span>
                                                    {workerDemand.workerName?.slice(0, 1)}
                                                </span>
                                            </div>

                                            <div className='text-person-chats w100'>

                                                <div className='display-flex-space-between w100 chat-time-chats'>
                                                    <div className="message-name-chats">
                                                            <span className="username">{workerDemand.workerName}</span>
                                                    </div>

                                                    <span className='time-chat'>
                                                        {item.dateMessage.split(",")[1]}
                                                    </span>

                                                </div>

                                                <div className='display-flex span-message-chat'>
                                                    <span className='message-chat'>
                                                        {item.message}
                                                    </span>
                                                </div>
                                            </div>

                                        </div>
                                    ))
                                    }

                                </div>
                            ) : null
                        }


                        <div className="chat-content ">

                            {worker.office !== "requester" ?
                                (

                                    <div className={'arrow-chat arrow-chat-' + chatsOpen} onClick={() => setChatsOpen(!chatsOpen)}>
                                        <span className='material-symbols-outlined arrow-expend'>
                                            expand_more
                                        </span>
                                    </div>

                                ) : null
                            }


                            <ul className="chat-messages" ref={divRef}>


                                {messages.length > 0 &&
                                    messages.map((message) => (

                                        <li key={message.id} className={
                                            message?.sender?.workerCode === worker.id || message?.sender?.workerCode === parseInt(localStorage.getItem("id")) ? "message-two" : null}>

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
                                                value={message?.message}
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