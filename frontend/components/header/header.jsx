import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { logout, login } from '../../actions/session_actions';
import LoginDropdown from './login_dropdown';
import ProfileDropdown from './profile_dropdown';
import AlertBar from './alert_bar';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hiddenProfile: true,
      hiddenAlert: true
    };
    this.toggleProfileMenu = this.toggleProfileMenu.bind(this);
    this.login = this.props.login.bind(this, {email: 'guest@solomon.com', password: 'solomon'});
  }

  toggleProfileMenu() {
    this.setState({hiddenProfile: !this.state.hiddenProfile});
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors.length > 0) {
      this.setState({hiddenAlert: false})
    }
  }

  render() {
    const {currentUser, logout} = this.props;
    if (currentUser) {
      return (
        <header className='header'>
          <div className='header-flex'>
            <a href='/'>Solomon</a>
            <button id='btn-profile' className='btn' onClick={this.toggleProfileMenu}>
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

            <LoginDropdown />

            <span>or</span>

            <button id='signup-btn' className='btn btn-signup'>
              <Link to="/signup">Sign up</Link>
            </button>
          </div>
          <AlertBar hidden={this.state.hiddenAlert} source="login"/>
        </div>
      </header>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.session.currentUser,
    errors: state.session.errors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()),
    login: (user) => dispatch(login(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
