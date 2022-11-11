import Header from "../../Fixed/Header";
import Nav from "../../Fixed/Nav";
import Title from "../../Fixed/Search/Title";
import "./style.css";
import { Link } from "react-router-dom";


export default function CreateAgenda() {

    return (
        <div className="create-agenda">
            <Header icon="file_copy" title="Criar Pauta" />
            <Nav />
            <div className="container">
                <div className="background-title">
                    <Title title="Criar Pauta" nav="Pautas > Criar Pauta" />
                </div>

                <div className="box">

                    <div className="display-flex">
                        <p>Propostas</p>
                        <Link to="/agenda/select-proposals">
                            <button className="btn-primary">Adicionar Proposta</button>
                        </Link>
                    </div>


                </div>
            </div>

        </div>
    )
}