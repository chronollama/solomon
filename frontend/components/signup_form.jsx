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
      (err) => receiveErrors(err)
    );
  }

  showErrors() {
    if (this.props.errors.length !== 0) {
      const errors = this.props.errors.map((error, idx) => {
        return (<li key={idx}>{error}</li>);
      });

      return (
        <div>
          <strong>The following errors occurred:</strong>
          <ul>{errors}</ul>
        </div>
      );
    } else {
      return (<div></div>);
  }
}

  render() {


    return (
      <div className='wrapper'>
        <div className='signup-container'>
          <div className='content-block'>

            <div>INTRODUCE YOURSELF</div>
            {this.showErrors()}

            <form className='signup-form' onSubmit={this.handleSubmit}>
              <div className='signup-label'>
                Hi there! My name is
              </div>
              <input className='input signup-field signup-name' type='text'
                onChange={this.handleInput('name')} value={this.state.name}/>

              <div className='signup-label'>
                Here's my <strong>email address:</strong>
              </div>
              <input className='input signup-field' type='text'
                onChange={this.handleInput('email')} value={this.state.email}/>

              <div className='signup-label'>
                And here's <strong>my password:</strong>
              </div>
              <input className='input signup-field' type='password'
                onChange={this.handleInput('password')} value={this.state.password}/>

              <div>
                <input className='btn btn-signup btn-large' type='submit' value='Sign me up!'/>
              </div>
            </form>

          </div>
        </div>
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
    receiveErrors: (err) => dispatch(receiveErrors(err))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
