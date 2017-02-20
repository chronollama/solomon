import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getFriends } from '../../actions/friend_actions';
import { friendsArray } from '../../reducers/selectors';
import InviteFriend from '../forms/invite_friend';

class FriendsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { fetching: true, openInviteForm: false };
    this.openAddFriend = this.openAddFriend.bind(this);
    this.closeAddFriend = this.closeAddFriend.bind(this);
  }

  componentDidMount() {
    this.props.getFriends().then(
      () => this.setState({ fetching: false })
    );
  }

  openAddFriend() {
    this.setState({openInviteForm: true});
  }

  closeAddFriend() {
    this.setState({openInviteForm: false});
  }

  render() {
    if (this.state.fetching) {
      return null;
    }

    let friends = <li id="no-friends">You have not added any friends yet.</li>;
    if (this.props.friends !== {}) {
      friends = this.props.friends.map((friend) => {
        return (
          <Link to={`/friends/${friend.id}`} key={friend.id}>
            <li><i className="fa fa-user" aria-hidden="true"></i>{friend.name}</li>
          </Link>
        );
      });
    }

    return (
      <div>
        <div className="list-title"><span>FRIENDS</span>
          <button onClick={this.openAddFriend}>add</button>
          <InviteFriend open={this.state.openInviteForm}
            closeAddFriend={this.closeAddFriend}/>
        </div>
        <ul className="friends-list">
          {friends}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    friends: friendsArray(state.friends)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getFriends: () => dispatch(getFriends())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendsList);
