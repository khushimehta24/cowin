import { Button, Card, CardContent, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import TextField from "@mui/material/TextField";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './Cowin.css'
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


function Cowin() {
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));
    const [fields, setFields] = useState({ pincode: '', date: '', type: 'ALL', age: 'AL', price: 'A' });
    const [centers, setCenters] = useState([]);
    let dummyCenters = [];


    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setFields({ ...fields, [name]: value })
    }

    const searchCenters = (e) => {
        e.preventDefault();
        console.log(fields);
        const enteredDate = fields.date.split("-").reverse().join("-")
        const URL = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${fields.pincode}&date=${enteredDate}`
        console.log(URL);
        axios.get(URL)
            .then(res => {
                dummyCenters = res.data.sessions;
                setCenters([])
                const filteredData1 = dummyCenters.filter((dummydata) => fields.type === 'ALL' ? (dummydata.vaccine === 'COVAXIN' || dummydata.vaccine === 'COVISHIELD') : dummydata.vaccine === fields.type);
                const filteredData2 = filteredData1.filter((dummydata) => fields.price === 'A' ? (dummydata.fee_type === 'Free' || dummydata.fee_type === 'Paid') : dummydata.fee_type === fields.price)
                const filteredData3 = filteredData2.filter((dummydata) => fields.age === 'AL' ? (dummydata.min_age_limit === 18 || dummydata.min_age_limit === 45 || dummydata.min_age_limit <= 18) : dummydata.min_age_limit === fields.age)
                setCenters(filteredData3)
            })

    }

    return <>
        <div style={{ width: '98vw', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: '5%' }}>
            <Card style={{ width: '85%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <CardContent style={{ width: '90%' }}>
                    <h3 sx={{ fontFamily: 'Readex Pro, sans-serif' }}>Find Nearby Vaccination Centers</h3>
                    <Grid container style={{ width: '100%' }}>
                        <Grid item md={2} sm={12} xs={12}>
                            <TextField margin="normal" sx={{ width: '95%', fontFamily: 'Readex Pro, sans-serif' }} required id="pincode" name="pincode" label="PinCode" value={fields.pincode} onChange={handleChange} />
                        </Grid>
                        <Grid item md={2} sm={12} xs={12}>
                            <TextField margin="normal" sx={{ width: '95%', fontFamily: 'Readex Pro, sans-serif', mt: 2 }} type='date' required id="date" name="date" value={fields.date} onChange={handleChange} />
                        </Grid>
                        <Grid item md={2} style={{ marginTop: '1.2%' }} sm={12} xs={12}>
                            <Box sx={{ minWidth: '95%', fontFamily: 'Readex Pro, sans-serif', marginTop: '0%' }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Price</InputLabel>
                                    <Select
                                        required id="price" label="Price" name="price" value={fields.price}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={'A'}>All</MenuItem>
                                        <MenuItem value={'Free'}>Free</MenuItem>
                                        <MenuItem value={'Paid'}>Paid</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </Grid>
                        <Grid item md={1} style={{ marginTop: '1.2%', marginLeft: '1%' }} sm={12} xs={12} className='selectFields'>
                            <Box sx={{ minWidth: '95%', fontFamily: 'Readex Pro, sans-serif', marginTop: '0%' }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Age</InputLabel>
                                    <Select
                                        required id="age" label="Age" name="age" value={fields.age}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={'AL'}>All</MenuItem>
                                        <MenuItem value={18}>18+</MenuItem>
                                        <MenuItem value={45}>45+</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </Grid>
                        <Grid item md={1} style={{ marginTop: '1.2%', marginLeft: '1%' }} sm={12} xs={12} className='selectFields'>
                            <Box sx={{ minWidth: '95%', fontFamily: 'Readex Pro, sans-serif', marginTop: '0%' }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Vaccine</InputLabel>
                                    <Select
                                        required id="type" label="Vaccine" name="type" value={fields.type}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={'ALL'}>All</MenuItem>
                                        <MenuItem value={'COVAXIN'}>Covaxin</MenuItem>
                                        <MenuItem value={'COVISHIELD'}>CoviShield</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </Grid>
                        <Grid item md={3} sx={{ marginTop: '1.2%', marginLeft: '1%' }} sm={12} xs={12}>
                            <Button onClick={searchCenters} variant="outlined" className='searchBtn' sx={{ width: '100%', height: '90%' }}>Search</Button>
                        </Grid>
                    </Grid>
                    <TableContainer component={Paper} sx={{ marginTop: '5%', width: '98%' }}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead >
                                <TableRow>
                                    <StyledTableCell sx={{ backgroundColor: '#07C597 !important' }}>Name of the center</StyledTableCell>
                                    <StyledTableCell align="right" sx={{ backgroundColor: '#07C597 !important' }}>Address</StyledTableCell>
                                    <StyledTableCell align="right" sx={{ backgroundColor: '#07C597 !important' }}>Open till</StyledTableCell>
                                    <StyledTableCell align="right" sx={{ backgroundColor: '#07C597 !important' }}>Fee</StyledTableCell>
                                    <StyledTableCell align="right" sx={{ backgroundColor: '#07C597 !important' }}>Vaccine</StyledTableCell>
                                    <StyledTableCell align="right" sx={{ backgroundColor: '#07C597 !important' }}>Age</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {centers.map((center) => {
                                    return <StyledTableRow key={center.center_id}>
                                        <StyledTableCell component="th" scope="row">
                                            {center.name}
                                        </StyledTableCell>
                                        <StyledTableCell align="right">{center.address}</StyledTableCell>
                                        <StyledTableCell align="right">{center.from} to {center.to}</StyledTableCell>
                                        <StyledTableCell align="right">{center.fee_type}</StyledTableCell>
                                        <StyledTableCell align="right">{center.vaccine}</StyledTableCell>
                                        <StyledTableCell align="right">{center.min_age_limit}</StyledTableCell>
                                    </StyledTableRow>
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>
        </div>
    </>;
}

export default Cowin;
