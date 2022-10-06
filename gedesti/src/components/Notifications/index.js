import "./style.css"
import Header from "../Fixed/Header"
import Nav from "../Fixed/Nav"
import Title from "../Fixed/Search/Title";
import Notification from "./Notification";

export default function Notifications() {
    return (
        <div className="notifications">
            <Header />
            <Nav />

            <div className="container">
                <div className="backgroud-title">
                    <Title nav="Notificações" title="Notificações" />
                </div>

                <Notification />
                <Notification />
                <Notification />
                <Notification />
               
            </div>

        </div>
    );
}