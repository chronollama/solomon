import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { myCredits, myDebts } from '../../reducers/selectors';
import BillForm from '../forms/bill_form';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetching: true,
      showBillForm: false,
      balance: "neutral"
    };
    this.openBillForm = this.openBillForm.bind(this);
    this.closeBillForm = this.closeBillForm.bind(this);
  }

  openBillForm() {
    this.setState({showBillForm: true});
  }

  closeBillForm() {
    this.setState({showBillForm: false});
  }

  listCredits() {
    const friends = this.props.friends;
    let sum = 0;
    return this.props.myCredits.map((credit) => {
      return (
        <Link to={`/friends/${credit.id}`} key={credit.id}>
          <li key={credit.id} className="credit-item">
            <p>{friends[credit.id].name}</p>
            <p className="credit">owes you {credit.amount}</p>
          </li>
        </Link>
      );
    });
  }

  listDebts() {
    return this.props.myDebts.map((debt) => {
      const friends = this.props.friends;
      return (
        <Link to={`/friends/${debt.id}`} key={debt.id}>
          <li key={debt.id} className="debt-item">
            <p>{friends[debt.id].name}</p>
            <p className="debt">you owe {debt.amount}</p>
          </li>
        </Link>
      );
    });
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
    let balance;
    const total = this.sumTotal();
    if (total > 0) { balance = "credit"; }
    else if (total < 0) { balance = "debt"; }
    else balance = "settled";

    return (
      <div>
        <header className="dashboard-header">
          <h2>Dashboard</h2>
          <div className="center-header-btns">
            <button id='add-bill-btn' className='btn btn-signup'
              onClick={this.openBillForm}>Add a bill</button>
            <BillForm open={this.state.showBillForm}
              closeBillForm={this.closeBillForm}/>
            <button id='settle-btn' className='btn btn-login'>
              Settle up</button>
          </div>
        </header>
        <div className="dashboard-summary">
          <div>Total balance<p className={balance}>${this.sumTotal()}</p></div>
          <div>You owe<p className="debt">${this.sumDebts()}</p></div>
          <div>You are owed<p className="credit">${this.sumCredits()}</p></div>
        </div>

        <div className="list-titles">
          <h2>You owe</h2>
          <h2>You are owed</h2>
        </div>
        <main className="dashboard-main">
          <ul className="debts dashboard-list">
            {this.listDebts()}
          </ul>

          <ul className="credits dashboard-list">
            {this.listCredits()}
          </ul>
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    friends: state.friends,
    myCredits: myCredits(state.friends),
    myDebts: myDebts(state.friends)
  };
};

const mapDispatchToProps = dispatch => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
