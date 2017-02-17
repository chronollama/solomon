import React from 'react';
import { connect } from 'react-redux';
import FriendsList from './friends_list';
// import GroupsList from './groups_list';

class LeftSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <nav id="left-sidebar">
        <div>Dashboard</div>
        <div>Recent activity</div>
        <div>All expenses</div>
        <FriendsList />
      </nav>
    );
  }
}

export default LeftSidebar;
