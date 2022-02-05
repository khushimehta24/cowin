import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import { format, parseISO, subDays } from "date-fns";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Card, CardContent, Grid } from '@mui/material';

const tooltipStyle = {
  borderRadius: '0.25rem',
  background: 'white',
  color: 'black',
  padding: '1rem',
  boxShadow: '15px 15px 15px 5px rgba(0, 0, 0, 0.2)',
  textAlign: 'center',
  textAlign: 'left'
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function CovidData() {
  const [graphData, setGraphData] = useState([]);


  const countries = ['Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burma', 'Burundi', 'Cabo Verde', 'Cambodia', 'Cameroon', 'Canada', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo (Brazzaville)', 'Congo (Kinshasa)', 'Costa Rica', "Cote d'Ivoire", 'Croatia', 'Cuba', 'Cyprus', 'Czechia', 'Denmark', 'Diamond Princess', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia', 'Fiji', 'Finland', 'France', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Holy See', 'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Korea, South', 'Kosovo', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "MS Zaandam", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Namibia", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Summer Olympics 2020", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan*", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "US", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "West Bank and Gaza", "Yemen", "Zambia", "Zimbabwe"]


  const [country, setCountry] = useState('');
  const [last, setLast] = useState([]);



  var config = {
    method: 'get',
    url: 'https://pomber.github.io/covid19/timeseries.json',
    headers: {}
  };


  useEffect(() => {
    axios(config)
      .then(function (response) {
        setGraphData(response.data);
        handleChange();
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [])


  const handleChange = (event) => {
    setCountry(event.target.value);
    setLast(graphData[event.target.value][graphData[event.target.value].length - 1]);
    console.log(last);
  };

  return (<>

    <Card sx={{ padding: '0' }}>
      <CardContent style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0' }}>
        <Grid container style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0', marginLeft: '30px', marginRight: '30px' }}>
          <Grid item md={6} sm={12} xs={12}>
            <Box sx={{ maxWidth: '240px !important', marginTop: '3%', marginLeft: '1.5%', marginBottom: '3%' }}>
              <FormControl fullWidth style={{ width: '200px' }}>
                <InputLabel id="demo-simple-select-label" >Country</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={country}
                  label="Country"
                  onChange={handleChange}
                  MenuProps={MenuProps}
                >
                  {
                    countries.map((country) => {
                      return <MenuItem value={country}>{country}</MenuItem>
                    })
                  }
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item md={6} sm={12} xs={12}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ fontFamily: 'Readex Pro, sans-serif', color: 'black', textAlign: 'left', marginBottom: '0' }}>Confirmed</p>
                <h2 style={{ fontFamily: 'Readex Pro, sans-serif', fontWeight: '800', color: 'black', textAlign: 'left', marginTop: '0' }}>{last.confirmed}</h2>
              </div>
              <div>
                <p style={{ fontFamily: 'Readex Pro, sans-serif', color: 'black', textAlign: 'left', marginBottom: '0' }}>Deaths</p>
                <h2 style={{ fontFamily: 'Readex Pro, sans-serif', fontWeight: '800', color: 'red', textAlign: 'left', marginTop: '0' }}>{last.deaths}</h2>
              </div>
              <div>
                <p style={{ fontFamily: 'Readex Pro, sans-serif', color: 'black', textAlign: 'left', marginBottom: '0' }}>Recovered</p>
                <h2 style={{ fontFamily: 'Readex Pro, sans-serif', fontWeight: '800', color: '#07C597', textAlign: 'left', marginTop: '0' }}>{last.recovered}</h2>
              </div>
            </div>
          </Grid>
        </Grid>
      </CardContent>
    </Card>

    <h2 style={{ fontFamily: 'Readex Pro, sans-serif', fontWeight: '800', color: '#07C597', textAlign: 'center' }}>{country !== '' ? country : 'India'}</h2>
    <ResponsiveContainer width="100%" height={500}>
      <AreaChart data={country !== '' ? graphData[country] : graphData.India}>
        <defs>
          <linearGradient id='color' x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor='#07C597' stopOpacity={0.5}></stop>
            <stop offset="65%" stopColor='#07C597' stopOpacity={0.15}></stop>
            <stop offset="85%" stopColor='#07C597' stopOpacity={0.05}></stop>

          </linearGradient>
        </defs>
        <Area dataKey="confirmed" stroke='#07C597' fill='url(#color)' />
        <XAxis dataKey="date" axisLine={false} tickLine={false} tickCount={8} tickFormatter={str => {
          const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]
          const date = str !== 0 ? str.split('-') : 0;
          return ` ${months[date[1] - 1]},${date[2]} `;
        }} />
        <YAxis dataKey="confirmed" axisLine={false} tickLine={false} tickCount={8} tickFormatter={str => {
          var array = ['', 'k', 'M', 'G', 'T', 'P'];
          var i = 0;
          while (str > 1000) {
            i++;
            str = str / 1000;
          }
          str = str + ' ' + array[i];
          return str;
        }} />
        <Tooltip contentStyle={tooltipStyle} />
        <CartesianGrid opacity={1} vertical={false} />
      </AreaChart>
    </ResponsiveContainer>
  </>
  );
}

export default CovidData;
