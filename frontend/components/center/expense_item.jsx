import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import { debtRelationship, objectToArray } from '../../reducers/selectors';
import { updateBill, deleteBill } from '../../actions/bill_actions';

class ExpenseItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetching: true,
      showDetails: false,
      // TODO: dropdown for more detail on a bill
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.toggleDetails = this.toggleDetails.bind(this);
  }

  expenseDetails() {
    const bill = this.props.bill;
    if (this.state.showDetails) {
      let details = "";
      details = (
        <div className="expense-details">
            <div className="details-section">
              <h6>Category:</h6>
              <p className="category">{bill.category}</p>
            </div>
            <div className="details-section">
              <h6>Description:</h6>
              <p className="full-description">sdfjalsgjablkghbdaskrgjhdsrikghbdfgkksadh dfjgnbsl jgbearkjghbrklghdbfkhdfbkadshjgbdfklgbhajhbalkgjba,gkjgbkjrbflkhvldfkjfn akgbhlkjfbkljb</p>
            </div>
            <div className="details-section">
              <h6>Notes:</h6>
              <p className="bill-notes">{bill.notes}</p>
            </div>
        </div>
      );

      return (
          <ReactCSSTransitionGroup component="div"
            transitionName='expense-detail-dropdown'
            transitionEnterTimeout={150}
            transitionLeaveTimeout={150}>
            {details}
          </ReactCSSTransitionGroup>
      );
    } else {
      return null;
    }
  }

  handleDelete(id) {
    return (e) => {
      e.stopPropagation();
      this.props.deleteBill(id);
    };
  }

  handleInput(property) {
    return (e) => {
      this.setState({[property]: e.currentTarget.value});
    };
  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.validateShareSum()) {
      const {category, description, total, date, notes} = this.state;
      const shares = this.formatShareData(this.state.shares);
      this.props.addBill({ category, description, total, date, notes }, shares);
      this.clearAndClose();
    } else {
      return null;
    }
  }

  // mapDebtsToDetails(debts) {
  //   return Object.values(debts).map((debt) => {
  //     let debtorName, creditorName;
  //     if (debt.debtor_id === this.props.currentUser.id) {
  //       debtorName = this.props.currentUser.name;
  //       creditorName = this.props.friends[debt.creditor_id].name;
  //     } else {
  //       debtorName = this.props.friends[debt.debtor_id].name;
  //       creditorName = this.props.currentUser.name;
  //     }
  //
  //     return (
  //       <div key={debt.id} className="expense-single-debt">
  //         <p>`${debtorName} owes ${creditorName} ${debt.amount}`</p>
  //       </div>
  //     );
  //   });
  // }

  message() {
    const {friends, debtDirection, debt} = this.props;
    if (isEmpty(friends)) { return null; }
    if (debtDirection === "debtor") {
      return `${friends[debt.creditor_id].name} lent you`;
    } else if (debtDirection === "creditor") {
      return `you lent ${friends[debt.debtor_id].name}`;
    } else {
      return null;
    }
  }

  toggleDetails() {
    this.setState({ showDetails: !this.state.showDetails });
  }

  render() {
    const {bill, debt, debtDirection} = this.props;
    const date = new Date(bill.date);
    const month = date.toLocaleDateString('en-US', {month: 'short'});
    const day = date.toLocaleDateString('en-US', {day: 'numeric'});
    return (
      <div>
        <div className="expense-item" onClick={this.toggleDetails}>
          <summary>
            <div className="expense-detail date">
              <div className="month">{month}</div>
              <div className="day">{day}</div>
            </div>
            <div className="expense-detail description">{bill.description}</div>
          </summary>

          <summary>
            <div className="cost">
              <div className="paid">
                <h6>Paid</h6>
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
        {this.expenseDetails()}
      </div>

    );
  }
}
// TODO: hover over expense-item to cause delete button to appear

const mapStateToProps = (state, ownProps) => {
  let debtDirection;
  if (state.session.currentUser) {
    debtDirection = debtRelationship(state.session.currentUser.id, ownProps.debt.debtor_id);
  } else { debtDirection = null; }
  return {
    friends: state.friends,
    currentUser: state.session.currentUser,
    debtDirection
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateBill: (bill, shares) => dispatch(updateBill(bill, shares)),
    deleteBill: (id) => dispatch(deleteBill(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseItem);
