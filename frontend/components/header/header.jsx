import React from 'react';
import { connect } from 'react-redux';
import { Link, hashHistory } from 'react-router';
import { logout, login } from '../../actions/session_actions';
import LoginDropdown from './login_dropdown';
import ProfileDropdown from './profile_dropdown';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hiddenLogin: true,
      hiddenProfile: true
    };
    this.toggleHidden = this.toggleHidden.bind(this);
    this.login = this.props.login.bind(this, {email: 'guest@solomon.com', password: 'solomon'});
  }

  toggleHidden(property) {
    let hiddenStatus;
    if (property === 'hiddenLogin') {
      hiddenStatus = !this.state.hiddenLogin;
    } else {
      hiddenStatus = !this.state.hiddenProfile;
    }

    return () => {
      this.setState({[property]: hiddenStatus});
    };
  }

  render() {
    const {currentUser, logout} = this.props;
    if (currentUser) {
      return (
        <header className='header'>
          <div className='header-flex'>
            <a href='/'>Solomon</a>
            <button id='profile-dropdown' className='btn' onClick={this.toggleHidden('hiddenProfile')}>
              {currentUser.name}
              <ProfileDropdown hidden={this.state.hiddenProfile} logout={logout}/>
            </button>
          </div>
        </header>
      );
    }

    return (
      <header className ='header'>
        <div className='header-flex'>
          <a href='/'>Solomon</a>
          <div className='login-bar'>
            <button id='login-btn'
              className='btn btn-login'
              onClick={this.login}>Guest
            </button>

            <button id='login-btn'
              className='btn btn-login'
              onClick={this.toggleHidden('hiddenLogin')}>Log in
            </button>

            <span>or</span>

            <button id='signup-btn'
              className='btn btn-signup'
              onClick={() => hashHistory.push('/signup')}>Sign up
            </button>
          </div>
        </div>

        <LoginDropdown hidden={this.state.hiddenLogin}/>
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
    logout: () => dispatch(logout()),
    login: (user) => dispatch(login(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
