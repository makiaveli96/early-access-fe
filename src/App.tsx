import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home'
import Whitelist from './pages/WhiteList'
import Referral from './pages/Referral';
import Account from './pages/Account';
import Signin from './pages/Signin';
import CreatePassword from './pages/CreatePassword';
import NewEmail from './pages/NewEmail';
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
            <Route path='/' element={<Navigate to="/sign-in" />} />

            <Route path='/sign-in' element={<Signin />} />

            <Route path='/create-password' element={<CreatePassword />} />

            <Route path="/verify-email" element={<NewEmail />} />
            
            <Route path='/home' element={<PrivateRoute />}>
              <Route path='/home' element={<Home/>}/> 
            </Route>

            {/* <Route path='/referral' element={<PrivateRoute />}>
              <Route path='/referral' element={<Referral />} />
            </Route>

            <Route path='/account' element={<PrivateRoute />}>
              <Route path='/account' element={<Account />} />
            </Route>

            <Route path='/account/whitelist' element={<PrivateRoute page="whitelist" />}>
              <Route path='/account/whitelist' element={<Whitelist />} />
            </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
