import { FaUsers, FaList, FaDollarSign, FaCog, FaUserTie} from "react-icons/fa";
import styles from "./PageNav.module.scss";
import React from "react";
import { NavLink as Link } from "react-router-dom";
import {
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";



const PageNav = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.brandContainer}>
        <NavbarBrand tag={Link} to="/" className={styles.brand}>
          <FaUserTie className={styles.logo} /> <span>Admin</span>
        </NavbarBrand>
      </div>

      <div className={styles.navContainer}>
        <Nav vertical className={styles.nav}>
          <NavItem>
            <NavLink tag={Link} to="/users" className={styles.navLink}>
              <FaUsers /> Users
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/features" className={styles.navLink}>
              <FaList /> Features
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/pricing" className={styles.navLink}>
              <FaDollarSign /> Pricing
            </NavLink>
          </NavItem>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret className={styles.navLink}>
              <FaCog /> Options
            </DropdownToggle>
            <DropdownMenu className={styles.dropdown}>
              <DropdownItem>Option 1</DropdownItem>
              <DropdownItem>Option 2</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Reset</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </div>
    </div>
  );
};

export default PageNav;
