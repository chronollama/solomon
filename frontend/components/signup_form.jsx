import React from 'react';
import { connect } from 'react-redux';
import { signup, receiveErrors } from '../actions/session_actions';
import { Link, hashHistory } from 'react-router';

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
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
    this.props.signup(this.state).then(
      () => hashHistory.push('/'),
      (err) => dispatch(receiveErrors(err))
    );
  }

  render() {
    let errors;
    if (this.props.errors) {
      errors = this.props.errors.map((error, idx) => {
        return (
          <li key={idx}>{error}</li>
        );
      });
    }

    return (
      <div>
        <h1>Introduce Yourself</h1>

        <ul>{errors}</ul>

        <form onSubmit={this.handleSubmit}>
          <label>
            Hi there! My name is
            <input type='text' onChange={this.handleInput('name')} value={this.state.name}/>
          </label>

          <label>
            Here's my email address:
            <input type='text' onChange={this.handleInput('email')} value={this.state.email}/>
          </label>

          <label>
            And here's my password:
            <input type='password' onChange={this.handleInput('password')} value={this.state.password}/>
          </label>

          <input type='submit' value='Sign me up!'/>
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
    signup: (user) => dispatch(signup(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
