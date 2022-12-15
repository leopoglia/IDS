import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function SelectLabels(props: any) {
    const [age, setAge] = React.useState('');

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

                    {props.type === "typeOfExpense" ? <MenuItem value={10}>Interno</MenuItem>
                        : null}

                    {props.type === "typeOfExpense" ? <MenuItem value={20}>Externo</MenuItem>
                        : null}

                    {props.type === "expenseProfile" ? <MenuItem value={10}>Desenvolvimento</MenuItem>
                        : null}

                    {props.type === "expenseProfile" ? <MenuItem value={20}>Infraestrutura</MenuItem>
                        : null}

                </Select>
            </FormControl>
        </div>
    );
}