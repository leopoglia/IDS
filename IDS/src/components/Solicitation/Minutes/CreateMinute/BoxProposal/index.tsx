import Editor from "../../../Proposals/EditProposalScope/Editor"
import { useNavigate, useParams } from "react-router";
import { useState } from "react";
import { t } from "i18next";


export default function BoxProposal(props: any) {

    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const code = useParams().id;


    
    const click = () => {
        navigate("/proposal/edit/" + code);
    }

    
    const handleChange = (value: React.SetStateAction<string>, type: string) => {
    }


    return (
        <div className={"box " + open} >

            <div className="display-flex-space-between header-table">

                <p className="title">{t(props.demandProposal)}</p>

                <div className="display-flex">
                    <span onClick={() => { click() }} className="material-symbols-outlined arrow-expend mr5">
                        edit
                    </span>

                    <span onClick={() => setOpen(!open)} className="material-symbols-outlined arrow-expend">
                        expand_more
                    </span>
                </div>
            </div>

            <div className="input">
                <p className="title">{t("titleProposal")}</p>
                <input type="text" value={props.proposal.proposalName} />
            </div>


            <div className="text-area">
                <p className="title">{t("objective")}</p>
                <Editor handleChange={handleChange} type={"objective"} content={props.proposal.demand.demandObjective} />
            </div>

            <div className="text-area">
                <p className="title">{t("proposalScope")}</p>
                <Editor handleChange={handleChange} type={"scope"} content={props.proposal.descriptiveProposal} />
            </div>


            <div className="text-area">
                <p className="title">{t("benefitQualitative")}</p>
                <Editor handleChange={handleChange} type={"objective"} content={props.proposal.demand.qualitativeBenefit.qualitativeBenefitDescription} />
            </div>

            <div className="text-area">
                <p className="title">{t("benefitPotential")}</p>
                <Editor handleChange={handleChange} type={"objective"} content={props.proposal.demand.potentialBenefit.potentialBenefitDescription} />
            </div>


        </div>
    )
}