import Header from "../../../Fixed/Header";
import Nav from "../../../Fixed/Nav";
import Title from "../../../Fixed/Search/Title";


export default function CommissionOpinion() {
    return (
        <div className="commission-opinion">

            <Header title="Commission Opinion" icon="edit" />

            <Nav />

            <div className="container">

                <div className="background-title">

                    <Title title="Commission Opinion" nav="Proposals > Commission Opinion" />


                </div>

                <div className="box">
                </div>
            </div>
        </div>
    );
}