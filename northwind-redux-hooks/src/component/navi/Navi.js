import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,

} from 'reactstrap';
import CartSummary from '../cart/CartSummary';
import { Link } from 'react-router-dom';

export default class Navi extends Component {
  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Home</NavbarBrand>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="https://github.com/Huseyinaydin48447">GitHub</NavLink>
            </NavItem>
            <NavItem>
              <NavLink>
                <Link to="/saveproduct" >ürün ekle</Link>
              </NavLink>
            </NavItem>
            <CartSummary />
          </Nav>
        </Navbar>
      </div>
    );
  }
}
