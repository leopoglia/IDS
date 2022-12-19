import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useTranslation } from "react-i18next";

export default function SelectLabels(props: any) {
    const [age, setAge] = React.useState('');

    const { t } = useTranslation();

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value);
    };

    return (
        <div>

            <FormControl sx={{ minWidth: "100%", height: "60px" }}>
                <Select
                    value={age}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}

                    sx={{ height: '45px' }}
                >

                    {props.type === "typeOfExpense" ? <MenuItem value={10}>{t("internal")}</MenuItem>
                        : null}

                    {props.type === "typeOfExpense" ? <MenuItem value={20}>{t("external")}</MenuItem>
                        : null}

                    {props.type === "expenseProfile" ? <MenuItem value={10}>{t("development")}</MenuItem>
                        : null}

                    {props.type === "expenseProfile" ? <MenuItem value={20}>{t("infraestructure")}</MenuItem>
                        : null}

                </Select>
            </FormControl>
        </div>
    );
}