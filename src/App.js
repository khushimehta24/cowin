import logo from './logo.svg';
import './App.css';
import Navbar from "./Navbar"
import Cowin from './Cowin';
import CovidData from './CovidData';
import { Route, Routes } from "react-router";
import { BrowserRouter as Router, Outlet, Navigate } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <Router>
        <Routes>
          <Route exact path='/' element={<CovidData />} />
          <Route path='/vaccination' element={<Cowin />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
