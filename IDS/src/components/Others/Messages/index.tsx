import "./style.css"
import Header from "../../Fixed/Header"
import Nav from "../../Fixed/Nav"
import Title from "../../Fixed/Search/Title";
import Footer from "../../Fixed/Footer";
import Message from "./MessageBox";
import { useEffect } from "react";
import ServicesMessages from "../../../services/messageService";


export default function Messages() {

    let messages = [1, 2, 3, 4, 5, 6, 7];

    useEffect(() => {

        
    
    }, []);

    return (
        <div className="messages">
            <Header />
            <Nav />

            <div className="container">
                <div className="backgroud-title">
                    <Title nav="messages" title="messages" />
                </div>

                <div className="container-background">
                    <div className="boxNoPadding">
                        {
                            messages.map((val: any, index) => {
                                if (index > 5 && messages.length - 1 === index) {
                                    return (
                                        <div>
                                            <Message bottom={false} />
                                        </div>
                                    );
                                } else {
                                    return (
                                        <div>
                                            <Message bottom={true} />
                                        </div>
                                    );
                                }

                            })
                        }

                    </div>
                </div>


                <div className="h45"></div >

                <Footer />
            </div>
        </div>
    );
}