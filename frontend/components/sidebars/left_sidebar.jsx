import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import FriendsList from './friends_list';
// import GroupsList from './groups_list';

const LeftSidebar = () => {
  return (
    <nav id="left-sidebar">
      <Link to="/dashboard"><div>
        <i className="fa fa-home" aria-hidden="true"></i>Dashboard
      </div></Link>
      <Link to="/expenses"><div>
        <i className="fa fa-list" aria-hidden="true"></i>All expenses
      </div></Link>
      <FriendsList />
    </nav>
  );
};

export default LeftSidebar;
