import "./style.css"
import Header from "../../../Fixed/Header"
import Nav from "../../../Fixed/Nav"
import Title from "../../../Fixed/Search/Title";
import EmojiPicker, {
    EmojiStyle,
    SkinTones,
    Theme,
    Categories,
    EmojiClickData,
    Emoji,
    SuggestionMode
} from "emoji-picker-react";
import { useState } from "react";
import Footer from "../../../Fixed/Footer";


export default function Message() {

    const [emoji, setEmoji] = useState(false);
    const [message, setMessage] = useState("");
    const [selectedEmoji, setSelectedEmoji] = useState("");

    function onClick(emojiData: EmojiClickData, event: MouseEvent) {
        setSelectedEmoji(emojiData.unified);
        setMessage((previousMessage) => previousMessage + emojiData.emoji);
    }

    return (
        <div className="messages">
            <Header icon="chat" title="chat" />
            <Nav />

            <div className="container">
                <div className="backgroud-title">
                    <Title nav="Mensagens > Mensagem" title="message" />
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

                        <div className="messages-chat">
                            <div className="message-user">
                                <div className="message-content">
                                    <span className="message-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec interdum eleifend quam vitae viverra. Nullam vulputate elit a ipsum porttitor gravida. Proin et vehicula velit. Donec eget nulla quis
                                    </span>


                                    <div className="message-time">
                                        <span >12:00</span>
                                    </div>
                                </div>
                            </div>

                            <div className="message-two">
                                <div className="message-user">
                                    <div className="message-content">
                                        <span className="message-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec interdum eleifend quam vitae viverra. Nullam vulputate elit a ipsum porttitor gravida. Proin et vehicula velit. Donec eget nulla quis
                                        </span>


                                        <div className="message-time">
                                            <span >12:00</span>
                                        </div>
                                    </div>
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
                        ) : null}




                        <div className="input-message">
                            <input type="text" placeholder="Envie sua mensagem"
                                value={message}
                                onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setMessage(e.target.value)}
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
                        <div className="send">
                            <span className="material-symbols-outlined">
                                send
                            </span>
                        </div>
                    </div>
                </div>

                <Footer />

            </div>

        </div >
    );
}