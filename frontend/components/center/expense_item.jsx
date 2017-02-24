import React from 'react';
import { connect } from 'react-redux';
import { debtDirection, objectToArray } from '../../reducers/selectors';
import { updateBill, deleteBill } from '../../actions/bill_actions';

class ExpenseItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      // TODO: dropdown for more detail on a bill
    };
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(id) {
    return (e) => {
      this.props.deleteBill(id);
    };
  }

  message() {
    const {friends, debtDirection, debt} = this.props;
    if (debtDirection === "debtor") {
      return `${friends[debt.creditor_id].name} lent you`;
    } else {
      return `you lent ${friends[debt.debtor_id].name}`;
    }
  }

  render() {
    const {bill, debt, debtDirection} = this.props;
    const date = new Date(bill.date);
    const month = date.toLocaleDateString('en-US', {month: 'short'});
    const day = date.toLocaleDateString('en-US', {day: 'numeric'});
    return (
      <div className="expense-item">
        <summary>
          <div className="expense-detail date">
            <div className="month">{month}</div>
            <div className="day">{day}</div>
          </div>
          <div className="expense-detail category">{bill.category}</div>
          <div className="expense-detail description">{bill.description}</div>
        </summary>

        <summary>
          <div className="cost">
            <div className="paid">
              <h6>Total</h6>
              <div>{bill.paid}</div>
            </div>

            <div className="lent">
              <h6>{this.message()}</h6>
              <div className={this.props.debtDirection}>{debt.amount}</div>
            </div>
          </div>

          <button className="delete-expense" onClick={this.handleDelete(bill.id)}>
            <i className="fa fa-times" aria-hidden="true"></i>
          </button>
        </summary>
      </div>
    );
  }
}
// TODO: hover over expense-item to cause delete button to appear

const mapStateToProps = (state, ownProps) => {
  return {
    friends: state.friends,
    debtDirection: debtDirection(state.session.currentUser.id, ownProps.debt.debtor_id)
  };
};


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    deleteBill: (id) => dispatch(deleteBill(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseItem);
