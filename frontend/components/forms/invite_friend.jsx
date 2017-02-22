import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { addFriend } from '../../actions/friend_actions';

class InviteFriend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  componentWillMount() {
    Modal.setAppElement('body');
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.addFriend(this.state).then(
      () => {
        this.setState({email: ''});
        this.props.closeAddFriend();
      }
    );
  }

  handleInput(e) {
    this.setState({email: e.currentTarget.value});
  }

  render() {
    return (
      <Modal isOpen={this.props.open}
        className="invite"
        overlayClassName="invite-overlay"
        onRequestClose={this.props.closeAddFriend}
        contentLabel="Invite Form">
        <form id="invite-form" className="invite-form">
          <div>
            <h2>Add Friend</h2>
          </div>
          <input className="input-text" type="text" onChange={this.handleInput}
            placeholder="Email address" value={this.state.email}/>
          <button className="btn btn-signup"
            onClick={this.handleSubmit}>Add friend</button>
        </form>
      </Modal>
    );
  }
}
// TODO: error for adding non-user as friend


const mapDispatchToProps = dispatch => {
  return {
    addFriend: (friend) => dispatch(addFriend(friend))
  };
};

export default connect(null, mapDispatchToProps)(InviteFriend);
