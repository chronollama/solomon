import React from 'react';
import { connect } from 'react-redux';
import { myCredits, myDebts } from '../../reducers/selectors';

class RightSidebar extends React.Component {
  summaryTitle() {
    switch (this.props.displayType) {
      case '/expenses':
        return <h2>YOUR TOTAL BALANCE</h2>;
      case '/friends/:id':
        return <h2>YOUR BALANCE</h2>;
      default:
        return null;
    }
  }

  buttons() {
    switch (this.props.displayType) {
      case '/expenses':
        return (
          <div className="right-btns">
            <button><i className="fa fa-align-justify" aria-hidden="true"></i></button>
            <button><i className="fa fa-calendar" aria-hidden="true"></i></button>
            <button><i className="fa fa-line-chart" aria-hidden="true"></i></button>
          </div>
        );
      case '/friends/:id':
        return (
          <div className="right-btns">
            <button alt="Balances"><i className="fa fa-align-justify" aria-hidden="true"></i></button>
            <button alt="Upcoming bills"><i className="fa fa-calendar" aria-hidden="true"></i></button>
            <button alt="Trends"><i className="fa fa-line-chart" aria-hidden="true"></i></button>
            <button alt="Settings"><i className="fa fa-cog" aria-hidden="true"></i></button>
          </div>
        );
      default:
        return null;
    }
  }

  content() {
    let balance;
    const total = this.sumTotal();
    if (total > 0) { balance = "credit"; }
    else if (total < 0) { balance = "debt"; }
    else balance = "settled";

    if (this.props.displayType === '/expenses') {
      return <p className={`net ${balance}`}>${this.sumTotal()}</p>;
    }

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

  sumCredits() {
    let centSum = 0;
    this.props.myCredits.forEach((credit) => {
      centSum += credit.amount.slice(1) * 100;
    });
    return centSum / 100;
  }

  sumDebts() {
    let centSum = 0;
    this.props.myDebts.forEach((debt) => {
      centSum += debt.amount.slice(1) * 100;
    });
    return centSum / 100;
  }

  sumTotal() {
    return (parseInt(this.sumCredits() * 100) - parseInt(this.sumDebts() * 100)) / 100;
  }

  render() {
    return (
      <nav id="right-sidebar">

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
    friend,
    myCredits: myCredits(state.friends),
    myDebts: myDebts(state.friends)
  };
};

export default connect(mapStateToProps, null)(RightSidebar);
