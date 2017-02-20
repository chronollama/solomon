import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getFriend } from '../../actions/friend_actions';

class FriendDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetching: true
    };
  }

  componentDidMount() {
    this.props.getFriend(this.props.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.friends) {
      this.setState({fetching: false});
    }
  }

  friendHistory() {
    return null;
    // TODO grab transaction history with this specific friend to render below
  }

  // currentMonthYear() {
  //   const date = new Date();
  //   return date.toLocaleDateString('en-US', {month: 'long', year: 'numeric'});
  // <aside>{this.currentMonthYear()}</aside>
  // }

  render() {
    const friend = this.props.friends[this.props.params.id];
    if (this.state.fetching) {
      return null;
    }

    return (
      <div className="center-panel">
        <header>
          <h2>{friend.name}</h2>
          <div>
            <button id='add-bill-btn' className='btn btn-signup'>Add a bill</button>
            <button id='settle-btn' className='btn btn-login'>Settle up</button>
          </div>
        </header>


        <section className="center-panel-items">
          friendHistoryComponent
          {this.friendHistory}
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    friends: state.friends
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getFriend: (id) => dispatch(getFriend(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(FriendDetails));