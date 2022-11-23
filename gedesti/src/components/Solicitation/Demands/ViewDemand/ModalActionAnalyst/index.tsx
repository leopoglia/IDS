import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';

export default function InsetList() {
    return (

        <List
            sx={{ width: '100%', minWidth: 180, background: 'var(--greyF7)', borderRadius: '4px', border: '1px solid var(--greyC4)', color: 'var(--grey59)' }}
            aria-label="contacts">

            <Link to="/messages/message" style={{ textDecoration: 'none', color: 'var(--grey59)' }}>

                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemText primary="Abrir conversa" />
                    </ListItemButton>
                </ListItem>
            </Link>

            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemText primary="Baixar em PDF" />
                </ListItemButton>
            </ListItem>

            <Link to="/demand/historical" style={{ textDecoration: 'none', color: 'var(--grey59)' }}>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemText primary="Histórico" />
                    </ListItemButton>
                </ListItem>
            </Link>
        </List>
    );
}
