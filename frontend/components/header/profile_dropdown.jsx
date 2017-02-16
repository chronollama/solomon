import React from 'react';

const ProfileDropdown = ({ hidden, logout }) => {
  if (hidden) {
    return (
      <div></div>
    )
  }
  // TODO: dropdown transition

  return (
    <ul id='profile-dropdown'>
      <li>Your account</li>
      <li>Create a group</li>
      <li>Fairness calculators</li>
      <li onClick={logout}>Log out</li>
    </ul>
  );
};

export default ProfileDropdown;
