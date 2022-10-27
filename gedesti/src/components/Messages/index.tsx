import "./style.css"
import Header from "../Fixed/Header"
import Nav from "../Fixed/Nav"
import Title from "../Fixed/Search/Title";
import Message from "./Message";


export default function Messages() {
    return (
        <div className="messages">
            <Header icon="chat" title="Mensagens" />
            <Nav />

            <div className="container">
                <div className="backgroud-title">
                    <Title nav="Mensagens" title="Mensagem" />
                </div>

                <Message />
                <Message />
                <Message />
                <Message />

            </div>

        </div>
    );
}