import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useEffect } from 'react';

export default function SelectLabels(props: any) {
    const [coin, setCoin] = React.useState('');

    useEffect(() => { 
        addChange();
        if (coin === "" || coin === undefined) {
            setCoin('real')
        }

        if(props.value === 'real'){
            setCoin('real')
        }else if(props.value === 'dolar'){
            setCoin('dolar')
        }else if(props.value === 'euro'){
            setCoin('euro')
        }
            

    }, []);

    const addChange = () => {
        if (props.value === undefined) {
            setCoin('real')
        } else {
            setCoin(props.value);
        }
    }

    const handleChange = (event: SelectChangeEvent) => {
        setCoin(event.target.value);

        if (props.type === 'real') {
            props.setrealCurrency(event.target.value);
        } else {
            props.setPotentialCurrency(event.target.value);
        }

    };

    return (
        <div className='w130'>
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