import "./style.css"
import Header from "../../components/Fixed/Header"
import Nav from "../../components/Fixed/Nav"
import Title from "../../components/Fixed/Search/Title";


export default function Configuration() {
    return (
        <div className="configuration">
            <Header icon="settings" title="Configuração" />
            <Nav />

            <div className="container">
                <div className="background-title">
                    <Title nav="Configurações" title="Configurações" />
                </div>

                <div className="box">
                    <div className="profile">
                        <img className="picture-profile" src="https://media-exp1.licdn.com/dms/image/C5603AQGoPhhWyeL2-Q/profile-displayphoto-shrink_200_200/0/1516833080377?e=2147483647&v=beta&t=O_q0eYPuycqoRh8ACadEX5gQhrVbPnomvJKRFQTIycI" alt="" />
                        <div className="email-name">
                            <div className="flex">
                                <span className="name">Jair Paulo Satig</span>
                                <span className="material-symbols-outlined">
                                    edit
                                </span>
                            </div>
                            <span className="email">jair@weg.net</span>
                        </div>
                    </div>

                    <div className="change-configuration">
                        <div className="flex">
                            <span className="title-confuration">Senha</span>
                            <span className="material-symbols-outlined">
                                edit
                            </span>
                        </div>
                        <span className="subtitle-confuration">Alterar sua senha</span>
                    </div>

                    <div className="change-configuration">
                        <span className="title-confuration">Acessibilidade</span>
                        <span className="subtitle-confuration">Tamanho da fonte</span>
                    </div>

                    <div className="change-configuration">
                        <span className="title-confuration">Notificações</span>
                        <span className="subtitle-confuration">Notificações de mensagens</span>
                    </div>
                </div>

            </div>

        </div>
    );
}