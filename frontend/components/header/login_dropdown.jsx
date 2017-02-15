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
    // if (this.props.hidden) {
    //   return (
    //     <div></div>
    //   );
    // }

    const loginForm = (
      <div>
        <form key='login' onSubmit={this.handleSubmit}>
          <input type='text' onChange={this.handleInput('email')}
            value={this.state.email} placeholder='Email address'/>
          <input type='password' onChange={this.handleInput('password')}
            value={this.state.password} placeholder='Password'/>
          <input type='submit' value='Log in to Solomon'/>
        </form>
      </div>
    );

    return (
        <ReactCSSTransitionGroup component="form"
          transitionName="sliding-dropdown"
          transitionEnterTimeout={1000}
          transitionLeaveTimeout={1000}>
          {loginForm}
        </ReactCSSTransitionGroup>
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginDropdown);
