import Header from "../../../Fixed/Header";
import Nav from "../../../Fixed/Nav";
import Footer from "../../../Fixed/Footer";
import Title from "../../../Fixed/Search/Title";
import GridCostExecution from "./GridCostExecution";
import SelectCostExecution from "./SelectCostExecution";
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

                        <button className="btn-primary">Adicionar despesa</button>
                    </div>

                    <GridCostExecution />

                    <div className="display-flex-grid">
                        <div>
                            <label>Centros de custos pagantes *</label>
                            <SelectCostExecution />
                        </div>

                        <div>
                            <label>Respnsáveis pelo negócio *</label>
                            <SelectCostExecution />
                        </div>
                    </div>
                </div>

                <div className="demands-footer">
                    <button className="btn-secondary">Cancelar</button>
                    <button className="btn-primary">Gerar proposta</button>
                </div>
            </div>

        </div>
    );
}