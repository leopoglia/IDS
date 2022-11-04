import "./style.css"
import Header from "../Fixed/Header"
import Nav from "../Fixed/Nav"
import Title from "../Fixed/Search/Title";


export default function Message() {
    return (
        <div className="messages">
            <Header icon="chat" title="Mensagem" />
            <Nav />

            <div className="container">
                <div className="backgroud-title">
                    <Title nav="Mensagens > Mensagem" title="Mensagem" />
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



                    <div className="message-user">
                        <div className="message-content">
                            <span className="message-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec interdum eleifend quam vitae viverra. Nullam vulputate elit a ipsum porttitor gravida. Proin et vehicula velit. Donec eget nulla quis
                            </span>


                            <div className="message-time">
                                <span >12:00</span>
                            </div>
                        </div>
                    </div>


                    <div className="text-field">

                        <div className="input-message">
                            <input type="text" placeholder="Envie sua mensagem" />
                            <span className="material-symbols-outlined">
                                add_reaction
                            </span>

                            <span className="material-symbols-outlined">
                                attach_file
                            </span>
                        </div>

                        <div className="send">
                            <span className="material-symbols-outlined">
                                send
                            </span>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
}