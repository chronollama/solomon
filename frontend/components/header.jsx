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
    if (this.state.hiddenLogin) {
      this.setState({hiddenLogin: false})
    } else {
      this.setState({hiddenLogin: true})
    }
  }

  render() {
    const {currentUser, logout} = this.props
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
          <li><button onClick={this.toggleLogin}>Login</button></li>
          <li><button onClick={() => hashHistory.push('/signup')}>Sign up</button></li>
        </ul>

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
