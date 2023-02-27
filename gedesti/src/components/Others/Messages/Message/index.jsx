import React, { useEffect, useState } from 'react'
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import EmojiPicker from "emoji-picker-react";
import { useTranslation } from "react-i18next";
import "./style.css"
import Header from "../../../Fixed/Header"
import Nav from "../../../Fixed/Nav"
import Title from "../../../Fixed/Search/Title";

var stompClient = null;
const nameWorker = "JSON.parse(worker).name;"


const ChatRoom = () => {
    // const [privateChats, setPrivateChats] = useState(new Map());
    // const [publicChats, setPublicChats] = useState([]);
    // const [tab, setTab] = useState("CHATROOM");
    // const [userData, setUserData] = useState({
    //     username: nameWorker,
    //     receivername: '',
    //     connected: false,
    //     message: ''
    // });
    // useEffect(() => {
    //     // console.log(userData);
    // }, [userData]);

    // const connect = () => {
    //     let Sock = new SockJS('http://localhost:8080/ws');
    //     stompClient = over(Sock);
    //     stompClient.connect({}, onConnected, onError);
    // }

    // const onConnected = () => {
    //     setUserData({ ...userData, "connected": true });
    //     stompClient.subscribe('/chatroom/public', onMessageReceived);
    //     stompClient.subscribe('/user/' + userData.username + '/private', onPrivateMessage);
    //     userJoin();
    // }

    // const userJoin = () => {
    //     var chatMessage = {
    //         senderName: userData.username,
    //         status: "JOIN"
    //     };
    //     stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
    // }

    // const onMessageReceived = (payload) => {
    //     var payloadData = JSON.parse(payload.body);
    //     switch (payloadData.status) {
    //         case "JOIN":
    //             if (!privateChats.get(payloadData.senderName)) {
    //                 privateChats.set(payloadData.senderName, []);
    //                 setPrivateChats(new Map(privateChats));
    //             }
    //             break;
    //         case "MESSAGE":
    //             publicChats.push(payloadData);
    //             setPublicChats([...publicChats]);
    //             break;
    //     }
    // }

    // const onPrivateMessage = (payload) => {
    //     console.log(payload);
    //     var payloadData = JSON.parse(payload.body);
    //     if (privateChats.get(payloadData.senderName)) {
    //         privateChats.get(payloadData.senderName).push(payloadData);
    //         setPrivateChats(new Map(privateChats));
    //     } else {
    //         let list = [];
    //         list.push(payloadData);
    //         privateChats.set(payloadData.senderName, list);
    //         setPrivateChats(new Map(privateChats));
    //     }
    // }

    // const onError = (err) => {
    //     console.log(err);

    // }

    // const handleMessage = (event) => {
    //     const { value } = event.target;
    //     setUserData({ ...userData, "message": value });
    // }
    // const sendValue = () => {
    //     if (stompClient) {
    //         var chatMessage = {
    //             senderName: userData.username,
    //             message: userData.message,
    //             status: "MESSAGE"
    //         };
    //         console.log(chatMessage);
    //         stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
    //         setUserData({ ...userData, "message": "" });
    //     }
    // }

    // const handleUsername = (event) => {
    //     const { value } = event.target;
    //     setUserData({ ...userData, "username": value });
    // }

    // const registerUser = () => {
    //     connect();
    // }

    // useEffect(() => {
    //     registerUser();
    // }, []);

    // const [emoji, setEmoji] = useState(false);
    // const [message, setMessage] = useState("");
    // const [selectedEmoji, setSelectedEmoji] = useState("");

    // function onClick(emojiData, event) {
    //     setSelectedEmoji(emojiData.unified);
    //     console.log(emojiData);
    //     setMessage((previousMessage) => previousMessage + emojiData.emoji);
    // }

    // const time = new Date().toLocaleTimeString();

    // const { t } = useTranslation();

    return (
        <div className="messages">
            <Header/>
            <Nav />


            <div className="container">

                <div className="backgroud-title">
                    <Title nav="chatMessages" title="message" />
                </div>

                {/* <div className="box-message">
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
                        <div className="member-list">
                            <ul>
                                    <li onClick={() => { setTab("CHATROOM") }} className={`member ${tab === "CHATROOM" && "active"}`}>Chatroom</li>
                                    {[...privateChats.keys()].map((name, index) => (
                                        <li onClick={() => { setTab(name) }} className={`member ${tab === name && "active"}`} key={index}>{name}</li>
                                    ))}
                                </ul>
                        </div>
                        {tab === "CHATROOM" && <div className="chat-content">
                            <ul className="chat-messages">
                                {publicChats.map((chat, index) => (
                                    <li className={`message-user ${chat.senderName === userData.username && "self"}`} key={index}>
                                        {chat.senderName !== userData.username && <div className="avatar">{chat.senderName}</div>}
                                        <div className="message-data"><span>{chat.message}</span></div>

                                        <div className='message-time'>{time}</div>
                                    </li>
                                ))}
                            </ul>

                            <div className="send-message">


                                <input type="text" className="input-message" placeholder="enter the message" value={userData.message} onChange={handleMessage} />


                                <div className="display-flex">
                                    <div className="input-message">
                                        <input type="text" placeholder={t("sendYourMessage")}
                                            onInput={(e) =>
                                                setMessage(e.target.value)}
                                            value={userData.message} onChange={handleMessage}
                                        />


                                        <div className="actions-message">


                                            <div className="add-reaction" onClick={() => setEmoji(!emoji)}>
                                                <span className="material-symbols-outlined">
                                                    add_reaction
                                                </span>
                                            </div>

                                            <div className="attach_file">
                                                <span className="material-symbols-outlined">
                                                    attach_file
                                                </span>
                                            </div>

                                        </div>
                                    </div>



                                    <button type="button" className="send send-ubtton" onClick={sendValue}>
                                        <span className="material-symbols-outlined">
                                            send
                                        </span>
                                    </button>
                                </div>

                            </div>
                        </div>}

                    </div>

                    <div className="text-field">

                        {emoji ? (
                            <div className="Emoji">
                                <EmojiPicker

                                    onEmojiClick={onClick}
                                    autoFocusSearch={false} />
                            </div>
                        ) : null}

                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default ChatRoom
