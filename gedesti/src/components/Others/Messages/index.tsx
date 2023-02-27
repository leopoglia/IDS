import "./style.css"
import Header from "../../Fixed/Header"
import Nav from "../../Fixed/Nav"
import Title from "../../Fixed/Search/Title";
import Footer from "../../Fixed/Footer";
import Message from "./MessageBox";


export default function Messages() {
    return (
        <div className="messages">
            <Header />
            <Nav />

            <div className="container">
                <div className="backgroud-title">
                    <Title nav="messages" title="messages" />
                </div>

                <div className="container-background">
                    <Message />
                    <Message />
                    <Message />
                    <Message />
                    <Message />
                    <Message />
                    <Message />
                    <Message />
                    <Message />
                    <Message />
                    <Message />
                    <Message />
                    <Message />
                    <Message />
                    <Message />
                    <Message />
                    <Message />
                    <Message />
                    <Message />
                    <Message />
                    <Message />

                </div>


                <div>
                    <div className="navigator" >
                        <div className="current">1</div>
                        <div>2</div>
                        <div>3</div>
                        <div>4</div>
                        <div>{">"}</div>
                    </div >
                    <Footer />
                </div >
            </div>



        </div>
    );
}