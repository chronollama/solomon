import React from 'react';

class AlertBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  dismissAlert() {

  }

  render() {
    
  }
}

showErrors() {
  let errors;
  if (this.props.errors.length !== 0) {
    errors = (
      <div className="alert-bar">
        <h6>Whoops! We couldn&#39;t find an account for that email address and password.
        Maybe you&#39;ve forgotten your password?</h6>
      </div>
    )
  } else {
    errors = '';
  }

  return (
    <div id='login-btn-container'>
      <button className='btn btn-login'
        onClick={this.toggleDropdown}>Log in
      </button>
      <ReactCSSTransitionGroup component="div"
        transitionName='dropdown'
        transitionEnterTimeout={150}
        transitionLeaveTimeout={150}>
        {errors}
      </ReactCSSTransitionGroup>
    </div>
  );
}
