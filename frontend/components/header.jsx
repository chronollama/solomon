import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { logout } from '../actions/session_actions';
import NavDropdown from './navdropdown';

const ProfileDropdown = () => {
  return (
    <ul id='profile-dropdown' className='profile-dropdown hidden'>
      <li>Your account</li>
      <li>Create a group</li>
      <li>Fairness calculators</li>
      <li>Log out</li>
    </ul>
  );
};

const LoginDropdown = () => {
  return (
    <form id='login-dropdown' className='hidden'></form>
  );
};

const Header = ({currentUser, logout}) => {
  if (currentUser) {
    return (
      <header>
        <ul>
          <li><Link to='/'>Solomon</Link></li>
          <li id='profile-dropdown-btn'><ProfileDropdown /></li>
        </ul>

      </header>
    );
  }

  return (
    <header>
      <ul>
        <li><Link to='/'>Solomon</Link></li>
        <li id='login-dropdown-btn'><LoginDropdown /></li>
        <li><Link to='/signup'>Sign up</Link></li>
      </ul>
    </header>
  );
};

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
