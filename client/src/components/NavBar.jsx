import React from 'react';

const NavBar = (props) => {
  const clickHandler = (e) => {
    console.log('This is the current view: ', e);
    props.navBarClickHandler(e, props.userHandle);
  };

  console.log(props, 'on the navbar PROPPPPPPPS')
  return (
  <div className="navBar">
    <div onClick={clickHandler.bind(this, 'feed')} className="feed">
      <img src="http://localhost:3000/nav/feed.png"/> 
    </div>
    <div onClick={clickHandler.bind(this, 'search')} className="search">
      <img src="http://localhost:3000/nav/search.png"/> 
    </div>
    <div onClick={clickHandler.bind(this, 'createpost')} className="createpost">
      <div className="Button Button--select" onClick={clickHandler.bind(this, 'createpost')}>
      <button className='postButton'><img src="http://localhost:3000/nav/post-w.png"/></button>
      </div>
    </div>  
    <div onClick={clickHandler.bind(this, 'notifications')} className="notifications">
      {
        !!props.notifications
        ?
        <div className='withNoteNumber'><img src="http://localhost:3000/nav/notifications.png"/><div className='noteNumber'>{props.notifications}</div></div>
        :
        <img src="http://localhost:3000/nav/notifications.png"/>
      }
    </div>
    <div onClick={clickHandler.bind(this, 'profile')} className="profile">
      <img src="http://localhost:3000/nav/profile.png"/> 
    </div>
  </div>
  );
};

export default NavBar;