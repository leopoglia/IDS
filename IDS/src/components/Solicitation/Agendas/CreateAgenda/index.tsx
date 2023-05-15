import Title from "../../../Fixed/Search/Title";
import "./style.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ServicesProposals from "../../../../services/proposalService";
import Services from "../../../../services/agendaService";
import SelectWorker from "../SelectWorker";
import Servicescommission from "../../../../services/commissionService";

export default function CreateAgenda() {

    const { t } = useTranslation();
    const navigate = useNavigate();
    let data = new Date();

    const [proposals, setProposals]: any = useState([]);
    const [commissionList, setcommissionList]: any = useState([]);
    const [commission, setCommission] = useState("");
    const [date, setDate] = useState(`${data.getFullYear()}-${("0" + (data.getMonth() + 1)).slice(-2)}-${("0" + data.getDate()).slice(-2)}T${("0" + data.getHours()).slice(-2)}:${("0" + data.getMinutes()).slice(-2)}`);

    let actualDate = new Date().getUTCDate() + "/" + (new Date().getUTCMonth() + 1) + "/" + new Date().getUTCFullYear();

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

    const saveAgenda = () => {

        Servicescommission.findAll().then((response: any) => {
            let commissionArray: any = [];

            response.map((commission: any) => {
                commissionList.map((commissionSelected: any) => {
                    if (commission.commissionName === commissionSelected) {
                        commissionArray.push(commission.commissionCode);
                    }
                })
            })



            for (let i = 0; i < proposals.length; i++) {
                ServicesProposals.updatePublish(proposals[i].proposalCode, proposals[i].publishedMinute);
            }


            Services.save("1", date, commissionArray, actualDate, proposals).then((response: any) => {
                navigate("/agenda/view/" + response.agendaCode);

                localStorage.removeItem("proposals");
            })
        })


    }

    function addWorker(worker: any) {
        if (worker === "") {
            alert("Digite um Worker");
        } else {
            commissionList.push(worker);
            setcommissionList(commissionList);
            setCommission("");
        }
    }

    function deleteWorker(woker: any) {
        return () => {
            const index = commissionList.indexOf(woker);
            if (index > -1) {
                commissionList.splice(index, 1);
            }
            setcommissionList(commissionList);

            if (commission === " ") {
                setCommission("");
            } else {
                setCommission(" ");
            }
        }
    }


    return (
        <div className="create-agenda">

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
                                            <input onChange={(e) => {
                                                proposal.publishedMinute = e.target.checked;
                                            }} type="checkbox" />

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

                    <div className="input">
                        <label>{t("dateAgenda")} *</label>
                        <input type="datetime-local" onChange={(e) => {setDate(e.target.value); console.log("value ===>", e.target.value) }}  value={date} />
                    </div>

                    <div className="input">

                        <div className="commission-flex">
                            <div className="w100">
                                <span>{t("comission")}</span>
                                <SelectWorker setCommission={setCommission} worker={commission} />
                            </div>

                            <div className="btn-primary w45" onClick={() => { addWorker(commission) }}>
                                <span className="material-symbols-outlined">add</span>
                            </div>
                        </div>
                    </div>

                    {commissionList.map((worker: any) => {
                        return <div className="costCenter">
                            <span>{worker}</span>
                            <span className="material-symbols-outlined delete-cost-center" onClick={deleteWorker(worker)} >
                                delete
                            </span>
                        </div>
                    })
                    }


                </div>


                <div className="display-flex-end">
                    <button onClick={saveAgenda} className="btn-primary">{t("save")}</button>
                </div>

            </div>
        </div>

    )
}