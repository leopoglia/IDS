import Header from "../Fixed/Header"
import Nav from "../Fixed/Nav"
import SelectSizeDemand from "../RankDemand/SelectSizeDemand"
import './style.css'

export default function ComplementDemand() {
    return (
        <div className="complement-demand">

            <Header icon="playlist_add" title="Complementar Demanda" />

            <Nav />

            <div className="container">
                <div className="title">
                    <h1>Complementar Demanda</h1>
                </div>
                <div className="box">
                    <div className="display-grid">
                        <label htmlFor="">Prazo da execução da demanda *</label>
                        <SelectSizeDemand />
                    </div>
                    <div className="display-grid">
                        <label htmlFor="">Justificativa *</label>
                        <textarea />
                    </div>
                    <div className="display-grid">
                        <label htmlFor="">Impacto *</label>
                        <textarea />
                    </div>
                    <div className="display-grid">
                        <label htmlFor="">Benefícios *</label>
                        <textarea />
                    </div>
                </div>
                <div className="demands-footer">
                    <button className="btn-secondary">Cancelar</button>
                    <button className="btn-primary">Complementar</button>
                </div>
            </div>
        </div>
    )
}