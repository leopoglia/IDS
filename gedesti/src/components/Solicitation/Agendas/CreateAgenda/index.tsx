import Header from "../../../Fixed/Header";
import Nav from "../../../Fixed/Nav";
import Title from "../../../Fixed/Search/Title";
import "./style.css";
import { Link } from "react-router-dom";
import Input from "../../Demands/CrateDemand/Input";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import ServicesProposals from "../../../../services/proposalService";

export default function CreateAgenda() {

    const { t } = useTranslation();

    const [proposals, setProposals] = useState([]);

    useEffect(() => {
        getProposal();
    }, [])

    function getProposal() {
        let proposals = JSON.parse(localStorage.getItem("proposals") || "[]");

        let proposalsSelected: any = [];

        ServicesProposals.findAll().then((response: any) => {
            response.map((proposal: any) => {
                proposals.map((proposalSelected: any) => {
                    if (proposal.proposalCode === proposalSelected) {
                        proposalsSelected.push(proposal);
                    }
                })
            })
            setProposals(proposalsSelected);
        })

    }

    const deleteProposal = (id: any) => {
        let proposals = JSON.parse(localStorage.getItem("proposals") || "[]");
        let index = proposals.indexOf(id);
        proposals.splice(index, 1);
        localStorage.setItem("proposals", JSON.stringify(proposals));
        getProposal();
    }

    return (
        <div className="create-agenda">
            <Header icon="file_copy" title="createAgenda" />
            <Nav />
            <div className="container">
                <div className="background-title">
                    <Title title={t("createAgenda")} nav={t("agendaCreateAgenda")} />
                </div>

                <div className="box">

                    <div className="display-flex">
                        <p>{t("proposals")}</p>

                    </div>


                    <div className="proposals-agenda">

                        {proposals.length !== 0 &&

                            proposals.map((proposal: any) => {
                                return (
                                    <div className="proposal">
                                        <div className="proposal-agenda">
                                            <span>{proposal.proposalName}</span>


                                            <div onClick={() => deleteProposal(proposal.proposalCode)} className="delete-proposal-agenda">
                                                <span className="material-symbols-outlined">
                                                    delete
                                                </span>


                                            </div>
                                        </div>


                                        <div className="check-box">

                                            <input type="checkbox" />

                                            <label>{t("publiquedMinute")}</label>

                                        </div>
                                    </div>
                                )
                            }
                            )

                        }
                        {proposals.length === 0 &&

                            <div className="proposal">
                                <div className="proposal-agenda">
                                    <span>{t("noProposal")}</span>
                                </div>
                            </div>
                        }


                        <div className="display-flex addProposal">
                            <Link to="/agenda/select-proposals">
                                <button className="btn-secondary">{t("addProposal")}</button>
                            </Link>
                        </div>


                    </div>


                    <div className="display-flex">
                        <Input label={t("agendaName")} required="*" />
                        <Input label={t("number")} required="*" />
                        <Input label={t("year")} required="*" />
                    </div>


                </div>


                <div className="display-flex-end">
                    <Link to="/agendas">
                        <button className="btn-primary">{t("save")}</button>
                    </Link>
                </div>

            </div>
        </div>

    )
}