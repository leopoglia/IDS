import "./style.css"
import Header from "../Fixed/Header"
import Nav from "../Fixed/Nav"
import Title from "../Fixed/Search/Title";


export default function Configuracao() {
    return (
        <div className="configuracao">
            <Header />
            <Nav />

            <div className="container">
                <div className="fundo-titulo">
                    <Title nav="Configurações" title="Configurações" />
                </div>

                <div className="caixa"></div>
        
            </div>

        </div>
    );
}