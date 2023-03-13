import { t } from "i18next";
import { Link } from "react-router-dom";
import Header from "../../../Fixed/Header";
import Nav from "../../../Fixed/Nav";
import Title from "../../../Fixed/Search/Title";
import ServicesDemand from "../../../../services/demandService";
import "./style.css"
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import SelectCenterCost from "../CrateDemand/Step1/SelectCenterCost";
import Services from "../../../../services/costCenterService";
import SelectCoin from "../CrateDemand/SelectCoin";

export default function EscopeDemand() {

    const { t } = useTranslation();

    const demandCode = parseInt(window.location.href.split("/")[5]); // Código da demanda
    const [costsCenters, setCostsCenters]: any = useState([]); // Centros de custo
    const [costCenter, setCostCenter] = useState(""); // Centro de custo
    const [idCostCenter, setIdCostCenter]: any = useState([]); // Id do centro de custo
    const [fileAttachment, setFileAttachment]: any = useState([]); // Anexo
    const [executionPeriod, setExecutionPeriod]: any = useState(""); // Periodo de execução
    const [potentialCurrency, setPotentialCurrency]: any = useState(""); // Moeda potencial
    const [realCurrency, setrealCurrency]: any = useState(""); // Moeda real
    const [demands, setDemands]: any = useState();

    const [demandTitle, setDemandTitle] = useState("");
    const [demandObjective, setDemandObjective] = useState("");
    const [demandProblem, setDemandProblem] = useState("");


    function getDemand() {
        ServicesDemand.findById(demandCode).then((response: any) => {
            const demand: any = response
            setDemands(demand)

            console.log(response);
            setDemandTitle(demand.demandTitle);
            setDemandObjective(demand.demandObjective);
            setDemandProblem(demand.currentProblem);
            setPotentialCurrency(demand.potentialBenefit.potentialCurrency);
            setrealCurrency(demand.realBenefit.realCurrency);


            let fileAttachmentArray = fileAttachment;
            fileAttachmentArray.push(demand.demandAttachment);
            setFileAttachment(fileAttachmentArray);

            for (let i = 0; i < demand.costCenter.length; i++) {
                let costCenterArray = costsCenters;
                costCenterArray.push(demand.costCenter[i].costCenter);
                setCostsCenters(costCenterArray);
                createCostCenter(demand.costCenter[i].costCenter);
            }
        })
    }



    useEffect(() => {
        getDemand();
    }, [])



    function addCostCenter(costCenterAdd: any) {
        if (costCenterAdd === "" || costCenterAdd === " ") {
            alert("Digite um centro de custo");
        } else {
            createCostCenter(costCenterAdd);
            let costCentersArray = costsCenters;
            costCentersArray.push(costCenterAdd);
            setCostsCenters(costCentersArray);
            setCostCenter("");
        }
    }

    function deleteCostCenter(costCentere: any) {
        return () => {
            const index = costsCenters.indexOf(costCentere);
            const indexId = idCostCenter.indexOf(costCentere);
            if (index > -1) {
                costsCenters.splice(index, 1);
                idCostCenter.splice(indexId, 1);
            }
            setCostsCenters(costsCenters);

            if (costCenter === " ") {
                setCostCenter("");
            } else {
                setCostCenter(" ");
            }
        }
    }

    async function createCostCenter(costCenterParameter: any) {
        let costsCenterBd: any = await Services.findAll();

        let igual = 0;
        let id = 0;
        for (let i = 0; i < costsCenterBd.length; i++) {
            if (costsCenterBd[i].costCenter === costCenterParameter) {
                igual++;
            }
        }

        if (igual === 0) {
            let service: any = await Services.save(costCenterParameter);

            idCostCenter.push(service.costCenterCode);
        } else {
            for (let i = 0; i < costsCenterBd.length; i++) {
                if (costsCenterBd[i].costCenter === costCenterParameter) {
                    id = costsCenterBd[i].costCenterCode;
                }
            }
            idCostCenter.push(id);
        }

        if (costCenter === " ") {
            setCostCenter("");
        } else {
            setCostCenter(" ");
        }

    }

    const handleChange = (event: any) => {
        localStorage.setItem("costCenter", JSON.stringify(costCenter));
    }

    // Função para pegar o arquivo selecionado
    const handleFileSelected = (e: any): void => {
        const files = Array.from(e.target.files)
        let filesArray: any = [];
        for (let i = 0; i < files.length; i++) {
            filesArray.push(files[i]);
        }

        setFileAttachment(filesArray);
    }

    const attatchmentType = (demand: any) => {
        if (demand.type === "image/png" || demand.type === "image/jpeg") {
            return "png";
        } else if (demand.type === "application/pdf") {
            return "pdf";
        } else if (demand.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
            return "word";
        } else if (demand.type === "application/msword" || demand.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
            demand.demandAttachment.type === "application/vnd.ms-excel") {
            return "excel";
        } else if (demand.type === "application/zip") {
            return "zip";
        } else if (demand.type === "application/x-rar-compressed") {
            return "rar";
        }
    }

    return (
        <div className="create-demands-1">
            <Header />
            <Nav />
            {demands &&
                <div className="container">
                    <div className="background-title">
                        <Title nav="demandEditDemand" title="editDemand" />

                    </div>

                    <div className="box">
                        <p>{t("generalInformations")}</p>


                        <div>
                            <div className="input">
                                <label>{t("titleProposal")} *</label>
                                <input type="text" value={demandTitle} onChange={(e) => { setDemandTitle(e.target.value) }} />
                            </div>

                            <div className="text-area">
                                <label>{t("problemToBeSolved")} *</label>
                                <textarea value={demandProblem} onChange={(e) => { setDemandProblem(e.target.value) }} />
                            </div>

                            <div className="text-area">
                                <label>{t("proposal")} *</label>
                                <textarea value={demandObjective} onChange={(e) => { setDemandObjective(e.target.value) }} />
                            </div>

                            <div className="input">
                                <label>{t("costCenter")} *</label>

                                <div className="display-flex">
                                    <SelectCenterCost setCostCenter={setCostCenter} costCenter={costCenter} addCostCenter={addCostCenter} />

                                    <div className="btn-primary w45" onClick={() => { addCostCenter(costCenter); handleChange(costCenter); }}>
                                        <span className="material-symbols-outlined">add</span>
                                    </div>
                                </div>
                            </div>


                            {costsCenters.map((costCenter: any) => {
                                return <div className="costCenter">{costCenter}
                                    <span className="material-symbols-outlined delete-cost-center" onClick={deleteCostCenter(costCenter)}>
                                        delete
                                    </span>
                                </div>
                            })
                            }


                        </div>


                    </div>

                    <div className="box">

                        <p>{t("benefitReal")}</p>

                        <div className="flex">

                            <div className="input">
                                <label>{t("monthlyValue")} *</label>
                                <input type="text" value={demands.realBenefit.realMonthlyValue} />

                            </div>

                            <SelectCoin setrealCurrency={setrealCurrency} type="real" value={realCurrency} />
                        </div>


                        <div className="input">
                            <label>{t("description")} *</label>
                            <input type="text" value={demands.realBenefit.realBenefitDescription} />
                        </div>



                    </div>

                    <div className="box">
                        <p>{t("benefitPotential")}</p>


                        <div>
                            <div className="flex">
                                <div className="input">
                                    <label>{t("monthlyValue")} *</label>
                                    <input type="text" value={demands.potentialBenefit.potentialMonthlyValue} />
                                </div>

                                <SelectCoin setPotentialCurrency={setPotentialCurrency} type="potencial" value={potentialCurrency} />
                            </div>

                            <div className="input">
                                <label>{t("description")} *</label>
                                <input type="text" value={demands.potentialBenefit.potentialBenefitDescription} />
                            </div>

                        </div>

                    </div>

                    <div className="box">
                        <p>{t("benefitQualitative")}</p>


                        <div>

                            <div className="input">
                                <label>{t("monthlyValue")} *</label>
                                <input type="text" value={demands.qualitativeBenefit.frequencyOfUse} />
                            </div>

                            <div className="input">
                                <label>{t("description")} *</label>
                                <input type="text" value={demands.qualitativeBenefit.qualitativeBenefitDescription} />
                            </div>

                        </div>

                        {/* <div className="flex">
                        <Input label="monthlyValue" required="*" />
                        <SelectCoin />
                    </div>

                    <div className="flex">
                        <Input label="description" required=""></Input>

                        <div className="input-checkbox requirements">
                            <label>{t("internalControlRequirements")}</label>
                            <div className="checkbox">
                                <CheckBox />
                            </div>
                        </div>
                    </div> */}

                    </div>

                    <div className="box">

                        <p>{t("additionals")}</p>

                        <div className="frequency">
                            <label>{t("frequencyUse")} * </label>
                            <input type="text" value={demands.qualitativeBenefit.frequencyOfUse} onChange={(e) => { setExecutionPeriod(e.target.value) }} />
                        </div>

                        <label>{t("attachments")}</label>

                        <div className="attachments display-flex">
                            <input type="file" id="file" onChange={handleFileSelected} multiple />
                            <label htmlFor="file">
                                <span className="material-symbols-outlined">
                                    upload_file
                                </span>{t("sendAttachment")}</label>


                            {
                                fileAttachment.map((file: any) => {
                                    return (
                                        <div className="attachments">

                                            <div className="attachment">
                                                <div className="attachment-image">
                                                    <img src={"/attachment/" + attatchmentType(file) + ".png"} alt="" />
                                                </div>
                                                <span>{file.name}</span>
                                            </div>


                                        </div>
                                    )
                                })
                            }
                        </div>

                    </div>

                    <div className="display-flex-end">
                        <Link to={"/proposal/edit-scope/"}>
                            <button className="btn-primary">{t("advance")}</button>
                        </Link>
                    </div>

                </div>
            }

        </div >
    );
}