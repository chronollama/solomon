import React from 'react';
import { connect } from 'react-redux';
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
    
  }

  listDebts() {

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

        <main className="dashboard-main">
          <div><h2>You owe</h2><h2>You are owed</h2></div>
          <ul className="list-debts">
            {this.listDebts()}
          </ul>

          <ul className="list-credits">
            {this.listCredits()}
          </ul>
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {

  };
};

const mapDispatchToProps = dispatch => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
