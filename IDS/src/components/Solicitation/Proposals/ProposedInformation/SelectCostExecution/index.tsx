import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function SelectLabels() {
    const [age, setAge] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value);
    };

    return (
        <div>

            <FormControl sx={{ width: "100%" }}>
                <Select
                    value={age}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}

                    sx={{ minWidth: '100%', height: '45px' }}
                >
                    <MenuItem value={10}>Centro Custo 1</MenuItem>
                    <MenuItem value={20}>Centro Custo 2</MenuItem>
                    <MenuItem value={30}>Centro Custo 3</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}