import Header from "../../../Fixed/Header";
import Nav from "../../../Fixed/Nav";
import Title from "../../../Fixed/Search/Title";
import Editor from "../../Proposals/EditProposalScope/Editor";

export default function CreateMinute() {
    return (
        <div className="create-minute">
            <Header icon="file_copy" title="createMinute" />
            <Nav />
            <div className="container">
                <div className="background-title">
                    <Title title="Criar Ata" nav="Atas > Criar Ata" />
                </div>

                <Editor />

                <div className="display-flex-end">
                    <button className="btn-primary">Salvar</button>
                </div>

            </div>
        </div>
    );
}