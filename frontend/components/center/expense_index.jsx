import React from 'react';
import { connect } from 'react-redux';
import { getBills, deleteBill } from '../../actions/bill_actions';
import ExpenseItem from './expense_item';
import { billsArray } from '../../reducers/selectors';

class ExpenseIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetching: true
    };
  }

  componentDidMount() {
    this.props.getBills().then(this.setState({fetching: false}));
  }

  mapDebtsToItems(bill) {
    return Object.keys(bill.debts).map((debtId) => {
      return (
        <li className="expense bill">
          <ExpenseItem key={debtId} bill={bill} debt={bill.debts[debtId]}/>
        </li>
      );
    });
  }

  render() {
    let items;
    if (this.state.fetching) {
      return null;
    } else {
      items = this.props.bills.map((bill) => {
        return this.mapDebtsToItems(bill);
      });
    }

    return (
      <div>
        <header>
          <h2>All Expenses</h2>
          <div className="asdf">
            <button id='add-bill-btn' className='btn btn-signup'>Add a bill</button>
            <button id='settle-btn' className='btn btn-login'>Settle up</button>
          </div>
        </header>

        <ul>
          {items}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const bills = (state.bills) ? billsArray(state.bills) : [];
  return {
    bills
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getBills: () => dispatch(getBills())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseIndex);
