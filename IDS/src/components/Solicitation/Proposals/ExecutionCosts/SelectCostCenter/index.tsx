import { t } from "i18next"
import { useState } from "react";
import SelectCostExecution from "../SelectCostExecution"
import Services from "../../../../../services/costCenterService";


export default function SelectCostCenter() {

    const [costCenter, setCostCenter] = useState("");
    const [costsCenters, setCostsCenters]: any = useState([]);
    const [idCostCenter, setIdCostCenter]: any = useState([]);
    let expenseListStorage: any = JSON.parse(localStorage.getItem('expenseList') || '[]');


    function addCostCenter(costCenterAdd: any) {
        if (costCenterAdd === "" || costCenterAdd === " ") {
            alert("Digite um centro de custo");
        } else {
            createCostCenter();
            costsCenters.push(costCenterAdd);
            setCostsCenters(costsCenters);

            setCostCenter("");
        }
    }

    async function createCostCenter() {

        let costsCenterBd: any = await Services.findAll();

        let igual = 0;
        let id = 0;
        for (let i = 0; i < costsCenterBd.length; i++) {
            if (costsCenterBd[i].costCenter === costCenter) {
                igual++;
            }
        }

        if (igual === 0) {
            let service: any = await Services.save(costCenter);

            idCostCenter.push(service.costCenterCode);
        } else {
            for (let i = 0; i < costsCenterBd.length; i++) {
                if (costsCenterBd[i].costCenter === costCenter) {
                    id = costsCenterBd[i].costCenterCode;
                }
            }
            idCostCenter.push(id);
        }

    }

    
    return (
        <div className="input">
            <div className="display-flex-grid">
                {expenseListStorage.length !== 0 &&

                    <div>

                        <label>{t("payingCostCenter")} *</label>


                        <div className="display-flex">
                            <SelectCostExecution setCostCenter={setCostCenter} costCenter={costCenter} addCostCenter={addCostCenter} type="payingCostCenter" />

                            <button className="btn-primary btn-center-cost" onClick={() => { addCostCenter(costCenter) }}>
                                <span className="material-symbols-outlined">
                                    add
                                </span>
                            </button>
                        </div>



                        {costsCenters.map((costCenter: any) => {
                            return <div className="cost-center">
                                <span>{costCenter}</span>
                            </div>
                        })
                        }
                    </div>



                }
            </div>

        </div>
    )
}