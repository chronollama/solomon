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

// <div className="testclass" id="testclass-center-panel">
//   <div className="testclass" id="testclass-center-panel-header">
//     <h6>center panel header</h6>
//   </div>
//   <h6>CenterPanelComp</h6>
//   <div className="testclass" id="testclass-center-panel-item">
//     <h6>CenterPanelItem</h6>
//   </div>
//   <div className="testclass" id="testclass-center-panel-item">
//     <h6>CenterPanelItem</h6>
//   </div>
//     <div className="testclass" id="testclass-center-panel-item">
//       <h6>CenterPanelItem</h6>
//     </div>
// </div>

// if (props.displayType === '/dashboard')
//
// return (
//   <div>
//
//   </div>
// );

export default CenterPanel;
