import React from 'react';
import axios from 'axios';
import ProfileEdit from './ProfileEdit.jsx';
import MyPosts from './MyPosts.jsx';
var moment = require('moment');

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: '',
      userInfo: {},
      posts: ''
    }
  }

  componentDidMount() {
    this.getUserInfo();
    // this.props.get(this.state.currentUser);
    this.state.posts = this.props.posts;
  }

  componentWillMount() {
    this.setState({
      currentUser: this.props.user,
    })
  }

  getUserInfo() {
    axios.get(`http://localhost:3000/api/profile/${this.state.currentUser}`, {
      params: {
        currentUser: this.state.currentUser
      }
    })
    .then( response => {
      this.setState({ 
        userInfo: response.data[0],
      })
    })
    .catch( err => {
      console.log(err);
    })
  }
  
  render() {
    return (
      <div className="profileMain">
        <div id="handle">{this.state.currentUser}</div>
        <div id="profilePhoto"><img src={this.state.userInfo.userPhotoUrl} width="100%" /></div>
        <div id="profileBio">{this.state.userInfo.bio}</div>
        <div id="stats">
            <div className="statsItem">Posts: {this.state.userInfo.postCount}</div>
            <div className="statsItem">Users followed: {this.state.userInfo.followedCount}</div>
            <div className="statsItem">Users following: {this.state.userInfo.followersCount}</div>
        </div>
        <div id="edit" onClick={this.props.handleClick.bind(this)} className="profileEdit">Edit...</div>
        <div id="myPosts"><MyPosts posts={this.state.posts} user={this.state.userInfo}/></div>
      </div>
    )
  }
}

export default Profile;
