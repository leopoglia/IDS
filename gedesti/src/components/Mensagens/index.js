import "./style.css"
import Header from "../Fixed/Header"
import Nav from "../Fixed/Nav"
import Title from "../Fixed/Search/Title";
import Mensagem from "./Mensagem";


export default function Mensagens() {
    return (
        <div className="mensagens">
            <Header />
            <Nav />

            <div className="container">
                <div className="fundo-titulo">
                    <Title nav="Mensagens" title="Mensagens" />
                </div>

                <Mensagem />
                <Mensagem />
                <Mensagem />
                <Mensagem />
        
            </div>

        </div>
    );
}