import Header from "../../../Fixed/Header";
import Nav from "../../../Fixed/Nav";
import Footer from "../../../Fixed/Footer";
import Title from "../../../Fixed/Search/Title";
import GridCostExecution from "./GridCostExecution";
import SelectCostExecution from "./SelectCostExecution";
import { Link } from "react-router-dom";
import "./style.css"

export default function ExecutionCosts() {

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

                        <Link to="add-expense">
                            <button className="btn-secondary">Adicionar despesa</button>
                        </Link>
                    </div>

                    <GridCostExecution />

                    <div className="display-flex-grid">
                        <div>
                            <label>Centros de custos pagantes *</label>

                            <div className="display-flex">
                                <SelectCostExecution />

                                <button className="btn-primary btn-center-cost">
                                    <span className="material-symbols-outlined">
                                        add
                                    </span>
                                </button>
                            </div>
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