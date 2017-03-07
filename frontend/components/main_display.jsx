import React from 'react';
import LeftSidebar from './sidebars/left_sidebar';
import CenterPanel from './center/center_panel';
import RightSidebar from './sidebars/right_sidebar';

const MainDisplay = (props) => {
  return(
    <div className="full-display-container">
      <LeftSidebar/>
      <CenterPanel displayType={props.route.path}/>
      <RightSidebar displayType={props.route.path} friendId={props.params.id}/>
    </div>
  );
};

export default MainDisplay;
