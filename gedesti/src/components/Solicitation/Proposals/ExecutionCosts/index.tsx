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
                    </div>

                    <div className="block">
                        <GridCostExecution />

                        <div className="display-flex-space-between">

                            <Link to="add-expense">
                                <button className="btn-secondary">Adicionar despesa</button>
                            </Link>
                        </div>


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

                                <div className="cost-center">
                                    <span>Centro de Custo Tal</span>

                                    <div>
                                        <input type="number" />
                                        <label htmlFor="">%</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>


                <div className="demands-footer">
                    <Link to="/proposal/informations">
                        <button className="btn-secondary">Voltar</button>
                    </Link>

                    <div className="display-flex-center">
                        <div className="costs-execution">
                            <span>Custos totais: R$ 0,00</span>

                            <span>Custos externo: R$ 0,00</span>

                            <span>Custos interno: R$ 0,00</span>

                        </div>

                        <Link to="/proposals">
                            <button className="btn-primary">Gerar Proposta</button>
                        </Link>
                    </div>
                </div>
            </div>

        </div>
    );
}