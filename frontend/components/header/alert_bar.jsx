import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import { clearErrors as clearSessionErrors } from '../../actions/session_actions';
import { clearErrors as clearBillErrors } from '../../actions/error_actions';

class AlertBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownActive: false
    };
    this.dismissAlert = this.dismissAlert.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors.length > 0 || newProps.billErrors.length > 0) {
      this.setState({dropdownActive: true});
    }
  }

  dismissAlert() {
    this.setState({dropdownActive: false});
    this.props.clearSessionErrors();
    this.props.clearBillErrors();
  }

  render() {
    let message;
    if (this.state.dropdownActive) {
      if (this.props.errors.length > 0) {
        message = (
          <div className="alert-message error-message">
            <h5>Whoops! We couldn&#39;t find an account for that email address and password.
            Maybe you&#39;ve forgotten your password?</h5>
            <button onClick={this.dismissAlert}><i className="fa fa-times" aria-hidden="true"></i></button>
          </div>
        )
      } else if (this.props.billErrors.length > 0) {
        message = (
          <div className="alert-message error-message">
            <h5>{
              this.props.billErrors.map((err) => {
                return <div>{err}</div>
              })
            }</h5>
            <button onClick={this.dismissAlert}><i className="fa fa-times" aria-hidden="true"></i></button>
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
    } else {
      return null;
    }
  }
}

const mapStateToProps = state => {
  return {
    errors: state.session.errors,
    billErrors: state.errors
  }
}

const mapDispatchToProps = dispatch => {
  return {
    clearSessionErrors: () => dispatch(clearSessionErrors()),
    clearBillErrors: () => dispatch(clearBillErrors())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AlertBar);
