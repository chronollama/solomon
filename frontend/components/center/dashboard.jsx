import React from 'react';
import { connect } from 'react-redux';
import { myCredits, myDebts } from '../../reducers/selectors';
import BillForm from '../forms/bill_form';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetching: true,
      showBillForm: false
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
    return this.props.myCredits.map((credit) => {
      return (
        <li key={credit.id} className="credit-item">
          <p>{friends[credit.id].name}</p>
          <p>owes you {credit.amount}</p>
        </li>
      );
    });
  }

  listDebts() {
    return this.props.myDebts.map((debt) => {
      const friends = this.props.friends;
      return (
        <li key={debt.id} className="debt-item">
          <p>You owe {friends[debt.id].name}</p>
          <p>{debt.amount}</p>
        </li>
      );
    });
  }

  render() {
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
          <div>Total balance</div>
          <div>You owe</div>
          <div>You are owed</div>
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
