import { useEffect, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Services from '../../../../../services/costCenterService';
import { useTranslation } from "react-i18next";

export default function SelectLabels(props: any) {
    const [select, setSelect] = useState('');
    const [costCenter, setCostCenter] = useState<any>([]);

    const { t } = useTranslation();

    useEffect(() => {
        Services.findAll().then((response: any) => {
            setCostCenter(response);

        });
    }, []);


    const handleChange = (event: SelectChangeEvent) => {

        if (props.type === "expenseType") {
            props.setExpenseType(event.target.value);
            setSelect(event.target.value)
        } else if (props.type === "expenseProfile") {
            props.setExpenseProfile(event.target.value)
            setSelect(event.target.value)
        }
    };

    return (
        <div>

            <FormControl sx={{ minWidth: "100%", height: "60px" }}>
                <Select
                    value={select}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}

                    sx={{ height: '45px' }}
                >

                    {props.type === "expenseType" ? <MenuItem value={"internal"}>{t("internal")}</MenuItem>
                        : null}

                    {props.type === "expenseType" ? <MenuItem value={"recurrent"}>{t("recurrent")}</MenuItem>
                        : null}

                    {props.type === "expenseType" ? <MenuItem value={"expenses"}>{t("expenses")}</MenuItem>
                        : null}

                    {props.type === "expenseProfile" ? <MenuItem value={"development"}>{t("development")}</MenuItem>
                        : null}

                    {props.type === "expenseProfile" ? <MenuItem value={"infraestructure"}>{t("infraestructure")}</MenuItem>
                        : null}

                    {props.type === "costCenter" ?
                        costCenter.map((costCenter: any) => {
                            return <MenuItem value={costCenter.costCenterCode}>{costCenter.costCenter}</MenuItem>
                        }) : null}

                </Select>
            </FormControl>
        </div>
    );
}