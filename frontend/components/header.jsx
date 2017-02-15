import React from 'react';
import { connect } from 'react-redux';
import { Link, hashHistory } from 'react-router';
import { logout } from '../actions/session_actions';
import LoginForm from './login_form';

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

// TODO:toggleClass, look up AA Times solution. Toggle 'hidden' to reveal
// form. <li> buttons in Header
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hiddenLogin: true
    };
    this.toggleLogin = this.toggleLogin.bind(this);
  }

  toggleLogin() {
    this.setState({hiddenLogin: !this.state.hiddenLogin})
  }

  render() {
    const {currentUser, logout} = this.props
    if (currentUser) {
      return (
        <header className='header'>
          <div className='header-flex'>
            <a href='/'>Solomon</a>
            <button id='profile-dropdown' className='btn'>
              <ProfileDropdown logout={logout}/>
            </button>
          </div>
        </header>
      );
    }

    return (
      <header className ='header'>
        <div className='header-flex'>
          <a href='/'>Solomon</a>
          <ul id='login-bar'>
            <li id='login-btn' className='btn btn-mint'>
              <button onClick={this.toggleLogin}>Log in</button>
            </li>

            <li>or</li>

            <li id='signup-btn' className='btn btn-orange'>
              <button onClick={() => hashHistory.push('/signup')}>Sign up</button>
            </li>
          </ul>
        </div>

        <LoginForm hidden={this.state.hiddenLogin}/>
      </header>
    );
  }
}

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
