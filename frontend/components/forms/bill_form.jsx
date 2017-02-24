import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { addBill, updateBill } from '../../actions/bill_actions';
import { receiveBillErrors } from '../../actions/error_actions';
import Share from './share';
import AlertBar from '../header/alert_bar';

class BillForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: 'General',
      description: '',
      total: '',
      date: this.formatDate(new Date()),
      notes: '',

      shares: [
        {id: this.props.currentUser.id, name: this.props.currentUser.name, amount: ''},
        {id: null, name: '', amount: ''}
      ]
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateShare = this.updateShare.bind(this);
    this.removeShare = this.removeShare.bind(this);
    this.addShare = this.addShare.bind(this);
    this.clearAndClose = this.clearAndClose.bind(this);
  }

  componentWillMount() {
    Modal.setAppElement('body');
  }

  handleInput(property) {
    return (e) => {
      this.setState({[property]: e.currentTarget.value});
    };
  }

  handleSelect(e) {
    this.setState({category: e.currentTarget.value});
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

  validateShareSum() {
    let valid = true;
    let sum = 0;
    this.state.shares.forEach((share) => {
      sum = sum + Number(share.amount)
    })
    if (sum !== Number(this.state.total)) {
      valid = false;
      this.props.receiveBillErrors(["Individual shares must add up to the bill total."]);
    }
    return valid;
  }

  formatShareData(shares) {
    const formattedShares = {};
    shares.forEach((share) => {
      Object.assign(formattedShares, {[share.id]: share.amount});
    });
    return formattedShares;
  }

  clearAndClose() {
    this.props.closeBillForm();
    this.setState({
      category: 'General',
      description: '',
      total: '',
      date: this.formatDate(new Date()),
      notes: '',

      shares: [
        {id: this.props.currentUser.id, name: this.props.currentUser.name, amount: ''},
        {id: null, name: '', amount: ''}
      ]
    });
  }

  addShare() {
    const newShares = this.state.shares.slice();
    newShares.push({id: null, name: '', amount: ''});
    this.setState({shares: newShares});
  }

  removeShare(idx) {
    const newShares = Object.assign({}, this.state.shares);
    delete newShares[idx];
    this.setState({shares: newShares});
  }

  updateShare(shareData) {
    const {idx, id, name, amount} = shareData;
    let newShares = this.state.shares.slice();
    newShares[idx] = {id, name, amount};
    this.setState({shares: newShares});
  }

  formatDate(date) {
    const year = date.getFullYear();
    let month = (date.getMonth() + 1).toString();
    let day = date.getDate().toString();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return `${year}-${month}-${day}`;
  }

  categorySelect() {
    const categories = ["General", "Entertainment", "Food", "Home", "Life", "Transportation", "Utilities"];
    const options = categories.map((category, idx) => {
      return (
        <option key={idx} value={category}>
          {category}
        </option>
      );
    });

    return (
      <select value={this.state.category} onChange={this.handleInput("category")}>
        {options}
      </select>
    );
  }

  handleShares(idx, property) {
    return (e) => {
      let newShares = Object.assign({}, this.state.shares);
      newShares[idx] = Object.assign(newShares[idx], {[property]: e.currentTarget.value});
      this.setState({shares: newShares});
    };
  }

  renderShares() {
    const billShares = this.state.shares.map((share, idx) => {
      if (idx === 0) {
        const {currentUser} = this.props;
        return (
          <li key={idx}>
            <Share id={currentUser.id} name={currentUser.name} amount={share.amount} idx={idx}
              updateShare={this.updateShare} />
          </li>
        );
      }

      return (
        <li key={idx}>
          <Share id={share.id} name={share.name} amount={share.amount} idx={idx}
            updateShare={this.updateShare} removeShare={this.removeShare}/>
        </li>
      );
    });
    return <ul>{billShares}</ul>;
  }

  alertBar() {
    if (this.props.errors.length > 0) {
      return <AlertBar />
    } else {
      return null;
    }
  }

  render() {
    return (
      <Modal isOpen={this.props.open}
        className="form-modal large-modal"
        overlayClassName="form-modal-overlay"
        onRequestClose={this.clearAndClose}
        contentLabel="Bill Form">

        <form className="bill-form">
          {this.alertBar()}
          <div className="bill-input">
            <h2>Add Bill</h2>
            <div>
              <div className="bill-left">
                <div className="category"><p>Category</p>{this.categorySelect()}</div>

                <div>
                  <p>Date</p>
                  <input id="date-input" type="date"
                    value={this.state.date} onChange={this.handleInput("date")}/>
                </div>

              </div>

              <div className="bill-center">
                <div>
                  <input className="description" type="text" placeholder="Description"
                    onChange={this.handleInput("description")} value={this.state.description}/>
                </div>

                <div>
                  <span className="currency">$</span>
                  <input className="amount" type="number" min="0" placeholder="0.00"
                    onChange={this.handleInput("total")} value={this.state.total}/>
                </div>
              </div>
            </div>

            <div>
              <textarea value={this.state.notes} placeholder="Notes"
                onChange={this.handleInput("notes")}/>
            </div>
            <button className="btn btn-login" onClick={this.handleSubmit}>Save</button>
          </div>

          <div className="shares-input bill-right">
            <h2>Choose Payer</h2>
            {this.renderShares()}
            <div className="add-share">
              <button onClick={this.addShare}>Add person</button>
            </div>
          </div>

        </form>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.session.currentUser,
    errors: state.errors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addBill: (bill, shares) => dispatch(addBill(bill, shares)),
    updateBill: (bill, shares) => dispatch(updateBill(bill, shares)),
    receiveBillErrors: (err) => dispatch(receiveBillErrors(err))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BillForm);
