import React from "react";
import {
  Collapse,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import CartSummary from "./CartSummary";
import { Link } from "react-router-dom";

// eslint-disable-next-line no-undef
export default class Navi extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }
  toggle() {
    this.setSate = {
      isOpen: !this.state.isOpen,
    };
  }

  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Welcome</NavbarBrand>
          <NavbarBrand onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
            
              <NavItem>
                <NavLink>
                  <Link to="form1/">Login-Registration</Link>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/Huseyinaydin48447">
                  GitHub
                </NavLink>
              </NavItem>
              <CartSummary
                removeFromCart={this.props.removeFromCart}
                cart={this.props.cart}
              />
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
