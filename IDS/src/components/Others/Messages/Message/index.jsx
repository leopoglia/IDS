import React, { useEffect, useState } from 'react'
import EmojiPicker from "emoji-picker-react";
import { useTranslation } from "react-i18next";
import "./style.css"
import Header from "../../../Fixed/Header"
import Nav from "../../../Fixed/Nav"
import Title from "../../../Fixed/Search/Title";

const ChatRoom = () => {

    const handleMessage = (event) => {
        const { value } = event.target;

    }

    const [emoji, setEmoji] = useState(false);
    const [message, setMessage] = useState("");
    const [selectedEmoji, setSelectedEmoji] = useState("");

    function onClick(emojiData, event) {
        setSelectedEmoji(emojiData.unified);
        console.log(emojiData);
        setMessage((previousMessage) => previousMessage + emojiData.emoji);
    }


    const { t } = useTranslation();

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
                            <ul className="chat-messages">

                                <li className={`message-user`}>
                                        <div className="message-data"><span></span></div>

                                        {/* <div className='message-time'>{time}</div> */}
                                </li>
                                
                            </ul>

                            <div className="send-message">



                                <div className="display-flex">
                                    <div className="input-message">
                                        <input type="text" placeholder={t("sendYourMessage")}
                                            onInput={(e) =>
                                                setMessage(e.target.value)}
                                            value={message} onChange={handleMessage}
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



                                    <button type="button" className="send send-ubtton">
                                        <span className="material-symbols-outlined">
                                            send
                                        </span>
                                    </button>
                                </div>

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