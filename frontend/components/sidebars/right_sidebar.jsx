import React from 'react';
import { connect } from 'react-redux';

class RightSidebar extends React.Component {
  summaryTitle() {
    switch (this.props.displayType) {
      case '/expenses':
        return (<h2>YOUR TOTAL BALANCE</h2>);
      case '/friends/:id':
        return (<h2>YOUR BALANCE</h2>);
      default:
        return (<h2>SHAMELESS SELF-PROMOTION</h2>);
    }
  }

  buttons() {
    switch (this.props.displayType) {
      case '/expenses':
        return (
          <div className="right-btns">
            <button>1</button>
            <button>2</button>
            <button>3</button>
          </div>
        );
      case '/friends/:id':
        return (
          <div className="right-btns">
            <button>1</button>
            <button>2</button>
            <button>3</button>
            <button>4</button>
          </div>
        );
      default:
        return (<h2>NO BUTTONS</h2>);
    }
  }

  render() {
    return (
      <nav id="right-sidebar">
        {this.buttons()}

        <div className="right-summary">
          {this.summaryTitle()}

        </div>
      </nav>
    );
  }
}

export default RightSidebar;
