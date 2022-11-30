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
                        <div>
                            <label>Centros de custos pagantes *</label>
                            <SelectCostExecution />
                        </div>

                        <div>
                            <label>Respnsáveis pelo negócio *</label>
                            <input type="text" />
                        </div>
                    </div>

                    <div className="display-flex-grid">
                        <div>
                            <label>Início *</label>
                            <input type="date" />
                        </div>

                        <div>
                            <label>Fim *</label>
                            <input type="date" />
                        </div>
                    </div>

                </div>

                <div className="demands-footer">
                    <button className="btn-secondary">Cancelar</button>
                    <Link to="/proposal/edit-scope">
                        <button className="btn-primary">Gerar proposta</button>
                    </Link>
                </div>
            </div>

        </div>
    );
}