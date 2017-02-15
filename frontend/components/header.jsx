import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { logout } from '../actions/session_actions';

const ProfileDropdown = ({ logout }) => {
  return (
    <ul id='profile-dropdown' className='dropdown hidden'>
      <li>Your account</li>
      <li>Create a group</li>
      <li>Fairness calculators</li>
      <li onClick={logout}>Log out</li>
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
        <h3>Welcome, {currentUser.name}!</h3>
        <ul>
          <li><Link to='/'>Solomon</Link></li>
          <li id='profile-dropdown-btn'><ProfileDropdown logout={logout}/></li>
        </ul>
      </header>
    );
  }

  return (
    <header>
      <ul>
        <li><Link to='/'>Solomon</Link></li>
        <li id='login-dropdown-btn'><button>Login</button></li>
        <li><Link to='/signup'>Sign up</Link></li>
      </ul>
    </header>
  );
};

const mapStateToProps = state => {
  return {
    currentUser: state.session.currentUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
