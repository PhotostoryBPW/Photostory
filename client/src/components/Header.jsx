import React from 'react';

const Header = (props) => {  
  const clickHandler = (e) => {
    console.log(e.target.className);
    props.clickHandler(e.target.className);
  };

  return (
  <div className="header">
    {
      (props.view === 'feed') ? <span>Photostory</span> : 
    (props.view === 'search') ? <span>Search</span> :
    (props.view === 'createpost') ? <span>Post</span> :
    (props.view === 'notifications') ? <span>Notifications</span> : 
    <span>UserNameVar</span>
    }
  </div>
  );
};

export default Header;