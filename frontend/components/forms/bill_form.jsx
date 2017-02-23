import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { addBill, updateBill } from '../../actions/bill_actions';
import Share from './share';

class BillForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: 'General',
      description: '',
      total: '',
      date: new Date(),
      notes: '',

      shares: [
        {id: this.props.currentUser.id, name: this.props.currentUser.name, amount: ''},
        {id: null, name: '', amount: ''},
      ]
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    this.updateShare = this.updateShare.bind(this);
    this.removeShare = this.removeShare.bind(this);
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

  // handleSubmit(e) {
  //   e.preventDefault();
  //
  //
  //   this.props.addBill();
  // }

  addShare() {
    const newShares = Object.assign({}, this.state.shares);
    newShares.push({id: null, name: '', amount: ''});
    this.setState({shares: newShares});
  }

  removeShare(idx) {
    const newShares = Object.assign({}, this.state.shares);
    delete newShares[idx];
    this.setState({shares: newShares});
  }

  updateShare(shareData) {
    const {idx, id, amount} = {shareData};
    let newShares = Object.assign({}, this.state.shares);
    newShares[idx] = {[id]: amount};
    this.setState({shares: newShares});
  }

  formatDate() {
    const year = this.state.date.getFullYear();
    let month = (this.state.date.getMonth() + 1).toString();
    let day = this.state.date.getDate().toString();

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
      <select value={this.state.category} onChange={this.handleSelect}>
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
    const shares = this.state.shares.map((share, idx) => {
      return (
        <li key={idx}>
          <Share id={share.id} name={share.name} amount={share.amount} idx={idx}
            updateShare={this.updateShare} removeShare={this.removeShare}/>
        </li>
      );
    });
    return <ul>{shares}</ul>;
  }

  render() {
    return (
      <Modal isOpen={this.props.open}
        className="invite"
        overlayClassName="invite-overlay"
        contentLabel="Bill Form">

        <form className="bill-form">
          <h2>Add Bill</h2>
          <div>
            {this.categorySelect()}
            <input type="date" defaultValue={this.formatDate()}/>
          </div>

          <div>
            <input type="text" placeholder="Description"
              onChange={this.handleInput("description")} value={this.state.description}/>

            <span className="currency">$</span>
            <input type="number" placeholder="0.00"
              onChange={this.handleInput("total")} value={this.state.total}/>

            <textarea value={this.state.notes} placeholder="Notes"
              onChange={this.handleInput("notes")}/>
          </div>

          <div>
            {this.renderShares()}
          </div>
        </form>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.session.currentUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addBill: (bill, shares) => dispatch(addBill(bill, shares)),
    updateBill: (bill, shares) => dispatch(updateBill(bill, shares))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BillForm);
