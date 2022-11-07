import Footer from "../Fixed/Footer";
import Header from "../Fixed/Header";
import Nav from "../Fixed/Nav";
import Title from "../Fixed/Search/Title";
import "./style.css"

export default function DisapproveDemand() {

    return (
        <div className="disapprove-demand">

            <Header icon="close" title="Reprovar Demanda" />

            <Nav />

            <div className="container">

                <div className="background-title">

                    <Title nav="Demandas > Visualizar Demanda > Reprovar Demanda" title="Reprovar Demanda" />

                </div>

                <div className="box">

                    <div className="disapprove-demand">

                        <div className="display-grid">
                            <label htmlFor="">Motivo da reprovação *</label>

                            <textarea />
                        </div>
                    </div>

                </div>

                <div className="demands-footer">

                    <button className="btn-secondary">Cancelar</button>

                    <button className="btn-primary">Reprovar</button>

                </div>

            </div>

            <Footer />
        </div>
    );
}