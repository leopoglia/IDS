import Header from "../../../Fixed/Header";
import Nav from "../../../Fixed/Nav";
import Title from "../../../Fixed/Search/Title";
import { Link } from "react-router-dom";
import "./style.css";


export default function CommissionOpinion() {
    return (
        <div className="commission-opinion">

            <Header title="Parecer da  Comissão" icon="edit" />

            <Nav />

            <div className="container">

                <div className="background-title">

                    <Title title="Parecer da  Comissão" nav="Proposals > Parecer da  Comissão" />


                </div>

                <div className="box">

                    <p>Parecer da comissão</p>

                    <div className="display-flex">
                        <div className="display-grid">
                            <label htmlFor="yes">Aprovado</label>
                            <input type="radio" id="yes" name="parecer" />
                        </div>

                        <div className="display-grid">

                            <label htmlFor="no">Reprovado</label>
                            <input type="radio" id="no" name="parecer" />
                        </div>
                    </div>


                    <p>Observações</p>

                    <textarea className="textarea" />
                </div>

                <div className="display-flex-end">
                    <Link to="/agenda/view">
                        <button className="btn-primary">Salvar</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}