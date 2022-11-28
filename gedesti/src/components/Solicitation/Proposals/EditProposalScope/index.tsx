import Header from "../../../Fixed/Header";
import Nav from "../../../Fixed/Nav";
import Title from "../../../Fixed/Search/Title";
import { Link } from "react-router-dom";
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
                        <Link to="/proposals">
                            <button className="btn-primary">Salvar alterações</button>
                        </Link>
                    </div>
                </div>

            </div>

        </div>
    );

}