import { useState } from "react"
import { useTranslation } from "react-i18next"
import SelectStatus from "../SelectStatus"
import Input from "../../../../Solicitation/Demands/CrateDemand/Others/Input"


export default function CustomFilter(props: any) {

    const { t } = useTranslation();

    const [requester, setRequester] = useState('')
    const [manager, setManager] = useState('')
    const [forum, setForum] = useState('')
    const [departament, setDepartament] = useState('')
    const [size, setSize] = useState('')
    const [ppmCode, setPpmCode] = useState('')
    const [demandCode, setDemandCode] = useState('')
    const [status, setStatus] = useState('')

    return (
        <div className="background-modal custom-filter">
            <div className="modal">
                <div className='header-calendar display-flex-space-between mb3'>
                    <div className="display-flex-align-center">
                        <span className="material-symbols-outlined mr10">
                            tune
                        </span>

                        <span className="font-p">{t("filterCustom")}</span>
                    </div>

                    <span className='material-symbols-outlined' onClick={() => props.setCustomFilter(!props.customFilter)}>close</span>
                </div>

                <div className="filters-custom">
                    <Input type="text" label="requester" value={requester} setValue={setRequester} />

                    <Input type="text" label="manager" value={manager} setValue={setManager} />

                    <Input type="text" label="forum" value={forum} setValue={setForum} />

                    <Input type="text" label="departament" value={departament} setValue={setDepartament} />

                    <Input type="text" label="size" value={size} setValue={setSize} />

                    <Input type="text" label="ppmCode" value={ppmCode} setValue={setPpmCode} />

                    <Input type="text" label="demandCode"  value={demandCode} setValue={setDemandCode} />

                    <Input type="text" label="status" value={status} setValue={setStatus} />

                </div>

                <button className="btn-primary w100">
                    {t("filter")}
                </button>

            </div>
        </div>
    )
}