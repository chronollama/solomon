import React from 'react';
import FriendDetails from './friend_details';

// class CenterPanel extends React.Component {
//   constructor(props) {
//     super(props);
//   }
//
//
// }

const CenterPanel = (props) => {
  const {displayType} = props;
  if (displayType === '/dashboard') {
    return (<p>Dashboard</p>);
  } else if (displayType === '/activity') {
    return (<p>Recent activity</p>);
  } else if (displayType === '/expenses') {
    return (<p>All expenses</p>);
  } else if (displayType === '/friends/:id') {
    return (<FriendDetails />);
  }
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


// switch(this.props.displayType) {
//   case '/activity':
//   case '/all':
//   case '/friend':
//   default: (dashboard)
// }
// displayType: ownProps.params.displayType


export default CenterPanel;
