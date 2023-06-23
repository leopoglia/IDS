import Title from "../../Fixed/Search/Title";
import ServicesWorker from "../../../services/workerService";
import ServicesDemand from "../../../services/demandService";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import "./style.css";
import Input from "../../Solicitation/Demands/CrateDemand/Others/Input";
import Profile from "../../Fixed/Profile";
import Card from "../../Solicitation/All/Cards/Card";

export default function Profiles() {

    const { t } = useTranslation();

    const [workerCode, setWorkerCode] = useState(parseInt(window.location.href.split("/")[4]));
    const [search, setSearch] = useState(""); // Retorno do campo de busca de demandas

    const [worker, setWorker] = useState({});
    const [demands, setDemands] = useState([]);
    const [typeDemand, setTypeDemand] = useState(0);

    const optionsDemands = ["Demandas criadas", "Demandas classificadas", "Demandas aprovadas", "Demandas complementadas", "Propostas criadas"];

    useEffect(() => {
        ServicesWorker.findById(workerCode).then((res) => {
            setWorker(res);
            handleDemands(0);
        });
    }, [])

    const handleDemands = (index) => {

        setTypeDemand(index);
        switch (index) {
            case 0:
                ServicesDemand.findByRequester(workerCode).then((res) => {
                    setDemands(res);
                });
                break;
            case 1:
                ServicesDemand.findByAnalyst(workerCode).then((res) => {
                    setDemands(res);
                });
                break;
            case 2:
                ServicesDemand.findByApprover(workerCode).then((res) => {
                    setDemands(res);
                });
                break;
            case 3:
                ServicesDemand.findByAnalyst(workerCode).then((res) => {
                    setDemands(res);
                });
                break;
        }
    }

    return (
        <div className="profile">

            <div className="container">
                <div className="background-title">
                    <Title nav={t("viewProfile")} title="viewProfile" />
                </div>


                <div className="box">

                    <Profile workerCode={worker.workerCode} image={worker.workerName?.slice(0, 1)} workerName={worker.workerName} />


                    <div className="boxNoPadding mt20">
                        <div className="header">

                            <div className="display-flex h65px">
                                {
                                    optionsDemands.map((option, index) => {
                                        return (
                                            <div className={typeDemand === index ? "profile-selected" : "profile-select"} onClick={() => handleDemands(index)}>
                                                <p>{option}</p>
                                            </div>
                                        )
                                    })
                                }
                            </div>

                            <div className="display-flex">
                                <Input background={"input-search"} setValue={setSearch} value={search} icon={"search"} type="text" placeholder={t("searchSoliciation")} required={true} />
                            </div>
                        </div>

                        {demands.map((val) => {

                            return (
                                <Card
                                    key={val.demandCode} demandCode={val.demandCode} listDirection={true} name={val.demandTitle}
                                    requester={val?.requesterRegistration?.workerName} date={val.demandDate} situation={val.demandStatus}
                                    proposalCode={val.proposalCode} demandVersion={val.demandVersion} type="demand"
                                />
                            )
                        })}

                        {demands.length === 0 &&
                            <div className="no-results">
                                <span className="material-symbols-outlined">draft</span>
                                <h1>{t("noResults")}</h1>
                            </div>
                        }

                    </div>

                </div>
            </div>

        </div>
    )
}