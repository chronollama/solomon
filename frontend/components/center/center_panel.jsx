import React from 'react';

const CenterPanel = (props) => {
  return (
    <div className="testclass" id="testclass-center-panel">
      <div className="testclass" id="testclass-center-panel-header">
        <h6>center panel header</h6>
      </div>
      <h6>CenterPanelComp</h6>
      <div className="testclass" id="testclass-center-panel-item">
        <h6>CenterPanelItem</h6>
      </div>
      <div className="testclass" id="testclass-center-panel-item">
        <h6>CenterPanelItem</h6>
      </div>
        <div className="testclass" id="testclass-center-panel-item">
          <h6>CenterPanelItem</h6>
        </div>
    </div>


  );
};

// switch(this.props.displayType) {
//   case '/activity':
//   case '/all':
//   case '/friend':
//   default: (dashboard)
// }
// displayType: ownProps.params.displayType


export default CenterPanel;
