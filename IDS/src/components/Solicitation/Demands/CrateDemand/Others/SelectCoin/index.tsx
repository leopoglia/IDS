import { useState, useEffect } from 'react'; 
import Select, { SelectChangeEvent } from '@mui/material/Select';

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

export default function SelectLabels(props: any) {
    const [coin, setCoin] = useState('');

    useEffect(() => { 
        addChange();
        if (coin === "" || coin === undefined) {
            setCoin('R$')
        }

        if(props.value === 'R$'){
            setCoin('R$')
        }else if(props.value === '$'){
            setCoin('$')
        }else if(props.value === 'E'){
            setCoin('€')
        }
            

    }, []);

    const addChange = () => {
        if (props.value === undefined) {
            setCoin('R$')
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
                    <MenuItem value={'R$'}>
                        <em>R$</em>
                    </MenuItem>
                    <MenuItem value={'$'}>$</MenuItem>
                    <MenuItem value={'€'}>€</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}