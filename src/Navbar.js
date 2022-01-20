import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function DenseAppBar() {
    return (
        <Box sx={{ flexGrow: 1, backgroundColor: '#0950D5' }}>
            <AppBar position="static" sx={{ backgroundColor: '#07C597', paddingY: '5px' }}>
                <Toolbar variant="dense" >
                    <Typography variant="h5" color="inherit" component="div">
                        co-Win
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
}