import React from 'react';
import { connect } from 'react-redux';
import { login, receiveErrors } from '../actions/session_actions';
import { Link, hashHistory } from 'react-router';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(property) {
    return (e) => {
      this.setState({[property]: e.currentTarget.value});
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.login(this.state).then(
      () => hashHistory.push('/'),
      (err) => dispatch(receiveErrors(err))
    );
  }

  // TODO: figure out what to do with errors here
  render() {
    if (this.props.hidden) {
      return (
        <div></div>
      );
    }

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type='text' onChange={this.handleInput('email')}
            value={this.state.email} placeholder='Email address'/>
          <input type='password' onChange={this.handleInput('password')}
            value={this.state.password} placeholder='Password'/>
          <input type='submit' value='Log in to Solomon'/>
        </form>
      </div>
    );
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
