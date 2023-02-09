import React from 'react';
import ReactDOM from 'react-dom/client';
import Index from './pages/Index';
import Create from './pages/Create';
import Listing from './pages/Listing';
import reportWebVitals from './reportWebVitals';
import NavBar from './Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';
import { Route, Outlet, RouterProvider, createRoutesFromElements, createBrowserRouter, useParams } from 'react-router-dom';

const AppLayout = () => (
  <>
    <NavBar />
    <Outlet />
  </>
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AppLayout />}>
      <Route path="/" element={<Index />} />
      <Route path="/create" element={<Create />} />
      <Route path="/listing/:listingID" element={<Listing />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
