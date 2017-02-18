import React from 'react';

class FriendDetails extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    const {friend} = this.props;

    return (
      <div>
        <header className="details-header">
          <div>{friend.name}</div>
          <button id='add-bill-btn' className='btn'>Add a bill</button>
          <button id='settle-btn' className='btn'>Settle up</button>
        </header>

      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    friend: state.friends[ownProps.params.id],
  };
};

const mapDispatchToProps = dispatch => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendDetails);
