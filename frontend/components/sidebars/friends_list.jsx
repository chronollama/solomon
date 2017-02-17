import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getFriends } from '../../actions/friend_actions';
import {friendsArray } from '../../reducers/selectors';

class FriendsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { fetching: true };
  }

  componentDidMount() {
    this.props.getFriends().then(
      () => this.setState({ fetching: false })
    );
  }


  // componentWillReceiveProps(newProps) {
  //
  // }

  openAddFriend() {
    console.log("This will open the add friend form");
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
            <li>{friend.name}</li>
          </Link>
        );
      });
    }

    return (
      <div>
        <div className="list-title"><span>FRIENDS</span>
          <button onClick={this.openAddFriend}>add</button>
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
