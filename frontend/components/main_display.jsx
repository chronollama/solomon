import React from 'react';
import LeftSidebar from './sidebars/left_sidebar';
import CenterPanel from './center/center_panel';

const MainDisplay = (props) => {
  return(
    <div className="full-display-container">
      <LeftSidebar/>
      <CenterPanel/>
      <div className="testclass" id="testclass-right-sidebar">
        <h6>RightSidebarComp</h6>
      </div>
    </div>
  );
};

export default MainDisplay;
