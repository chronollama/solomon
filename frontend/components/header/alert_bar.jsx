import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class AlertBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownActive: false
    };
    this.dismissAlert = this.dismissAlert.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.hidden === false) {
      this.setState({dropdownActive: true});
    }
  }

  dismissAlert() {
    this.setState({dropdownActive: false});
  }

  // TODO: get X icon from Font Awesome, fix font type and size
  render() {
    let message;
    if (this.state.dropdownActive) {
      message = (
        <div className="alert-message error-message">
          <h5>Whoops! We couldn&#39;t find an account for that email address and password.
          Maybe you&#39;ve forgotten your password?</h5>
          <button onClick={this.dismissAlert}>X</button>
        </div>
      )
    } else {
      message = '';
    }

    return (
      <div className='alert-bar'>
        <ReactCSSTransitionGroup component="div"
          transitionName='dropdown'
          transitionEnterTimeout={150}
          transitionLeaveTimeout={150}>
          {message}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

export default AlertBar;
