import React from 'react';
import FriendDetails from './friend_details';
import ExpenseIndex from './expense_index';

const componentToRender = (displayType) => {
  switch (displayType) {
    case '/dashboard':
      return (<p>Dashboard</p>);
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
