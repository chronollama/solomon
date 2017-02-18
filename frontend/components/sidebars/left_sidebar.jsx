import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
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
        <Link to="/dashboard"><div>Dashboard</div></Link>
        <Link to="/activity"><div>Recent activity</div></Link>
        <Link to="/all"><div>All expenses</div></Link>
        <FriendsList />
      </nav>
    );
  }
}

export default LeftSidebar;
