import "./style.css"
import Header from "../Fixed/Header"
import Nav from "../Fixed/Nav"
import Title from "../Fixed/Search/Title";
import ButtonActionAnalyst from "./ButtonActionAnalyst";
import { useState } from "react";


export default function ViewDemand() {

    const [actionsDemand, setActionsDemand] = useState(2);


    return (
        <div className="view-demand">

            <Header icon="folder_copy" title="Visualizar Demanda" />

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

                            <button className="btn-secondary">

                                <span>Reprovar</span>
                            </button>

                            <button className="btn-primary">
                                <span>Classificar</span>
                            </button>


                            <ButtonActionAnalyst />
                        </div>
                    )}

                </div>

                <div className="box">


                    <div className="situation-current">
                        <p>Situação a ser Resolvida (Situação Atual)</p>

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
                </div>

            </div>


        </div >
    );
}