import React,{useEffect,useState} from 'react';
import ReactDOM from 'react-dom/client';
import Index from './pages/Index';
import Create from './pages/Create';
import Listing from './pages/Listing';
import reportWebVitals from './reportWebVitals';
import NavBar from './Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';
import { Route, Outlet, RouterProvider, createRoutesFromElements, createBrowserRouter, useParams, Navigate, Routes, BrowserRouter } from 'react-router-dom';

import {  Landing, Login, Signup} from "./pages";






const AppLayout = () => {
    const [user, setUser] = useState({});

    return(
  <>
    
    <BrowserRouter>
    <NavBar />
    <Outlet />
      <Routes>
        <Route
          path="/"
          element={user?.email ? <Navigate to="/Index" /> : <Landing />}
        />
        <Route
          path="/pages/SignUp"
          element={user?.email ? <Navigate to="/Index" /> : <Signup />}
        />
        <Route
          path="/pages/Login"
          element={user?.email ? <Navigate to="/Index" /> : <Login />}
        />
       
        <Route path="/" element={<Index />} />
      <Route path="/create" element={<Create />} />
      <Route path="/listing/:listingID" element={<Listing />} />
      </Routes>
    </BrowserRouter>
      

  </>
    );

    };



export default AppLayout;
