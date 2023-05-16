import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useTheme } from '@mui/material';

function valuetext(value: number) {
    return `${value}°C`;
}

export default function DiscreteSlider() {

    const theme = useTheme();

    return (
        <Box sx={{ width: 125 }}>
            <Slider
                aria-label="Temperature"
                defaultValue={20}
                getAriaValueText={valuetext}
                valueLabelDisplay="auto"
                step={1}
                min={8}
                max={35}
                sx={{
                    color: theme.palette.mode === 'dark' ? '#fff' : 'rgba(255,255,255,0.87)',
                    height: 8,
                    '& .MuiSlider-thumb': {
                        width: 8,
                        height: 8,
                        transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
                        '&:before': {
                            boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
                        },
                        '&:hover, &.Mui-focusVisible': {
                            boxShadow: `0px 0px 0px 8px ${theme.palette.mode === 'dark'
                                ? 'rgb(255 255 255 / 16%)'
                                : 'rgb(0 0 0 / 16%)'
                                }`,
                        },
                        '&.Mui-active': {
                            width: 20,
                            height: 20,
                        },
                    },
                    '& .MuiSlider-rail': {
                        opacity: 0.28,
                    },
                }}
            />
        </Box>
    );
}
