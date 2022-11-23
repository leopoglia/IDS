import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import StarIcon from '@mui/icons-material/Star';

export default function InsetList() {
    return (
        <List
            sx={{ width: '100%', minWidth: 180, background: 'var(--greyF7)', borderRadius: '4px', border: '1px solid var(--greyC4)', color: 'var(--grey59)' }}
            aria-label="contacts"
        >
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemText primary="Abrir conversa" />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemText primary="Baixar em PDF" />
                </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemText primary="Histórico" />
                </ListItemButton>
            </ListItem>
        </List>
    );
}
