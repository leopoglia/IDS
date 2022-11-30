import "./style.css"
import Header from "../../Fixed/Header"
import Nav from "../../Fixed/Nav"
import Title from "../../Fixed/Search/Title";
import Notification from "./Notification";
import Footer from "../../Fixed/Footer";

export default function Notifications() {
    return (
        <div className="notifications">

            {/* <div className="barrier"></div>
            <img className="bia" src="https://i.imgur.com/r004kLD.png"></img> */}

            <Header icon="notifications" title="notifications" />
            <Nav />

            <div className="container">
                <div className="backgroud-title">
                    <Title nav="Notificações" title="Notificações" />
                </div>

                <Notification />
                <Notification />
                <Notification />
                <Notification />

                <Footer />

            </div>


        </div>
    );
}