import "./style.css"
import Header from "../../../Fixed/Header"
import Nav from "../../../Fixed/Nav"
import Title from "../../../Fixed/Search/Title";
import ButtonActionAnalyst from "./ButtonActionAnalyst";
import { Link } from "react-router-dom";
import { useState } from "react";
import Footer from "../../../Fixed/Footer";


export default function ViewDemand() {

    const url = window.location.href.split("/")[3];
    const [actionsDemand, setActionsDemand] = useState(2);
    const [stepDemand, setStepDemand] = useState(2);

    const [demands] = useState([
        { name: "Solicitação 001", requester: "Leonardo Heitor Poglia", date: "27/04/2022", situation: "Backlog", currentSituation: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec interdum eleifend quam vitae viverra. Nullam vulputate elit a ipsum porttitor gravida. Proin et vehicula velit. Donec eget nulla quis turpis placerat molestie a sed justo. Curabitur sit amet pellentesque metus. Donec dictum elit a libero aliquam aliquam. Nullam porttitor justo pharetra orci porttitor, id tristique diam pulvinar. Mauris facilisis, dolor et aliquam elementum, ex ligula ullamcorper tellus, a consequat purus augue at felis. Aliquam ante lectus, lobortis sit amet orci quis, porta lobortis turpis. Suspendisse aliquet vulputate sapien, non fringilla erat ultrices at. Proin elementum orci ut ante aliquet sollicitudin.", proposal: "Nunc maximus purus sit amet est lacinia condimentum. Praesent sodales leo a finibus semper. Nunc luctus libero fermentum varius imperdiet. Aliquam tellus leo, volutpat ac scelerisque eget, gravida in urna. Curabitur ac urna bibendum, faucibus eros quis, auctor nibh. Etiam auctor rhoncus velit. Nulla finibus fringilla magna, eu tempus nisl molestie sed. Vivamus efficitur dui at malesuada lobortis. Vestibulum ut nisi velit. Integer gravida lectus nisl, a malesuada metus iaculis id. Vivamus sit amet vestibulum arcu, at feugiat lectus. Phasellus felis sem, laoreet in neque vitae, convallis tincidunt neque. Donec aliquet mattis porta. Praesent luctus purus eget felis mattis, hendrerit fermentum risus efficitur. Mauris pharetra sit amet dolor quis maximus. Sed vel convallis felis.", costCenter: [{ number: "24342", name: "Nome do Centro de Custos" }] }
    ]);


    return (
        <div className="view-demand">



            {url === "demand" ? (
                <div>

                    <Header title="Visualizar Demanda" icon="visibility" />

                    <Nav />

                    <div className="container">

                        <div className="background-title">

                            <Title nav="Demandas > Visualizar Demanda" title="Visualizar Demanda" />

                            {(actionsDemand === 1) ? (

                                <button className="btn-primary">
                                    <span className="material-symbols-outlined">
                                        download
                                    </span>
                                    <span>Gerar PDF</span>
                                </button>
                            ) : (
                                <div className="display-flex">

                                    <Link to="/demand/disapprove">
                                        <button className="btn-secondary">
                                            <span>Reprovar</span>
                                        </button>
                                    </Link>

                                    <Link to="/demand/rank">
                                        <button className="btn-primary">
                                            <span>Classificar</span>
                                        </button>
                                    </Link>


                                    <ButtonActionAnalyst />
                                </div>
                            )}

                        </div>

                        <div className="box">

                            <div className="situation-current">
                                <p>Solicitante</p>
                                <span>Leonardo Heitor Poglia</span>
                            </div>

                            <div className="situation-current">
                                <p className="title">Situação a ser Resolvida (Situação Atual)</p>

                                <span>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec interdum eleifend quam vitae viverra. Nullam vulputate elit a ipsum porttitor gravida. Proin et vehicula velit. Donec eget nulla quis turpis placerat molestie a sed justo. Curabitur sit amet pellentesque metus. Donec dictum elit a libero aliquam aliquam. Nullam porttitor justo pharetra orci porttitor, id tristique diam pulvinar. Mauris facilisis, dolor et aliquam elementum, ex ligula ullamcorper tellus, a consequat purus augue at felis. Aliquam ante lectus, lobortis sit amet orci quis, porta lobortis turpis. Suspendisse aliquet vulputate sapien, non fringilla erat ultrices at. Proin elementum orci ut ante aliquet sollicitudin.
                                </span>

                                <p className="title">Proposta</p>

                                <span>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec interdum eleifend quam vitae viverra. Nullam vulputate elit a ipsum porttitor gravida. Proin et vehicula velit. Donec eget nulla quis turpis placerat molestie a sed justo. Curabitur sit amet pellentesque metus. Donec dictum elit a libero aliquam aliquam. Nullam porttitor justo pharetra orci porttitor, id tristique diam pulvinar. Mauris facilisis, dolor et aliquam elementum, ex ligula ullamcorper tellus, a consequat purus augue at felis. Aliquam ante lectus, lobortis sit amet orci quis, porta lobortis turpis. Suspendisse aliquet vulputate sapien, non fringilla erat ultrices at. Proin elementum orci ut ante aliquet sollicitudin.
                                </span>

                            </div>


                            <div className="cust-center">
                                <p className="title">Centro de Custos</p>

                                <hr />

                                <table>
                                    <tr>
                                        <td>Centro de Custos</td>
                                        <td>Nome do Centro de Custos</td>
                                    </tr>

                                    <hr />


                                    <tr>
                                        <td>55435235345</td>
                                        <td>Centro de Custos WEG II</td>
                                    </tr>

                                    <hr />

                                    <tr>
                                        <td>55435235345</td>
                                        <td>Centro de Custos WEG II</td>
                                    </tr>

                                    <hr />

                                </table>
                            </div>


                            <div className="real-benefit">
                                <p className="title">Beneficio Real</p>

                                <hr />

                                <div className="infos">

                                    <div>
                                        <span>Valor Mensal: </span>

                                        <span>R$50.000</span>

                                    </div>



                                </div>

                                <hr />

                                <div className="description">
                                    <span className="desc">Descrição</span>

                                    <span>
                                        Fusce sed facilisis velit. Donec dignissim neque id sem pulvinar ultrices. Curabitur faucibus mauris nec ante finibus tempus. Aliquam erat volutpat. Nulla in quam urna. Sed est lectus, viverra eu nibh sed, sollicitudin sagittis diam. Mauris venenatis accumsan lacus in porta. Aliquam suscipit et augue id finibus.
                                    </span>
                                </div>
                            </div>


                            <div className="potential-benefit">
                                <p className="title">Beneficio Potencial</p>

                                <hr />

                                <div className="infos">

                                    <div>
                                        <span>Valor Mensal: </span>

                                        <span>R$50.000</span>

                                    </div>


                                    <span>Obrigação Legal: Sim</span>

                                </div>

                                <hr />

                                <div className="description">
                                    <span className="desc">Descrição</span>

                                    <span>
                                        Fusce sed facilisis velit. Donec dignissim neque id sem pulvinar ultrices. Curabitur faucibus mauris nec ante finibus tempus. Aliquam erat volutpat. Nulla in quam urna. Sed est lectus, viverra eu nibh sed, sollicitudin sagittis diam. Mauris venenatis accumsan lacus in porta. Aliquam suscipit et augue id finibus.
                                    </span>
                                </div>
                            </div>


                            <div className="qualitative-benefit">
                                <p className="title">Beneficio Qualitativo</p>

                                <hr />

                                <div className="infos">

                                    <div>
                                        <span>Valor Mensal: </span>

                                        <span>R$50.000</span>

                                    </div>


                                    <div>
                                        <span>Obrigação Legal: Sim</span>
                                    </div>

                                    <span>Requisitos de controles internos: Sim</span>

                                </div>

                                <hr />

                                <div className="description">
                                    <span className="desc">Descrição</span>

                                    <span>
                                        Fusce sed facilisis velit. Donec dignissim neque id sem pulvinar ultrices. Curabitur faucibus mauris nec ante finibus tempus. Aliquam erat volutpat. Nulla in quam urna. Sed est lectus, viverra eu nibh sed, sollicitudin sagittis diam. Mauris venenatis accumsan lacus in porta. Aliquam suscipit et augue id finibus.
                                    </span>
                                </div>


                            </div>


                            <div className="attachments">


                                <p className="title">Anexos</p>

                                <div className="attachment">
                                    <div className="attachment-image">
                                        <img src="/attachment/pdf.png" alt="" />
                                    </div>
                                    <span>attachments.pdf</span>
                                </div>

                            </div>

                            {(stepDemand === 1 || stepDemand === 2) ? (
                                <div className="classification" >

                                    <p>Classificação</p>


                                    <table>
                                        <hr />
                                        <tr>
                                            <td>Tamanho</td>
                                            <td>BU Solicitante</td>
                                            <td>BU Beneficiada</td>
                                            <td>Sessão do TI responsável</td>

                                        </tr>

                                        <hr />


                                        <tr>
                                            <td>Pequeno - 40 - 400 horas</td>
                                            <td>WEG II</td>
                                            <td>WEG Motores</td>
                                            <td>Centro WEG</td>

                                        </tr>

                                        <hr />


                                    </table>
                                </div>



                            ) : (
                                <div className="null"></div>
                            )}

                            {(stepDemand === 2) ? (

                                <div className="complement" >
                                    <p>Complementos</p>

                                    <table>
                                        <hr />
                                        <tr>
                                            <td>Prazo Execução</td>
                                            <td>Código PPM</td>
                                            <td>Link EPIC Jira</td>

                                        </tr>

                                        <hr />


                                        <tr>
                                            <td>4 meses</td>
                                            <td>98765432</td>
                                            <td><a target="_blank" href="https://ctw2022.atlassian.net/jira/software/projects/P2/boards/1/roadmap?shared=&atlOrigin=eyJpIjoiNmQ5YjMzOWUyNWNmNGNiZTgyMmI2MGNjMTRmNmZiYjEiLCJwIjoiaiJ9">Abrir JIRA</a></td>

                                        </tr>

                                        <hr />


                                    </table>

                                    {/* 
                            <table>
                                <hr />
                                <tr>
                                    <td>Tipo</td>
                                    <td>Perfil</td>
                                    <td>Período de execução</td>
                                    <td>Horas necessárias</td>
                                    <td>Valor da hora</td>
                                    <td>Centro de custos</td>
                                    <td>Valor total</td>

                                </tr>

                                <hr />


                                <tr>
                                    <td>Externa</td>
                                    <td>WEG II</td>
                                    <td>WEG Motores</td>
                                    <td>WEG</td>
                                    <td>WEG</td>
                                    <td>WEG</td>
                                    <td>WEG</td>


                                </tr>

                                <hr />


                            </table> */}

                                </div>


                            ) : (
                                <div className="null"></div>
                            )}
                        </div>
                    </div>
                </div>
            ) : url === "proposal" ? (
                <div>
                    <Header title="Visualizar Proposta" icon="visibility" />

                    <Nav />

                    <div className="container">


                        <div className="background-title">

                            <Title nav="Propostas > Visualizar Proposta" title="Visualizar Proposta" />
                        </div>

                        <div className="box"></div>

                    </div>
                </div>
            ) : url === "agenda" ? (
                <div>
                    <Header title="Visualizar Pauta" icon="visibility" />

                    <Nav />

                    <div className="container">


                        <div className="background-title">

                            <Title nav="Pautas > Visualizar Pauta" title="Visualizar Pauta" />
                        </div>

                        <div className="box"></div>

                    </div>
                </div>
            ) : url === "minute" ? (
                <div>
                    <Header title="Visualizar Ata" icon="visibility" />

                    <Nav />

                    <div className="container">


                        <div className="background-title">

                            <Title nav="Atas > Visualizar Ata" title="Visualizar Ata" />
                        </div>

                        <div className="box"></div>

                    </div>
                </div>
            ) : (
                <div />
            )}


            <Footer />


        </div>



    );

}
