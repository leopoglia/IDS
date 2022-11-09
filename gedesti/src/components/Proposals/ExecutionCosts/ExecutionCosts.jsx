import Header from "../../Fixed/Header";
import Nav from "../../Fixed/Nav";
import Footer from "../../Fixed/Footer";
import Title from "../../Fixed/Search/Title";
import GridCostExecution from "../GridCostExecution";

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


                    <GridCostExecution />

                </div>
            </div>

        </div>
    );
}