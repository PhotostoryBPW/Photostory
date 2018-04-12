import React from 'react';
var moment = require('moment');

const Profile = (props) => (
  <div className="profile">
    <div id="handle">{props.user.handle}</div>
    <div id="userPhoto">{props.user.photoUrl}</div>
    <div id="stats">
      <ul>
        <li className="statsItem" onClick={() => props.handleClick(props.posts)}>Posts: {props.user.postCount}</li>
        <li className="statsItem" onClick={() => props.handleClick(props.posts)}>Users followed: {props.user.followsCount}</li>
        <li className="statsItem" onClick={() => props.handleClick(props.posts)}>Users following: {props.user.followedByCount}</li>
      </ul>
    </div>
    <div id="edit">Edit</div>
    <MyPosts />
  </div>
)

export default Profile;
