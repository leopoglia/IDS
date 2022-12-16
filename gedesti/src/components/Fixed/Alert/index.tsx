import Alert from '@mui/material/Alert';
import "./style.css"
import { useState } from 'react';

export default function BasicAlerts(props: any) {

    return (
        <div className='alert-fixed'>
            <Alert severity={props.type}>{props.text}</Alert>
        </div>
    );
}