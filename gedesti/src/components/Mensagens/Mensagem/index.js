import "./style.css"


export default function Mensagem() {
    return (
        <div className="mensagem">
            <div className="perfil">
                <img className="foto-usuario" src="https://media-exp1.licdn.com/dms/image/C5603AQGoPhhWyeL2-Q/profile-displayphoto-shrink_200_200/0/1516833080377?e=2147483647&v=beta&t=O_q0eYPuycqoRh8ACadEX5gQhrVbPnomvJKRFQTIycI" alt="" />
                <div className="nome-mensagem">
                    <span className="nome-usuario">Jair Paulo Satig - Analista da demanda 01</span>
                    <span className="ultima-mensagem">Eduarda: Demanda ok!</span>
                </div>
            </div>

            <div className="data-horario">
                <span className="data">11/05/2022</span>
                <span className="horario">19:30</span>

            </div>
        </div>
    );
}