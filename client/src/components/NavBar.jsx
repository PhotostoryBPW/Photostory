import React from 'react';

const NavBar = (props) => {
  const clickHandler = (e) => {
    console.log(e.target.className);
    props.clickHandler(e.target.className);
  };

  return (
  <div className="navBar">
    <div onClick={clickHandler.bind(this)} className="feed">
      <img/> HOME
    </div>
    <div onClick={clickHandler.bind(this)} className="search">
      <img/> SEARCH
    </div>
    <div onClick={clickHandler.bind(this)} className="post">
      <img/> POST
    </div>
    <div onClick={clickHandler.bind(this)} className="notifications">
      <img/> !!!
    </div>
    <div onClick={clickHandler.bind(this)} className="profile">
      <img/> PROF
    </div>
  </div>
  );
};

export default NavBar;