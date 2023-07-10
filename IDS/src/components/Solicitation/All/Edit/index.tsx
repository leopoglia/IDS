import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import Title from "../../../Fixed/Search/Title";
import ServicesDemand from "../../../../services/demandService";
import SelectCenterCost from "../../Demands/CrateDemand/Others/SelectCenterCost";
import ServicesRealBenefit from "../../../../services/realBenefitService";
import ServicesPotentialBenefit from "../../../../services/potentialBenefitService";
import ServicesQualitativeBenefit from "../../../../services/qualitativeBenefitService";
import ServicesProposal from "../../../../services/proposalService";
import Services from "../../../../services/costCenterService";
import SelectCoin from "../../Demands/CrateDemand/Others/SelectCoin";
import CheckBox from "../../Demands/CrateDemand/Others/CheckBox";
import Editor from "../../Proposals/EditProposalScope/Editor";
import GridCostExecution from "../../Proposals/ExecutionCosts/GridCostExecution";
import ExpensesService from "../../../../services/expensesService";

import "./style.css"
import Input from "../../Demands/CrateDemand/Others/Input";
import ProgressBar from "../../Demands/CrateDemand/Others/ProgressBar";
import notifyUtil from "../../../../utils/notifyUtil";


export default function Edit() {

	const { t } = useTranslation();
	const navigate = useNavigate();

	const [code, setCode] = useState(parseInt(useParams().id || "null")); // Código da proposta


	const [url, setUrl] = useState(window.location.href.split("/")[4]); // Url da página
	const [type, setType] = useState(window.location.href.split("/")[3]); // Tipo da página

	const [minuteEdit, setMinuteEdit]: any = useState(window.location.href.split("?")[2]); // Edição da minuta (true, false)
	const [editType, setEditType]: any = useState(window.location.href.split("?")[2]); // Tipo de edição (Tabelas, classificação, complementos, despesas)
	const [expenseType, setExpenseType]: any = useState(window.location.href.split("?")[1]); // Tipo de despesa (Custo, investimento, despesa)

	const [demandCode, setDemandCode]: any = useState(parseInt(useParams().id || "null")); // Código da demanda
	let [demandVersion, setDemandVersion] = useState(); // Versão da demanda
	const [demands, setDemands]: any = useState(); // Demanda

	const [demandTitle, setDemandTitle] = useState(""); // Titulo da demanda
	const [demandObjective, setDemandObjective] = useState(""); // Objetivo da demanda
	const [demandProblem, setDemandProblem] = useState(""); // Problema atual

	const [costsCentersId, setCostsCentersId]: any = useState([]); // Id dos centros de custo
	const [costsCenters, setCostsCenters]: any = useState([]); // Centros de custo
	const [costCenter, setCostCenter] = useState(""); // Centro de custo
	const [idCostCenter, setIdCostCenter]: any = useState([]); // Id do centro de custo

	const [fileAttachment, setFileAttachment]: any = useState([]); // Anexo

	const [potentialBenefitCode, setPotentialBenefitCode]: any = useState(""); // Código do beneficio potencial
	const [potentialCurrency, setPotentialCurrency]: any = useState(""); // Moeda potencial
	const [potentialBenefitDescription, setPotentialBenefitDescription]: any = useState(""); // Descrição do beneficio potencial
	const [potentialBenefitValue, setPotentialBenefitValue]: any = useState(""); // Valor do beneficio potencial
	const [legalObrigation, setLegalObrigation] = useState(false);


	const [realBenefitCode, setRealBenefitCode]: any = useState(""); // Código do beneficio real
	const [realCurrency, setrealCurrency]: any = useState(""); // Moeda real
	const [realBenefitDescription, setRealBenefitDescription]: any = useState(""); // Descrição do beneficio real
	const [realBenefitValue, setRealBenefitValue]: any = useState(""); // Valor do beneficio real

	const [qualitativeBenefitCode, setQualitativeBenefitCode]: any = useState(""); // Código do beneficio qualitativo
	const [qualitativeBenefitDescription, setQualitativeBenefitDescription]: any = useState(""); // Descrição do beneficio qualitativo
	const [interalControlsRequirements, setInteralControlsRequirements]: any = useState(""); // Requisitos de controles internos

	const [frequencyOfUse, setFrequencyOfUse]: any = useState(""); // Frequencia de uso

	const [demandStatus, setDemandStatus]: any = useState(""); // Status da demanda
	const [demandScore, setDemandScore]: any = useState(""); // Score da demanda
	const [demandClassification, setDemandClassification]: any = useState(""); // Classificação da demanda
	const [demandRequester, setDemandRequester]: any = useState(""); // Solicitante da demanda
	const [demandDate, setDemandDate]: any = useState(""); // Data da demanda
	const [approver, setApprover]: any = useState(""); // Quem aprovou a demanda

	function getDemand(demandCodeParam: number) {
		ServicesDemand.findById(demandCodeParam).then((response: any) => {
			const demand: any = response
			setDemands(demand)
			setDemandVersion(demand.demandVersion);
			setDemandTitle(demand.demandTitle);
			setDemandObjective(demand.demandObjective);
			setDemandProblem(demand.currentProblem);

			setPotentialCurrency(demand.potentialBenefit.potentialCurrency);
			setPotentialBenefitCode(demand.potentialBenefit.potentialBenefitCode);
			setPotentialBenefitValue(demand.potentialBenefit.potentialMonthlyValue);
			setPotentialBenefitDescription(demand.potentialBenefit.potentialBenefitDescription);
			setLegalObrigation(demand.potentialBenefit.legalObrigation);

			setrealCurrency(demand.realBenefit.realCurrency);
			setRealBenefitValue(response.realBenefit.realMonthlyValue);
			setRealBenefitDescription(demand.realBenefit.realBenefitDescription);
			setRealBenefitCode(demand.realBenefit.realBenefitCode);

			setQualitativeBenefitCode(demand.qualitativeBenefit.qualitativeBenefitCode);
			setQualitativeBenefitDescription(demand.qualitativeBenefit.qualitativeBenefitDescription);
			setInteralControlsRequirements(demand.qualitativeBenefit.interalControlsRequirements);

			setDemandStatus(demand.demandStatus);
			setDemandScore(demand.score);
			setDemandRequester(demand.requesterRegistration.workerCode);
			setDemandDate(demand.demandDate);
			setDemandClassification(demand?.classification?.classificationCode);
			setApprover(demand.approver);


			let costCenterArray = [];
			for (let i = 0; i < demand.costCenter.length; i++) {
				costCenterArray.push(demand.costCenter[i].costCenterCode);
			}

			setCostsCentersId(costCenterArray);
			setFrequencyOfUse(demand.qualitativeBenefit.frequencyOfUse);

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

	function getProposal() {
		ServicesProposal.findById(demandCode).then((response: any) => {
			setDemandCode(response.demand.demandCode);
			getDemand(response.demand.demandCode);
		})

	}


	useEffect(() => {

		if (window.location.href.split("?")[1] === undefined) {
			if (url === "demand" || type === "demand") {
				getDemand(demandCode);
			} else {
				getProposal();
			}
		} else {
			getProposal();

		}

	}, [editType])



	function addCostCenter(costCenterAdd: any) {
		if (costCenterAdd === "" || costCenterAdd === " ") {
			notifyUtil.error(t("Digite um centro de custo"));
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
				costsCentersId.splice(indexId, 1);
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
			let service: any = await Services.save(costCenterParameter)

			idCostCenter.push(service.costCenterCode);
			costsCentersId.push(service.costCenterCode);
		} else {
			for (let i = 0; i < costsCenterBd.length; i++) {
				if (costsCenterBd[i].costCenter === costCenterParameter) {
					id = costsCenterBd[i].costCenterCode;
					costsCenterBd[i].edit = true;
				}
			}
			idCostCenter.push(id);
			costsCentersId.push(id);
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


	async function editUnit() {

		if (editType === "costcenter") {
			ServicesDemand.updateCostCenter(demandCode, costsCentersId).then((response: any) => {

				navigate("/proposal/view/" + code);
			})
		} else if (expenseType === "recurrent" || expenseType === "internal" || expenseType === "expenses") {

			let costCentersCode: any = [];
			let expensesCostCenter: any = [];
			let expenseListStorage = JSON.parse(localStorage.getItem('expenseList') || '[]');


			if (localStorage.getItem("centerOfCustProposalexpenses") !== null) {
				costCentersCode = JSON.parse(localStorage.getItem("centerOfCustProposalexpenses") || '[]');
			} else if (localStorage.getItem("centerOfCustProposalrecurrent") !== null) {
				costCentersCode = JSON.parse(localStorage.getItem("centerOfCustProposalrecurrent") || '[]');
			} else if (localStorage.getItem("centerOfCustProposalinternal") !== null) {
				costCentersCode = JSON.parse(localStorage.getItem("centerOfCustProposalinternal") || '[]');
			} else {
				costCentersCode = costsCentersId;
			}

			for (let j = 0; j < costCentersCode.length; j++) {
				expensesCostCenter.push({ costCenter: { costCenterCode: costCentersCode[j].costCenterCode } });
			}

			ExpensesService.findByProposal(code).then((expenses: any) => {

				expenses.map((expense: any) => {

					if (expense.expensesType === expenseType) {

						if (expensesCostCenter.length > 0) {

							ExpensesService.update(expenseType, code, costCentersCode, expenseListStorage, expensesCostCenter, expense.expensesCode).then((expenseses: any) => {

								if (minuteEdit?.split("=")[0] === "minute") {
									navigate("/minutes/create/" + minuteEdit.split("=")[1]);
								} else {
									navigate("/proposal/view/" + code);
								}
								localStorage.removeItem('expenseList'); // Limpa a lista de despesas da edição						
								localStorage.removeItem("centerOfCustProposalexpenses");
								localStorage.removeItem('centerOfCustProposalrecurrent'); // Limpa a lista de centro de custo da edição
								localStorage.removeItem('centerOfCustProposalinternal'); // Limpa a lista de centro de custo da edição

							})
						}
					}
				})
			})
		}


	}

	async function editDemand() {


		// let file: File | null;
		// if (fileAttachment[0] !== null) {
		// 	file = new File([fileAttachment], fileAttachment[0].name, { type: fileAttachment[0].type });
		// } else {
		// 	file = null
		// }



		ServicesRealBenefit.save(realBenefitValue, realBenefitDescription, realCurrency).then((realBenefit: any) => {

			ServicesPotentialBenefit.save(potentialBenefitValue, potentialBenefitDescription, true, potentialCurrency).then((potentialBenefit: any) => {

				ServicesQualitativeBenefit.save(frequencyOfUse, qualitativeBenefitDescription, true).then((qualitativeBenefit: any) => {

					ServicesDemand.update(demandCode, demandTitle, demandProblem, demandObjective, costsCentersId, frequencyOfUse, realBenefit.realBenefitCode, potentialBenefit.potentialBenefitCode, qualitativeBenefit.qualitativeBenefitCode, fileAttachment, demandDate, demandStatus, demandScore, demandRequester, demandClassification, approver).then((response: any) => {

						if (url === "edit" && type === "demand") {
							ServicesDemand.updateStatus(demandCode, "Backlog").then((response: any) => {
							});
							ServicesDemand.findById(demandCode).then((response: any) => {
								demandVersion = response.demandVersion;
								localStorage.setItem("route", "edit");
								navigate("/demand/view/" + demandCode + "?" + demandVersion);
							});
						} else if (url === "demand") {
							navigate("/proposal/edit-scope/" + demandCode);
						} else if (url === "edit") {
							navigate("/proposal/view/" + demandCode);
						}

					});

				});

			});
		});



	}


	const [situationInfo, setInfoOpen] = useState(true);
	const [situationBenefitReal, setBenefitRealOpen] = useState(true);
	const [situationBenefitPotential, setBenefitPotentialOpen] = useState(true);
	const [situationBenefitQualitative, setBenefitQualitativeOpen] = useState(true);
	const [situationAdicional, setAdicionalOpen] = useState(true);

	return (
		<div className="create-demands-1 create-demands-2 execution-costs">

			{demands &&
				<div className="container">
					<div className="background-title">
						{url === "demand" ?
							(
								type === "proposal" ? (
									<>
										<Title nav="proposalEditProposal" title="createProposal" />
										<ProgressBar atual="1" proposal={true} />
									</>
								) : (
									<Title nav="demandEditDemand" title="editDemand" />
								)
							) : (
								<Title nav="proposalEditProposal" title="editProposal" />
							)
						}

					</div>


					{editType === undefined && expenseType !== "expenses" && expenseType !== "internal" && expenseType !== "recurrent" ? (
						<>

							<div className={"box box-" + situationInfo}>

								<div className="display-flex-space-between">
									<p>{t("generalInformations")}</p>

									<span onClick={() => { setInfoOpen(!situationInfo) }} className="material-symbols-outlined arrow-expend">
										expand_more
									</span>
								</div>


								<div>

									<Input label="titleProposal" type="text" value={demandTitle} setValue={setDemandTitle} required="true" />

									<div className="text-area">
										<label>{t("objective")} *</label>

										<Editor setContent={setDemandObjective} content={demandObjective} />
									</div>


									<div className="text-area">
										<label>{t("problemToBeSolved")} *</label>

										<Editor setContent={setDemandProblem} content={demandProblem} />

									</div>


									<div className="display-grid">
										<label>{t("costCenter")} *</label>

										<div className="display-flex">
											<SelectCenterCost setCostCenter={setCostCenter} costCenter={costCenter} addCostCenter={addCostCenter} />

											<div className="btn-primary w45" onClick={() => { addCostCenter(costCenter); handleChange(costCenter); }}>
												<span className="material-symbols-outlined">add</span>
											</div>
										</div>
									</div>


									{costsCenters.map((costCenter: any) => {
										return <div className="costCenter">
											<span>{costCenter}</span>
											<span className="material-symbols-outlined delete-cost-center" onClick={deleteCostCenter(costCenter)}>
												delete
											</span>
										</div>
									})
									}


								</div>


							</div>

							<div className={"box box-" + situationBenefitReal}>

								<div className="display-flex-space-between">

									<p>{t("benefitReal")}</p>

									<span onClick={() => { setBenefitRealOpen(!situationBenefitReal) }} className="material-symbols-outlined arrow-expend">
										expand_more
									</span>
								</div>

								<div className="flex">

									<Input label="monthlyValue" type="text" value={realBenefitValue} setValue={setRealBenefitValue} />

									<SelectCoin setrealCurrency={setrealCurrency} type="real" value={realCurrency} />
								</div>


								<Input label="description" type="text" value={realBenefitDescription} setValue={setRealBenefitDescription} />

							</div>

							<div className={"box box-" + situationBenefitPotential}>

								<div className="display-flex-space-between">

									<p>{t("benefitPotential")}</p>


									<span onClick={() => { setBenefitPotentialOpen(!situationBenefitPotential) }} className="material-symbols-outlined arrow-expend">
										expand_more
									</span>
								</div>



								<div>
									<div className="flex">

										<Input label="monthlyValue" type="number" value={potentialBenefitValue} setValue={setPotentialBenefitValue} required={true} />


										<SelectCoin setPotentialCurrency={setPotentialCurrency} type="potencial" value={potentialCurrency} />
									</div>

									<div className="flex">

										<Input label="description" type="text" value={potentialBenefitDescription} setValue={setPotentialBenefitDescription} required={true} />


										<div className="input-checkbox">
											<label>{t("legalObligation")}</label>
											<div className="display-flex-start mt10">

												<label className="checkbox">
													<input type="checkbox" id="legalObrigation" name="legalObrigation" checked={legalObrigation} onChange={(e) => { setLegalObrigation(e.target.checked) }} />
													<span className="checkmark"></span>
												</label>


												<label htmlFor="legalObrigation" className="pl10 mt3">{t("yes")}</label>
											</div>
										</div>
									</div>

								</div>

							</div>

							<div className={"box box-" + situationBenefitQualitative}>


								<div className="display-flex-space-between">

									<p>{t("benefitQualitative")}</p>

									<span onClick={() => { setBenefitQualitativeOpen(!situationBenefitQualitative) }} className="material-symbols-outlined arrow-expend">
										expand_more
									</span>
								</div>

								<label className="label">{t("description")} *</label>

								<Editor setContent={setQualitativeBenefitDescription} content={qualitativeBenefitDescription} />

								<div className="display-flex">
									<Input label="frequencyUse" type="text" value={frequencyOfUse} setValue={setFrequencyOfUse} required={true} />


									<div className="input-checkbox">
										<label className="requirements">{t("internalControlRequirements")}</label>
										<div className="display-flex-start mt10">
											<label className='checkbox'>
												<input type="checkbox" id="interalControlsRequirements" name="interalControlsRequirements" checked={interalControlsRequirements} onChange={(e) => { setInteralControlsRequirements(e.target.checked) }} />
												<span className="checkmark"></span>

											</label>
											<label htmlFor="interalControlsRequirements" className="pl10 mt3">{t("yes")}</label>


										</div>
									</div>
								</div>

							</div>

							<div className={"box box-" + situationAdicional}>

								<div className="display-flex-space-between">

									<p>{t("additionals")}</p>

									<span onClick={() => { setAdicionalOpen(!situationAdicional) }} className="material-symbols-outlined arrow-expend">
										expand_more
									</span>
								</div>

								<label className="mt10">{t("attachments")}</label>

								<div className="attachments display-flex">
									<input type="file" id="file" onChange={handleFileSelected} multiple />
									<label htmlFor="file">
										<span className="material-symbols-outlined">
											upload_file
										</span>{t("sendAttachment")}</label>



									{/* {
								(
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
								)
							} */}
								</div>

							</div>

							<div className="display-flex-end">
								{url === "edit" && type === "demand" ?
									(
										<button onClick={() => editDemand()} className="btn-primary">{t("editDemand")}</button>
									) : (
										<>
											{type === "proposal" && url !== "demand" ?
												(
													<button onClick={() => editDemand()} className="btn-primary">{t("editProposal")}</button>
												) : (
													<button onClick={() => editDemand()} className="btn-primary">{t("advance")}</button>
												)
											}
										</>
									)
								}


							</div>

						</>
					) : editType === "costcenter" ? (
						<>
							<div className="box">
								<div className="display-grid">
									<label>{t("costCenter")} *</label>

									<div className="display-flex">
										<SelectCenterCost setCostCenter={setCostCenter} costCenter={costCenter} addCostCenter={addCostCenter} />

										<div className="btn-primary w45" onClick={() => { addCostCenter(costCenter); handleChange(costCenter); }}>
											<span className="material-symbols-outlined">add</span>
										</div>
									</div>
								</div>


								{costsCenters.map((costCenter: any) => {
									return <div className="costCenter">
										<span>{costCenter}</span>
										<span className="material-symbols-outlined delete-cost-center" onClick={deleteCostCenter(costCenter)}>
											delete
										</span>
									</div>
								})
								}
							</div>

							<div className="display-flex-end">
								<button onClick={() => editUnit()} className="btn-primary">{t("edit")}</button>
							</div>
						</>

					) : expenseType === "internal" || expenseType === "recurrent" || expenseType === "expenses" ? (
						<>
							<div className="box">

								<div className="display-flex-space-between">
									{(expenseType === "internal" || expenseType === "recurrent" || expenseType === "expenses") ? (
										<Link to={"/proposal/execution-costs/add-expense/" + code + "?" + expenseType}>
											<button className="btn-secondary">{t("addExpense")}</button>
										</Link>
									) :
										(
											<Link to={"/proposal/execution-costs/add-expense/" + demandCode + "?" + expenseType}>
												<button className="btn-secondary">{t("addExpense")}</button>
											</Link>
										)
									}


								</div>

								<GridCostExecution title={expenseType} realCurrency={demands.realBenefit.realCurrency} />

							</div>

							<div className="display-flex-end">
								<button onClick={() => editUnit()} className="btn-primary">{t("edit")}</button>
							</div>
						</>
					) : null

					}



				</div>
			}

		</div >
	);
}