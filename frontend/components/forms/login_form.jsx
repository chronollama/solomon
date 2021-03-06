import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import { login, receiveErrors } from '../../actions/session_actions';
import { hashHistory } from 'react-router';

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
      () => hashHistory.push('/expenses'),
      (err) => receiveErrors(err)
    );
  }

  render() {
    return (
      <div className="wrapper">
        <div className="form-container-large">
          <a className="logo-large" href="/" value></a>

          <div className="content-block login-large">

            <div>WELCOME TO SOLOMON</div>

            <form className="form-large" onSubmit={this.handleSubmit}>

              <div className="login-label">
                Email address
              </div>
              <input className="login-field input-text" type="text"
                onChange={this.handleInput("email")} value={this.state.email}/>

              <div className="login-label">
                Password
              </div>
              <input className="login-field input-text" type="password"
                onChange={this.handleInput("password")} value={this.state.password}/>

              <div>
                <input id="btn-login-large" className="btn btn-large" type="submit" value="Log in"/>
              </div>
            </form>

          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    errors: state.session.errors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: (user) => dispatch(login(user)),
    receiveErrors: (err) => dispatch(receiveErrors(err))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
