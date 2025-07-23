import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import Navbar from './Navbar.js';
import Footer from './Footer';
import Home from './Home.js';
import Ferrousmetal from './Ferrousmetal.js';
import Stainless from './Stainless.js';
import Hms from './Hms.js';
import Tyrewire from './Tyrewire.js';
import Nonferrousmetal from './Nonferrousmetal.js';
import ContactPage from './ContactPage.js';
import About from './About.js';
import Brassscrap from './Brassscrap.js';
import Cws from './Cws.js';
import Aluminiumscrap from './Aluminiumscrap.js';
import Tyrescrap from './Tyrescrap.js';
import Rubbercrumb from './Rubbercrumb.js';
import RubberGranules from './RubberGranules.js';
import Baledtyres from './Baledtyres.js';
import Tdf from './Tdf.js';
import Login from "./Login.js"
import Signup from "./Signup.js"
import BusinessProfileForm from './BusinessProfileForm';
import AddLot from './AddLot';
import LotDetails from './LotDetails'; 
import Dashboard from './Dashboard.js';
import Dashboard1 from './Dashboard1.js';
import BuyerBusinessProfile from "./BuyerBusinessProfile.js";
import AddLotBuyer from "./AddLotBuyer.js";
import showSuccessModal from "./showSuccessModal.js";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-supplier" element={<BusinessProfileForm />} />
        <Route path="/add-lot" element={<AddLot />} />
        <Route path="/lot-details" element={<LotDetails />} />
        <Route path='/ferrousmetal' element={<Ferrousmetal/>} />
        <Route path='/stainless' element={<Stainless/>} />
        <Route path='/hms' element={<Hms/>} />
        <Route path='/tyrewire' element={<Tyrewire/>} />
        <Route path='/nonferrousmetal' element={<Nonferrousmetal/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/contact' element={<ContactPage/>} />
        <Route path='/brassscrap' element={<Brassscrap/>} />
        <Route path='/copperwirescrap' element={<Cws/>} />
        <Route path='/aluminiumscrap' element={<Aluminiumscrap/>} />
        <Route path='/tyrescrap' element={<Tyrescrap/>} />
        <Route path='/rubbercrumb' element={<Rubbercrumb/>} />
        <Route path='/rubbergranules' element={<RubberGranules/>} />
        <Route path='/baledtyres' element={<Baledtyres/>} />
        <Route path='/tdf' element={<Tdf/>} />

        <Route path='/dashboard1' element={<Dashboard1/>} />
        <Route path='/buyerbusinessprofile' element={<BuyerBusinessProfile/>} />
        <Route path='/addlotbuyer' element={<AddLotBuyer/>} />
        <Route path='/showSuccessModal' element={<showSuccessModal/>} />

      </Routes>
      <Footer />
      
    </Router>
  );
}

export default App;
