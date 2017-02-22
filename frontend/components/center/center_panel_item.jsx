import React from 'react';
import { connect } from 'react-redux';

const CenterPanelItem = (props) => {
  if (props.itemType === 'bill') {

  }

  return (
    <div className="expense-item">
      <div className="expense-overview">

      </div>
      <div className="expense">
        <div className="paid"></div>
        <div className="lent"></div>
      </div>
    </div>
  );
};
