import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function SelectLabels(props: any) {
    // const [age, setAge] = React.useState('');

    const [select, setSelect] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        if (props.type === "payingCostCenter") {
            props.setPayingCostCenter(event.target.value);
            setSelect(event.target.value)
        }
    };

    return (
        <div>

            <FormControl sx={{ width: "100%" }}>
                <Select
                    value={select}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}

                    sx={{ minWidth: '100%', height: '45px' }}
                >
                    {props.type === "payingCostCenter" ? <MenuItem value={"Centro Custo 1"}>Centro Custo 1</MenuItem>
                        : null}
                    {props.type === "payingCostCenter" ? <MenuItem value={"Centro Custo 2"}>Centro Custo 2</MenuItem>
                        : null}
                    {props.type === "payingCostCenter" ? <MenuItem value={"Centro Custo 3"}>Centro Custo 3</MenuItem>
                        : null}
                </Select>
            </FormControl>
        </div>
    );
}