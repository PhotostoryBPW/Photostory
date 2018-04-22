import React from 'react';

const Header = (props) => {  

  const clickHandler = (e) => {
    console.log(e.target.className);
    props.clickHandler(e.target.className);
  };

  return (
  <div className="header">
    {
    (props.view === 'feed') ? <img src="http://localhost:3000/logo.png" alt="Photostory" className='headerLogo'/> : 
    (props.view === 'search') ? <span>Search</span> :
    (props.view === 'createpost') ? <span>Post</span> :
    (props.view === 'notifications') ? <span>Notifications</span> : 
    (props.view === 'profile') ? <span>Profile</span> :
    (props.view === 'editprofile') ? <span>Edit Profile</span> :
    <span>{props.currentUserHandle}</span>
    }
  </div>
  );
};

export default Header;