import Header from "../../Fixed/Header";
import Nav from "../../Fixed/Nav";
import Title from "../../Fixed/Search/Title";
import "./style.css";

export default function Dashboard() {

    return (<div className="dashboard">


        <Header />
        <Nav />


        <div className="container">

            <Title title="Dashboard" nav="Dashboard" />


            <div className="content">

                <div className="display-flex">
                    <div className="box">

                        <p>Novas demandas</p>


                        <div className="display-flex-center">
                            <div className="material-simbols-outlined">
                                <span className="material-symbols-outlined">draft</span>
                            </div>

                            <span className="gg">10</span>
                        </div>

                    </div>

                    <div className="box">

                        <p>Novas propostas</p>

                        <div className="display-flex-center">

                            <div className="material-simbols-outlined">
                                <span className="material-symbols-outlined">request_quote</span>
                            </div>

                            <span className="gg">10</span>
                        </div>


                    </div>

                    <div className="box">

                        <p>Novas pautas</p>

                        <div className="display-flex-center">

                            <div className="material-simbols-outlined">
                                <span className="material-symbols-outlined">folder</span>
                            </div>

                            <span className="gg">10</span>
                        </div>


                    </div>
                </div>

            </div>



        </div>

    </div>)
}