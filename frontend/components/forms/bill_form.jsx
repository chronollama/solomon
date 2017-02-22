import React from 'react';
import { connect } from 'react-redux';
import { addBill, updateBill } from '../../actions/bill_actions';
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
      bill_shares: []
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


  render() {
    return (
      <form>
        <label>With you and:
          <input type="text"></input>
        </label>
        <input type="text" placeholder="Enter a description"
          onChange={this.handleInput(description)}>this.state.description</input>
        <input type="text" placeholder="0.00"
          onChange={this.handleInput(total)}>this.state.total</input>
        <input type="text" placeholder="Add notes"
          onChange={this.handleInput(notes)}>this.state.notes</input>

      </form>
    );
  }
}

export default BillForm;
