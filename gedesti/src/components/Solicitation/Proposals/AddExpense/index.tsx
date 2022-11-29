import { Link } from "react-router-dom";
import Header from "../../../Fixed/Header";
import Nav from "../../../Fixed/Nav";
import Title from "../../../Fixed/Search/Title";
import SelectAddExpense from "./SelectAddExpense";
import "./style.css";

export default function addExpense() {
    return (
        <div className="add-expense">
            <Header title="Adicionar Despesa" icon="add" />

            <Nav />

            <div className="container">


                <div className="background-title">
                    <Title title="Adicionar Despesa" nav="Demands > Execution Costs > Adicionar Despesa" />
                </div>

                <div className="box">

                    <p>Informações da Despesa</p>


                    <div className="display-flex-grid">
                        <label>Tipo de despesa *</label>
                        <SelectAddExpense />
                    </div>

                    <div className="display-flex-grid">
                        <label>Perfil da despesa *</label>
                        <SelectAddExpense />
                    </div>

                    <div className="display-flex-grid">
                        <label>Período de execução (meses) *</label>
                        <input type="number" />
                    </div>

                    <div className="display-flex-grid">
                        <label>Quantidade de horas necessárias *</label>
                        <input type="number" />
                    </div>

                    <div className="display-flex-grid">
                        <label>Valor hora *</label>
                        <input type="number" />
                    </div>

                    <div className="display-flex-grid">
                        <label>Valor todal da despesa *</label>
                        <input type="number" />
                    </div>
                </div>

                <div className="display-flex-end">
                    <Link to="/proposal/execution-costs">
                        <button className="btn-primary">Adicionar</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}