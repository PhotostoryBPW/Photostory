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
    (props.view === 'search') ? <img src="http://localhost:3000/search.jpg" className='headers' /> :
    (props.view === 'createpost') ? <img src="http://localhost:3000/post.jpg" className='headers'/> :
    (props.view === 'notifications') ? <img src="http://localhost:3000/notifications.jpg" className='headers'/> : 
    (props.view === 'profile') ? <img src="http://localhost:3000/profile.jpg" className='headers'/> :
    (props.view === 'editprofile') ? <img src="http://localhost:3000/editprofile.jpg" className='headers'/> :
    <span>{props.currentUserHandle}</span>
    }
  </div>
  );
};

export default Header;