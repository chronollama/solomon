import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import { Link, hashHistory } from 'react-router';
import { login, receiveErrors } from '../../actions/session_actions';

class LoginDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      dropdownActive: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
  }

  handleInput(property) {
    return (e) => {
      this.setState({[property]: e.currentTarget.value});
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const userCredentials = {email: this.state.email, password: this.state.password};
    this.props.login(userCredentials).then(
      () => hashHistory.push('/'),
      (err) => receiveErrors(err)
    );
  }

  toggleDropdown() {
    let dropdownState = !this.state.dropdownActive;
    this.setState({dropdownActive: dropdownState});
  }

  // TODO: figure out what to do with errors here
  render() {
    let dropdown;
    if (this.state.dropdownActive) {
      dropdown = (
        <form id='login-form' onSubmit={this.handleSubmit}>
          <input className='input-text login-field' type='text'
            onChange={this.handleInput('email')}
            value={this.state.email} placeholder='Email address'/>

          <input className='input-text login-field' type='password'
            onChange={this.handleInput('password')}
            value={this.state.password} placeholder='Password'/>

          <input className= 'btn btn-login btn-long' type='submit' value='Log in to Solomon'/>
        </form>
      )
    } else {
      dropdown = '';
    }

    return (
      <div id='login-btn-container'>
        <button className='btn btn-login'
          onClick={this.toggleDropdown}>Log in
        </button>
        <ReactCSSTransitionGroup component="div"
          transitionName='dropdown'
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
          {dropdown}
        </ReactCSSTransitionGroup>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    errors: state.session.errors,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: (user) => dispatch(login(user)),
    receiveErrors: (err) => dispatch(login(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginDropdown);
