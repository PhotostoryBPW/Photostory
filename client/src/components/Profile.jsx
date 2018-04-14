import React from 'react';
import MyPosts from './MyPosts.jsx';
var moment = require('moment');

const Profile = (props) => {
  console.log(props);
  return (
  <div className="profileMain">
    <div id="handle">{props.data.userHandle}</div>
    <div id="profilePhoto"><img src={props.data.userPhotoUrl} width="100%" /></div>
    <div id="profileBio">{props.data.userBio}</div>
    <div id="stats">
      <ul>
        <li className="statsItem">Posts: {props.data.postCount}</li>
        <li className="statsItem">Users followed: {props.data.followsCount}</li>
        <li className="statsItem">Users following: {props.data.followedByCount}</li>
      </ul>
    </div>
    <div id="edit">Edit</div>
    <MyPosts/>
  </div>
  )
}

export default Profile;
