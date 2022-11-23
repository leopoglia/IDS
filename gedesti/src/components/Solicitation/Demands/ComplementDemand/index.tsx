import Header from "../../../Fixed/Header"
import Nav from "../../../Fixed/Nav"
import Title from "../../../Fixed/Search/Title"
import SelectSizeDemand from "../RankDemand/SelectSizeDemand"
import './style.css'

export default function ComplementDemand() {
    return (
        <div className="complement-demand">

            <Header icon="playlist_add" title="Complementar Demanda" />

            <Nav />


            <div className="container">


                <div className="background-title">

                    <Title nav="Demandas > Visualizar Demanda > Complementar Demanda" title="Complementar Demanda" />

                </div>


                <div className="box">
                    <div className="display-grid-select">
                        <label htmlFor="">Prazo da execução da demanda *</label>
                        <SelectSizeDemand />
                    </div>
                    <div className="display-grid">
                        <label htmlFor="">Código do PPM *</label>
                        <input type="text" />
                    </div>
                    <div className="display-grid">
                        <label htmlFor="">Link para EPIC do Jira *</label>
                        <input type="text" />
                    </div>



                    <div className="attatchments-complements">
                        <span>Anexos</span>

                        <div className="attachments">
                            <input type="file" id="file" />
                            <label htmlFor="file">
                                <span className="material-symbols-outlined">
                                    upload_file
                                </span>Enviar arquivo</label>
                        </div>

                    </div>

                </div>
                <div className="demands-footer">
                    <button className="btn-secondary">Cancelar</button>
                    <button className="btn-primary">Complementar</button>
                </div>
            </div>
        </div >
    )
}