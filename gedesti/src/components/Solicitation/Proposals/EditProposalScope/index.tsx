import Header from "../../../Fixed/Header";
import Nav from "../../../Fixed/Nav";
import Title from "../../../Fixed/Search/Title";
import TextArea from "../../Demands/CrateDemand/TextArea";
import "./style.css"

export default function EditProposalScope() {
    return (
        <div className="edit-proposal-scope">
            <Header title="Edit Proposal Scope" icon="edit" />
            <Nav />

            <div className="container">

                <div className="background-title">

                    <Title title="Edit Proposal Scope" nav="Proposals > Edit Proposal Scope" />

                </div>

                <div className="box">


                    <p>Edit Proposal Scope</p>

                    <textarea className="textarea" />


                    <div className="display-flex-end">
                        <button className="btn-primary">Salvar alterações</button>
                    </div>
                </div>

            </div>

        </div>
    );

}