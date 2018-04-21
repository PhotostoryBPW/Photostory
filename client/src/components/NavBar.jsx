import React from 'react';

const NavBar = (props) => {
  const clickHandler = (e) => {
    console.log('This is the current view: ', e.target.className);
    props.navBarClickHandler(e.target.className);
  };

  return (
  <div className="navBar">
    <div onClick={clickHandler.bind(this)} className="feed">
      <img/> HOME
    </div>
    <div onClick={clickHandler.bind(this)} className="search">
      <img/> SEARCH
    </div>
    <div onClick={clickHandler.bind(this)} className="createpost">
      <img/> POST
    </div>
    <div onClick={clickHandler.bind(this)} className="notifications">
      {
        !!props.notifications
        ?
        props.notifications
        :
        '!!!'
      }
    </div>
    <div onClick={clickHandler.bind(this)} className="profile">
      <img/> PROF
    </div>
  </div>
  );
};

export default NavBar;