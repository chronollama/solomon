import React from 'react';
import { connect } from 'react-redux';
import { addBill, updateBill } from '../../actions/bill_actions';
import { searchFriends } from '../../actions/search_actions';
import Modal from 'react-modal';

class BillForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: '',
      description: '',
      total: '',
      date: Date.now(),
      // TODO new Datenow?
      notes: '',
      bill_shares: null
      // TODO best way to pass up bill_shares?
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput(property) {
    return (e) => {
      this.setState({[property]: e.currentTarget.value});
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const bill = Object.assign({}, this.state);
    delete bill[bill_shares];
    this.props.addBill();
  }

  defaultDate() {
    const date = new Date();
    const year = date.getFullYear();
    let month = (date.getMonth() + 1).toString();
    let day = date.getDate().toString();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return `${year}-${month}-${day}`;
  }


  render() {
    return (
      <form className="testclass">
        <label>With you and:
          <input type="text"></input>
        </label>
        <input type="text" placeholder="Enter a description"
          onChange={this.handleInput("description")} value={this.state.description}/>
        <input type="number" placeholder="0.00"
          onChange={this.handleInput("total")} value={this.state.total}/>
        <input type="date" defaultValue={this.defaultDate()}/>
        <input type="text" placeholder="Add notes"
          onChange={this.handleInput("notes")} value={this.state.notes}/>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    search: state.search
  };
};

const mapDispatchToProps = dispatch => {
  return {
    searchFriends: (query) => dispatch(searchFriends(query))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BillForm);
