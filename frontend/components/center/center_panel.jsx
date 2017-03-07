import React from 'react';
import Dashboard from './dashboard';
import ExpenseIndex from './expense_index';
import FriendDetails from './friend_details';

const componentToRender = (displayType) => {
  switch (displayType) {
    case '/dashboard':
      return (<Dashboard/>);
    case '/activity':
      return (<p>Recent activity</p>);
    case '/expenses':
      return (<ExpenseIndex/>);
    case '/friends/:id':
      return (<FriendDetails/>);
  }
};

const CenterPanel = (props) => {
  return (
    <div className="center-panel">
      {componentToRender(props.displayType)}
    </div>
  );
};

export default CenterPanel;
