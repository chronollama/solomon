import React from 'react';
import { connect } from 'react-redux';
import { Link, hashHistory } from 'react-router';
import { logout } from '../../actions/session_actions';
import LoginDropdown from './login_dropdown';
import ProfileDropdown from './profile_dropdown';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: true
    };
    this.toggleHidden = this.toggleHidden.bind(this);
  }

  toggleHidden() {
    this.setState({hidden: !this.state.hidden});
  }

  render() {
    const {currentUser, logout} = this.props;
    if (currentUser) {
      return (
        <header className='header'>
          <div className='header-flex'>
            <a href='/'>Solomon</a>
            <button id='profile-dropdown' className='btn' onClick={this.toggleHidden}>
              <ProfileDropdown hidden={this.state.hidden} logout={logout}/>
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
              onClick={this.toggleHidden}>Log in
            </button>

            <span>or</span>

            <button id='signup-btn'
              className='btn btn-signup'
              onClick={() => hashHistory.push('/signup')}>Sign up
            </button>
          </div>
        </div>

        <LoginDropdown hidden={this.state.hidden}/>
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
