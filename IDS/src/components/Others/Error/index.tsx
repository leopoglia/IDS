import { Link } from "react-router-dom"
import "./style.css"

export default function Erro() {

    return (
        <div className="error404">
            <div className="container">
                <div className="page404">
                    <div className="display-grid">
                        <p>Pagina não encontrada</p>
                        <p className="p404">404</p>
                        <Link to="/demands/1">
                            <button className="btn-primary">
                                Voltar para pagina inicial
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}