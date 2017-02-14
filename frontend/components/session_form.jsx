import React from 'react';
import { connect } from 'react-redux';
import { login, signup, clearErrors } from '../actions/session_actions';
import { Link } from 'react-router';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
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
    this.props.processForm(this.state)
      .then(this.setState({username: "", password: ""}))
      .then(this.props.router.push('/'));
  }

  componentWillReceiveProps(newProps) {
    if (this.props.formType !== newProps.formType) {
      this.props.clearErrors();
    }
  }

  render() {
    let otherFormPath, otherFormValue, errors;
    if (this.props.formType === '/login') {
      otherFormPath = '/signup';
      otherFormValue = 'Sign Up';
    } else {
      otherFormPath = '/login';
      otherFormValue = 'Log In';
    }

    if (this.props.errors) {
      errors = this.props.errors.map((error, idx) => {
        return (
          <li key={idx}>{error}</li>
        );
      });
    }

    return (
      <div>
        <h3>{this.props.formType}</h3>

        <ul>{errors}</ul>

        <form onSubmit={this.handleSubmit}>
          Username:
          <input type='text' onChange={this.handleInput('username')} value={this.state.username}/>
          Password:
          <input type='password' onChange={this.handleInput('password')} value={this.state.password}/>
          <input type='submit' value={this.props.formType}/>
        </form>

        <Link to={otherFormPath} value={otherFormValue}/>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const loggedIn = state.session.currentUser ? true : false;
  const formType = ownProps.location.pathname === '/login' ? 'Log In' : 'Sign Up';
  return {
    loggedIn: loggedIn,
    errors: state.session.errors,
    formType
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const action = ownProps.location.pathname === '/login' ? login : signup;
  return {
    processForm: (user) => dispatch(action(user)),
    clearErrors: () => dispatch(clearErrors())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
