import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function SelectLabels() {
    const [age, setAge] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value);
    };

    return (
        <div>

            <FormControl sx={{ m: 1 }}>
                <Select
                    value={age}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}

                    sx={{ m: 1, minWidth: 120, height: '45px' }}
                >
                    <MenuItem value="">
                        <em>R$</em>
                    </MenuItem>
                    <MenuItem value={20}>$</MenuItem>
                    <MenuItem value={30}>€</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}