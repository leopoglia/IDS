import "./style.css"
import Header from "../Fixed/Header"
import Nav from "../Fixed/Nav"
import Title from "../Fixed/Search/Title";
import Notificacao from "./Notificacao";

export default function Notificacoes() {
    return (
        <div className="notificacoes">
            <Header />
            <Nav />

            <div className="container">
                <div className="fundo-titulo">
                    <Title nav="Notificações" title="Notificações" />
                </div>

                <Notificacao />
                <Notificacao />
                <Notificacao />
                <Notificacao />
               
            </div>

        </div>
    );
}