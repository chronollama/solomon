import React from 'react';
import { connect } from 'react-redux';
import { Link, hashHistory } from 'react-router';
import { logout, login } from '../../actions/session_actions';
import LoginDropdown from './login_dropdown';
import ProfileDropdown from './profile_dropdown';
import AlertBar from './alert_bar';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hiddenProfile: true
    };
    this.toggleProfileMenu = this.toggleProfileMenu.bind(this);
    this.guestLogin = this.guestLogin.bind(this);
    this.logout = this.logout.bind(this);
  }

  toggleProfileMenu() {
    this.setState({hiddenProfile: !this.state.hiddenProfile});
  }

  guestLogin(e) {
    e.preventDefault();
    this.props.login({email: 'guest@solomon.com', password: 'solomon'}).then(
      () => hashHistory.push('/expenses')
    );
  }

  logout() {
    this.props.logout().then(
      () => hashHistory.push('/login')
    );
  }

  render() {
    const {currentUser} = this.props;
    if (currentUser) {
      return (
        <header className='header'>
          <div className='header-flex'>
            <Link to='/expenses'>Solomon</Link>
            <button className='btn btn-profile' onClick={this.toggleProfileMenu}>
              {currentUser.name}
              <ProfileDropdown hidden={this.state.hiddenProfile} logout={this.logout}/>
            </button>
            <AlertBar />
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
              onClick={this.guestLogin}>Guest
            </button>

            <LoginDropdown />

            <span>or</span>

            <button id='signup-btn' className='btn btn-signup'>
              <Link to="/signup">Sign up</Link>
            </button>
          </div>
          <AlertBar />
        </div>
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
