import Header from "../../Fixed/Header";
import Nav from "../../Fixed/Nav";
import Title from "../../Fixed/Search/Title";
import "./style.css";
import { Link } from "react-router-dom";
import Input from "../../Demands/CrateDemand/Input";


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

                    </div>


                    <div className="proposals-agenda">
                        <div className="proposal">
                            <div className="proposal-agenda">
                                <p>Nome da Proposta</p>


                                <div className="delete-proposal-agenda">
                                    <span className="material-symbols-outlined">
                                        delete
                                    </span>


                                </div>


                            </div>


                            <div className="check-box">

                                <input type="checkbox" />

                                <label>Ata Públicada</label>

                            </div>
                        </div>

                        <div className="display-flex-end">
                            <Link to="/agenda/select-proposals">
                                <button className="btn-primary">Adicionar Proposta</button>
                            </Link>
                        </div>


                    </div>


                    <div className="display-flex">
                        <Input label="Nome da Pauta" required="*" />
                        <Input label="Número" required="*" />
                        <Input label="Ano" required="*" />
                    </div>


                </div>


                <div className="display-flex-end">
                    <Link to="/agenda">
                        <button className="btn-primary">Salvar</button>
                    </Link>
                </div>

            </div>
        </div>

    )
}