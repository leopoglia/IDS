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

export default function CreateAgenda() {

    const { t } = useTranslation();
    const navigate = useNavigate();
    const edit = window.location.href.split("?")[1];
    let data = new Date();

    const [proposals, setProposals]: any = useState([]);
    const [commission, setCommission] = useState("");
    const [dateInitial, setDateInitial] = useState(`${data.getFullYear()}-${("0" + (data.getMonth() + 1)).slice(-2)}-${("0" + data.getDate()).slice(-2)}T${("0" + data.getHours()).slice(-2)}:${("0" + data.getMinutes()).slice(-2)}`);
    const [dateFinal, setDateFinal] = useState(`${data.getFullYear()}-${("0" + (data.getMonth() + 1)).slice(-2)}-${("0" + data.getDate()).slice(-2)}T${("0" + data.getHours()).slice(-2)}:${("0" + data.getMinutes()).slice(-2)}`);
    const [sequentialNumber, setSequentialNumber] = useState(0);

    const worker: any = useContext(UserContext).worker;

    let actualDate = new Date().getUTCDate() + "/" + (new Date().getUTCMonth() + 1) + "/" + new Date().getUTCFullYear();

    useEffect(() => {
        getProposal();

        console.log(edit)


        if (edit !== undefined) {
            Services.findById(parseInt(edit)).then((agendas: any) => {
                let agenda = agendas[0];

                setCommission(agenda.commission.commissionName);
                setDateInitial(agenda.initialDate);
                setDateFinal(agenda.finalDate);
                setSequentialNumber(agenda.sequentialNumber);

                let proposals: any = [];

                agenda.proposals.map((val: any) => {
                    proposals.push(val.proposalCode);
                }
                )

                localStorage.setItem("proposals", JSON.stringify(proposals));
                getProposal();
            })
        }
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
            let commissionCode: any = 0;

            response.map((val: any) => {
                if (val.commissionName === commission) {
                    commissionCode = val.commissionCode;
                }
            })

            for (let i = 0; i < proposals.length; i++) {
                ServicesProposals.updatePublish(proposals[i].proposalCode, proposals[i].publishedMinute);
            }

            if (dateInitial !== dateFinal && proposals.length !== 0 && commissionCode !== 0) {
                Services.save(sequentialNumber, dateInitial, dateFinal, commissionCode, actualDate, proposals, worker.id).then((response: any) => {
                    navigate("/agenda/view/" + response.agendaCode);

                    localStorage.removeItem("proposals");
                })
            } else {
                notifyUtil.error(t("fillAllFields"));
            }
        })
    }


    const editAgenda = () => {

        Servicescommission.findAll().then((response: any) => {
            let commissionCode: any = 0;

            response.map((val: any) => {
                if (val.commissionName === commission) {
                    commissionCode = val.commissionCode;
                }
            })

            console.log(parseInt(edit))

            if (dateInitial !== dateFinal && proposals.length !== 0 && commissionCode !== 0) {
                Services.update(sequentialNumber, dateInitial, dateFinal, commissionCode, actualDate, proposals, worker.id, parseInt(edit)).then((response: any) => {
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
                                            <label className="checkbox">
                                                <input onChange={(e) => {
                                                    proposal.publishedMinute = e.target.checked;
                                                }} type="checkbox" />
                                                <span className="checkmark"></span>
                                            </label>

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
                            <Link to={edit === undefined ? "/agenda/select-proposals" : "/agenda/select-proposals?" + edit}>
                                <button className="btn-secondary">{t("addProposal")}</button>
                            </Link>
                        </div>


                    </div>

                    <Input label="sequentialNumber" type="number" setValue={setSequentialNumber} value={sequentialNumber} />

                    <div className="mt10">
                        <Input label="dateStart" type="datetime-local" setValue={setDateInitial} value={dateInitial} />
                    </div>

                    <div className="mt10">
                        <Input label="dateEnd" type="datetime-local" setValue={setDateFinal} value={dateFinal} />
                    </div>

                    <div className="mt10">
                        <span>{t("comission")}</span>
                        <SelectWorker setCommission={setCommission} commission={commission} worker={commission} />
                    </div>


                </div>

                {edit === undefined ?
                    <div className="display-flex-end">
                        <button onClick={saveAgenda} className="btn-primary">{t("save")}</button>
                    </div>
                    :
                    <div className="display-flex-end">
                        <button onClick={editAgenda} className="btn-primary">{t("edit")}</button>
                    </div>
                }

            </div>

        </div >

    )
}