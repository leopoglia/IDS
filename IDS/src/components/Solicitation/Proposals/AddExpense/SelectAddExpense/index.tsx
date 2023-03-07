import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useTranslation } from "react-i18next";

export default function SelectLabels(props: any) {
    const [select, setSelect] = React.useState('');

    const { t } = useTranslation();

    const handleChange = (event: SelectChangeEvent) => {
        if (props.type === "typeOfExpense") {
            props.setTypeOfExpense(event.target.value);
            setSelect(event.target.value)
        }else{
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

                    {props.type === "typeOfExpense" ? <MenuItem value={"internal"}>{t("internal")}</MenuItem>
                        : null}

                    {props.type === "typeOfExpense" ? <MenuItem value={"external"}>{t("external")}</MenuItem>
                        : null}

                    {props.type === "expenseProfile" ? <MenuItem value={"development"}>{t("development")}</MenuItem>
                        : null}

                    {props.type === "expenseProfile" ? <MenuItem value={"infraestructure"}>{t("infraestructure")}</MenuItem>
                        : null}

                </Select>
            </FormControl>
        </div>
    );
}