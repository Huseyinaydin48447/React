import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import { NavItem } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';

function MainHeader() {
  const navigate = useNavigate();
  const userData = JSON.parse(secureLocalStorage.getItem('userData'));

  console.log("title={userData.username}  : "  + userData.username)
  const handleLogout = () => {
    secureLocalStorage.removeItem('userData');
    navigate('/login');
  };

  return (
    <Navbar expand="md" className="bg-body-tertiary">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto flex-row">
            <NavItem className="me-3">
            <Link to="/home/todolist">Todolist</Link>
            </NavItem>
            <NavItem className="me-3">
           
            </NavItem>
            {userData && (
              <NavDropdown title={userData.username} id="basic-nav-dropdown" className="me-3">
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            )}
            {!userData && (
              <>
                <NavItem className="me-3">
                  <Link to="/login">Login</Link>
                </NavItem>
                <NavItem className="me-3">
                  <Link to="/register">Register</Link>
                </NavItem>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MainHeader;

