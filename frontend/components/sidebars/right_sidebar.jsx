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
      // case '/expenses':
      //   return (
      //     <div className="right-btns">
      //       <button><i className="fa fa-align-justify" aria-hidden="true"></i></button>
      //       <button><i className="fa fa-calendar" aria-hidden="true"></i></button>
      //       <button><i className="fa fa-line-chart" aria-hidden="true"></i></button>
      //     </div>
      //   );
      // case '/friends/:id':
      //   return (
      //     <div className="right-btns">
      //       <button alt="Balances"><i className="fa fa-align-justify" aria-hidden="true"></i></button>
      //       <button alt="Upcoming bills"><i className="fa fa-calendar" aria-hidden="true"></i></button>
      //       <button alt="Trends"><i className="fa fa-line-chart" aria-hidden="true"></i></button>
      //       <button alt="Settings"><i className="fa fa-cog" aria-hidden="true"></i></button>
      //     </div>
      //   );
      default:
        return null;
    }
  }
  // TODO: show tooltip text on hover over buttons
  content() {
    let net;
    if (this.props.friend) { net = this.props.friend.net; }
    if (net) {
      if (net.status === "debtor") {
        return  (
          <div>
            <p className="debt">You owe {this.props.friend.name}</p>
            <p className="debt net">{net.amount}</p>
          </div>
        );

      } else if (net.status === "creditor") {
        return (
          <div>
            <p className="credit">{this.props.friend.name} owes you</p>
            <p className="credit net">{net.amount}</p>
          </div>
        );
      } else {
        return <p>You are all settled up</p>;
      }
    }
  }

  render() {
    return (
      <nav id="right-sidebar">
        {this.buttons()}

        <div className="right-summary">
          {this.summaryTitle()}
          {this.content()}
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let friend;
  if (ownProps.friendId) { friend = state.friends[ownProps.friendId]; }
  return {
    friend
  };
};

export default connect(mapStateToProps, null)(RightSidebar);
