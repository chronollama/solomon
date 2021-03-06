import React from 'react';

const ProfileDropdown = ({ hidden, logout }) => {
  if (hidden) {
    return <div></div>;
  }

  return (
    <ul className='instant-dropdown'>
      <li onClick={logout}>Log out</li>
    </ul>
  );
};

export default ProfileDropdown;
