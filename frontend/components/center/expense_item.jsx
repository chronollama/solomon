import React from 'react';
import { connect } from 'react-redux';
import { debtDirection } from '../../reducers/selectors';
import { updateBill, deleteBill } from '../../actions/bill_actions';

class ExpenseItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

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
    const date = new Date(bill.date).toLocaleDateString('en-US', {month: 'short', day: 'numeric'});
    return (
      <div className="expense-item">
        <summary>
          <div id="asdf" className="expense-detail date">{date}</div>
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

          <button className="delete-expense">
            <i className="fa fa-times" aria-hidden="true"></i>
          </button>
        </summary>
      </div>
    );
  }
}
// TODO: red delete button for expense items

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
