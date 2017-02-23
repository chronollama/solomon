import React from 'react';
import { connect } from 'react-redux';
import { getBills, deleteBill } from '../../actions/bill_actions';
import { objectToArray } from '../../reducers/selectors';
import ExpenseItem from './expense_item';
import BillForm from '../forms/bill_form';

class ExpenseIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetching: true,
      showBillForm: true
      // TODO: change showBillForm to false when done testing
    };
    this.openBillForm = this.openBillForm.bind(this);
  }

  componentDidMount() {
    this.props.getBills().then(this.setState({fetching: false}));
  }

  openBillForm() {
    this.setState({showBillForm: true});
  }

  mapDebtsToItems(bill) {
    const debts = bill.debts;
    return Object.keys(debts).map((debtId) => {

      if (this.props.friend) {
        const friend = this.props.friend;
        if (debts[debtId].debtor_id === friend.id || debts[debtId].creditor_id === friend.id) {
          return (
            <li className="expense bill">
              <ExpenseItem key={debtId} bill={bill} debt={debts[debtId]}/>
            </li>
          );
        } else {
          return null;
        }

      } else {
        return (
          <li className="expense bill">
            <ExpenseItem key={debtId} bill={bill} debt={debts[debtId]}/>
          </li>
        );
      }
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

    let headerContent = "All Expenses";
    if (this.props.friend) {
      headerContent = this.props.friend.name;
    }

    return (
      <div>
        <header>
          <h2>{headerContent}</h2>
          <div>
            <button id='add-bill-btn' className='btn btn-signup'
              onClick={this.openBillForm}>Add a bill</button>
            <BillForm open={this.state.showBillForm}/>
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

const mapStateToProps = (state, ownProps) => {
  return {
    bills: objectToArray(state.bills),
    friend: ownProps.friend
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getBills: () => dispatch(getBills())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseIndex);
