import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Title from "../../../Fixed/Search/Title";
import ServicesProposals from "../../../../services/proposalService";
import Services from "../../../../services/agendaService";
import SelectWorker from "../SelectWorker";
import Servicescommission from "../../../../services/commissionService";
import "./style.css";
import Input from "../../Demands/CrateDemand/Others/Input";
import UserContext from "../../../../context/userContext";
import notifyUtil from "../../../../utils/notifyUtil";
import { ToastContainer } from "react-toastify";

export default function CreateAgenda() {

    const { t } = useTranslation();
    const navigate = useNavigate();
    let data = new Date();

    const [proposals, setProposals]: any = useState([]);
    const [commissionList, setcommissionList]: any = useState([]);
    const [commission, setCommission] = useState("");
    const [dateInitial, setDateInitial] = useState(`${data.getFullYear()}-${("0" + (data.getMonth() + 1)).slice(-2)}-${("0" + data.getDate()).slice(-2)}T${("0" + data.getHours()).slice(-2)}:${("0" + data.getMinutes()).slice(-2)}`);
    const [dateFinal, setDateFinal] = useState(`${data.getFullYear()}-${("0" + (data.getMonth() + 1)).slice(-2)}-${("0" + data.getDate()).slice(-2)}T${("0" + data.getHours()).slice(-2)}:${("0" + data.getMinutes()).slice(-2)}`);


    const worker: any = useContext(UserContext).worker;
    
    useEffect(() => {
        console.log(commission)
    }, [commission])


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

            if (dateInitial !== dateFinal && proposals.length !== 0 && commissionArray.length !== 0) {
                Services.save("1", dateInitial, dateFinal, commissionArray, actualDate, proposals, worker.id).then((response: any) => {
                    navigate("/agenda/view/" + response.agendaCode);

                    localStorage.removeItem("proposals");
                })
            } else {
                notifyUtil.error(t("fillAllFields"));
            }
        })
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

                    <Input label="dateStart" type="datetime-local" setValue={setDateInitial} value={dateInitial} />

                    <div className="mt10">
                        <Input label="dateEnd" type="datetime-local" setValue={setDateFinal} value={dateFinal} />
                    </div>

                    <div className="mt10">
                        <span>{t("comission")}</span>
                        <SelectWorker setCommission={setCommission} worker={commission} />
                    </div>


                </div>


                <div className="display-flex-end">
                    <button onClick={saveAgenda} className="btn-primary">{t("save")}</button>
                </div>

            </div>

            <ToastContainer />
        </div>

    )
}