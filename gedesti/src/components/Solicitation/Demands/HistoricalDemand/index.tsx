import Header from "../../../Fixed/Header";
import Nav from "../../../Fixed/Nav";
import Title from "../../../Fixed/Search/Title";

export default function HistoricalDemand() {
    return (
        <div className="historical-demand">

            <Header icon="folder_copy" title="Histórico de alterações" />

            <Nav />

            <div className="container">

                <div className="backgroud-title">
                    <Title nav="Demandas > Visualizar Demanda > Histórico de alterações" title="Histórico de alterações" />
                </div>

                <div className="box">

                </div>
            </div>
        </div>
    );
}