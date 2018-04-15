import React from 'react';
import axios from 'axios';
import Profile from './Profile.jsx';
var moment = require('moment');

class ProfileEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: props.data.currentUser 
    }
  }
  
  render() {
    return (
    <div className="profileEdit">

    </div>
    )
  }
}

export default ProfileEdit;
