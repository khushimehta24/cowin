import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import './Cowin.css'
import { Link as RouterLink } from 'react-router-dom';
import { BrowserRouter as Router, Outlet, Navigate } from "react-router-dom";
import { Link } from '@mui/material';


export default function DenseAppBar() {
    return (<>
        <Box sx={{ flexGrow: 1, backgroundColor: '#0950D5' }}>
            <AppBar position="static" sx={{ backgroundColor: '#07C597', paddingY: '10px' }}>
                <Toolbar variant="dense" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h5" color="inherit" component="div" className='logoText'>
                        co-Win
                    </Typography>
                    <Router>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '20px' }}>
                            <Link style={{ textDecoration: 'none', color: 'white', margin: '20px', cursor: 'pointer' }} href="/">Stats</Link>
                            <Link style={{ textDecoration: 'none', color: 'white', margin: '20px', cursor: 'pointer' }} href="/vaccination">Centers</Link>
                        </div>
                    </Router>
                </Toolbar>
            </AppBar>
        </Box>
    </>
    );
}