// Client ID: 810412095303-piac1t2r7nnrf4ka095d29tdr9u6icdl.apps.googleusercontent.com
//Client Secret: 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

import React, { useEffect } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import { LinkContainer } from "react-router-bootstrap";
import { Route, Outlet, RouterProvider, createRoutesFromElements, createBrowserRouter, useParams } from 'react-router-dom';

import Create from "./pages/Create" ;
import useUser from './hooks/useUser'
import { Card, Dropdown, Image } from 'react-bootstrap';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route >
      <Route path="/create" element={<Create />} />
    </Route>
  )
);

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href=""
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
  </a>
));

const NavBar = () => {
  var { user } = useUser();

  const logout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
    <Container>
      <Link to={'/'} className='text-decoration-none'>
        <Navbar.Brand className='under'>Gear</Navbar.Brand>
      </Link>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
          <NavDropdown title="About Us" id="collasible-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav>
          <LinkContainer to="/create" className='me-2'>
            <Nav.Link>Create a Listing</Nav.Link>
          </LinkContainer>
      
          {user.email == null && 
            <LinkContainer to="/login">
              <Nav.Link>Login</Nav.Link>
            </LinkContainer>}
          {user.email != null &&
            <Dropdown drop='start'>
              <Dropdown.Toggle as={CustomToggle}>
                <Image className='rounded-circle' width='40px' height='40px' src={user.picture} referrerPolicy="no-referrer"  />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <div className='mx-4 mb-3 mt-1'>
                  Welcome {user.firstName} ({user.email})
                </div>
                <Dropdown.Divider />
                <Dropdown.Item onClick={logout}>
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          }
          
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>

  );
};

export default NavBar;