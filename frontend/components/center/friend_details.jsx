import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getFriend } from '../../actions/friend_actions';
import ExpenseIndex from './expense_index';

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

    if (newProps.friends) { this.setState({fetching: false}); }
    if (newProps.params.id !== this.props.params.id) {
      this.props.getFriend(newProps.params.id);
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
      <ExpenseIndex friend={friend}/>
    );
  }
}

// <div>
//   <header>
//     <h2>{friend.name}</h2>
//     <div>
//       <button id='add-bill-btn' className='btn btn-signup'>Add a bill</button>
//       <button id='settle-btn' className='btn btn-login'>Settle up</button>
//     </div>
//   </header>
//
//
//   <section className="center-panel-items">
//     Transactions and bills with this friend
//     {this.friendHistory}
//   </section>
// </div>

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
