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



            </div>

        </div>
    );
}