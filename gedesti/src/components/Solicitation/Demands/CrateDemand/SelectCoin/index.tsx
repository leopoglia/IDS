import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useEffect } from 'react';

export default function SelectLabels(props: any) {
    const [coin, setCoin] = React.useState('');

    useEffect(() => {
        if (props.type === 'real') {
            setCoin(props.realCurrency);
        } else {
            setCoin(props.potentialCurrency);
        }
    }, []);

    const handleChange = (event: SelectChangeEvent) => {
        setCoin(event.target.value);
        if (props.type === 'real') {
            props.setrealCurrency(event.target.value);
        } else {
            props.setPotentialCurrency(event.target.value);
        }

    };

    return (
        <div>
            <FormControl sx={{ m: 1 }}>
                <Select
                    value={coin}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}

                    sx={{ m: 1, minWidth: 120, height: '45px' }}
                >
                    <MenuItem value={'real'}>
                        <em>R$</em>
                    </MenuItem>
                    <MenuItem value={'dolar'}>$</MenuItem>
                    <MenuItem value={'euro'}>€</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}