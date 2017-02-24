import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { addFriend } from '../../actions/friend_actions';
import { searchUsers } from '../../actions/search_actions';
import { objectToArray } from '../../reducers/selectors';

class InviteFriend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      showSearchList: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.fillInput = this.fillInput.bind(this);
    this.clearAndClose = this.clearAndClose.bind(this);
    this.hideSearchList = this.hideSearchList.bind(this);
  }

  componentWillMount() {
    Modal.setAppElement('body');
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.addFriend({email: this.state.email}).then(
      () => {
        this.setState({email: ''});
        this.props.closeAddFriend();
      }
    );
  }

  hideSearchList() {
    this.setState({showSearchList: false});
  }

  handleInput(e) {
    this.setState({email: e.currentTarget.value});
    if (e.currentTarget.value.length > 2) {
      this.props.searchUsers(e.currentTarget.value);
      this.setState({showSearchList: true});
    } else {
      this.hideSearchList();
    }
  }

  fillInput(email) {
    return (e) => {
      this.setState({email});
    };
  }

  searchResults() {
    if (this.state.showSearchList) {
      let users = <li>No results found</li>;

      if (this.props.search.length > 0) {
        users = this.props.search.map((search) => {
          return (
            <li key={search.id} className="result" onClick={this.fillInput(search.email)}>
              <div className="result-name">{search.name}</div>
              <div className="result-email">{search.email}</div>
            </li>
          );
        });
      }

      return (
        <ul className="search-results">
          {users}
        </ul>
      );

    } else {
      return null;
    }
  }

  clearAndClose() {
    this.setState({email: ''});
    this.hideSearchList();
    this.props.closeAddFriend();
  }

  render() {
    return (
      <Modal isOpen={this.props.open}
        className="form-modal"
        overlayClassName="form-modal-overlay"
        onRequestClose={this.clearAndClose}
        contentLabel="Invite Form">
        <form id="invite-form" className="invite-form" onClick={this.hideSearchList}>
          <h2>Add friend</h2>
          <div>
            <input className="input-text" type="text" onChange={this.handleInput}
              placeholder="Email address" value={this.state.email}/>
            {this.searchResults()}
            <button className="btn btn-signup"
              onClick={this.handleSubmit}>Add friend</button>
          </div>
        </form>
      </Modal>
    );
  }
}
// TODO: error for adding non-user as friend, search bar that displays users while typing

const mapStateToProps = state => {
  return {
    search: objectToArray(state.search)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addFriend: (friend) => dispatch(addFriend(friend)),
    searchUsers: (query) => dispatch(searchUsers(query))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InviteFriend);
