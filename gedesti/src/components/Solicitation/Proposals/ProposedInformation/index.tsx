import Header from "../../../Fixed/Header";
import Nav from "../../../Fixed/Nav";
import Footer from "../../../Fixed/Footer";
import Title from "../../../Fixed/Search/Title";
import SelectCostExecution from "./SelectCostExecution";
import { Link } from "react-router-dom";
import "./style.css"

export default function ProposedInformation() {

    return (
        <div className="execution-costs">

            <Header title="Execution Costs" icon="payments" />

            <Nav />

            <div className="container">


                <div className="background-title">
                    <Title title="Execution Costs" nav="Demands > Execution Costs" />
                </div>

                <div className="box">


                    <div className="display-flex">
                        <p>Custos de execução do projeto </p>
                    </div>


                    <div className="display-flex-grid">
                        <div className="one">
                            <label>Responsável pelo negócio *</label>
                            <input type="text" />
                        </div>

                        <div>
                            <label>Área do responsável</label>
                            <input type="text" />
                        </div>
                    </div>

                    <div className="display-flex-grid">
                        <div className="one">
                            <label>Início *</label>
                            <input type="date" />
                        </div>

                        <div>
                            <label>Fim *</label>
                            <input type="date" />
                        </div>
                    </div>

                    <div className="display-btn-anexo">
                        <label>Anexo</label>
                        <div className="attachments">
                            <input type="file" id="file" />
                            <label htmlFor="file">
                                <span className="material-symbols-outlined">
                                    upload_file
                                </span>

                                Enviar arquivo</label>
                        </div>
                    </div>
                </div>

                <div className="demands-footer">
                    <Link to="/proposal/execution-costs">
                        <button className="btn-secondary">Voltar</button>
                    </Link>
                    <Link to="/proposal/edit-scope">
                        <button className="btn-primary">Gerar proposta</button>
                    </Link>
                </div>
            </div>

        </div>
    );
}