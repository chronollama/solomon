import React from 'react';
import { connect } from 'react-redux';
import { searchFriends } from '../../actions/search_actions';
import { objectToArray } from '../../reducers/selectors';

class Share extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      name: this.props.name,
      amount: this.props.amount,
      email: '',
      showSearchList: false,
      confirmed: false
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.hideSearchList = this.hideSearchList.bind(this);
    this.fillInput = this.fillInput.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  hideSearchList() {
    this.setState({showSearchList: false});
  }

  fillInput(friend) {
    return (e) => {
      this.setState({id: friend.id, name: friend.name, email: friend.email});
    };
  }

  handleInput(property) {
    return (e) => {
      this.setState({[property]: e.currentTarget.value});
      if (property === 'name') {
        this.props.searchFriends(e.currentTarget.value);
        this.setState({showSearchList: true});
      }
    };
  }

  handleConfirm(e) {
    const search = this.props.search;
    if (this.state.id) {
      this.setState({confirmed: true});
      this.props.updateShare({
        id: this.state.id,
        name: this.state.name,
        amount: this.state.amount,
        idx: this.props.idx
      });
    } else if (search.length === 1 && this.state.name === search[0].name) {
      this.setState({id: search[0].id, confirmed: true});
      this.props.updateShare({
        id: this.state.id,
        name: this.state.name,
        amount: this.state.amount,
        idx: this.props.idx
      });
    } else {
      console.log("error message here");
    }
  }
  // TODO: return error message if invalid confirmation

  handleEdit(e) {
    e.preventDefault();
    this.setState({confirmed: false});
  }

  searchResults() {
    if (this.state.showSearchList) {
      let friends = <li>No results found</li>;

      if (this.props.search.length > 0) {
        friends = this.props.search.map((search) => {
          return (
            <li key={search.id} className="result" onClick={this.fillInput(search)}>
              <div className="result-name">{search.name}</div>
              <div className="result-email">{search.email}</div>
            </li>
          );
        });
      }
      return (
        <ul className="share-search-results">
          {friends}
        </ul>
      );

    } else {
      return null;
    }
  }

  nameInput() {
    if (this.props.currentUser.id === this.props.id) {
      return (
        <div className="current-user-name">{this.props.currentUser.name}</div>
      );
    } else {
      return (
        <input className="input-text" type="text" placeholder="Name"
          value={this.state.name} onChange={this.handleInput("name")}/>
      );
    }
  }

  render() {
    if (this.state.confirmed) {
      return (
        <div className="confirmed">
          <div className="confirmed-details">
            <p>{this.state.name}</p>
            <p>${this.state.amount}</p>
          </div>
          <button className="btn btn-login" onClick={this.handleEdit}>Edit</button>
          <button className="btn btn-signup" onClick={this.props.removeShare}>Remove</button>
        </div>
      );
    } else {
      return (
        <div className="unconfirmed" onClick={this.hideSearchList}>
          {this.nameInput()}
          {this.searchResults()}
          <div>
            <span className="currency">$</span>
            <input className="input-text" type="number" value={this.state.amount} placeholder="0.00"
              onChange={this.handleInput("amount")}/>
          </div>
          <button className="btn btn-login" onClick={this.handleConfirm}>Confirm</button>
          <button className="btn btn-signup" onClick={this.props.removeShare}>Remove</button>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    search: objectToArray(state.search),
    currentUser: state.session.currentUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    searchFriends: (query) => dispatch(searchFriends(query))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Share);
