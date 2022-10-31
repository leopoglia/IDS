import "./style.css"
import Header from "../Fixed/Header"
import Nav from "../Fixed/Nav"
import Title from "../Fixed/Search/Title";

export default function ViewDemand() {
    return (
        <div className="view-demand">

            <Header icon="folder_copy" title="Visualizar Demanda" />

            <Nav />

            <div className="container">

                <div className="background-title">

                    <Title nav="Demandas > Visualizar Demanda" title="Visualizar Demanda" />

                </div>

                <div className="box">

                    <p>Situação a ser Resolvida (Situação Atual)</p>

                    <span>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec interdum eleifend quam vitae viverra. Nullam vulputate elit a ipsum porttitor gravida. Proin et vehicula velit. Donec eget nulla quis turpis placerat molestie a sed justo. Curabitur sit amet pellentesque metus. Donec dictum elit a libero aliquam aliquam. Nullam porttitor justo pharetra orci porttitor, id tristique diam pulvinar. Mauris facilisis, dolor et aliquam elementum, ex ligula ullamcorper tellus, a consequat purus augue at felis. Aliquam ante lectus, lobortis sit amet orci quis, porta lobortis turpis. Suspendisse aliquet vulputate sapien, non fringilla erat ultrices at. Proin elementum orci ut ante aliquet sollicitudin.
                    </span>

                    <p className="title">Proposta</p>

                    <span>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec interdum eleifend quam vitae viverra. Nullam vulputate elit a ipsum porttitor gravida. Proin et vehicula velit. Donec eget nulla quis turpis placerat molestie a sed justo. Curabitur sit amet pellentesque metus. Donec dictum elit a libero aliquam aliquam. Nullam porttitor justo pharetra orci porttitor, id tristique diam pulvinar. Mauris facilisis, dolor et aliquam elementum, ex ligula ullamcorper tellus, a consequat purus augue at felis. Aliquam ante lectus, lobortis sit amet orci quis, porta lobortis turpis. Suspendisse aliquet vulputate sapien, non fringilla erat ultrices at. Proin elementum orci ut ante aliquet sollicitudin.
                    </span>

                    <p className="title">Centro de Custos</p>

                    <hr />

                    <span>Codigo</span>

                    <span>Nome</span>


                    <hr />

                    <span>55435235345</span>

                </div>

            </div>


        </div>
    );
}