import "./style.css"
import Header from "../../Fixed/Header"
import Nav from "../../Fixed/Nav"
import Title from "../../Fixed/Search/Title";
import Message from "./MessageBox";
import Footer from "../../Fixed/Footer";


export default function Messages() {
    return (
        <div className="messages">
            <Header icon="chat" title="messages" />
            <Nav />

            <div className="container">
                <div className="backgroud-title">
                    <Title nav="messages" title="messages" />
                </div>

                <Message />
                <Message />
                <Message />
                <Message />

                <Footer />

            </div>



        </div>
    );
}