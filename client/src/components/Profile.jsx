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
    this.state.posts = this.props.posts;
    console.log('props from profile', this.props)
    this.getCurrentUsersPosts();
  }

  componentWillMount() {
    this.setState({
      currentUser: this.props.user,
      userInfo: this.props.userInfo,
    })
    
  }

  getCurrentUsersPosts() {
    let posts = [];
    let comments = [];
    console.log('this is the current user', this.state.currentUser);
    axios.get(`api/feed/${this.state.currentUser}`)
    .then( response => {
      posts = [];
      comments = [];
      console.log('got feed with the current data: ', response.data)
      response.data.forEach(data => {
        if (data.parent_id) {
          comments.push(data)
        } else {
          posts.push(data);
        }
      })
    })
    .then(() => {
      console.log('this is the posts array', posts)
      console.log('this is the comments array', comments)
      
      posts.map(post => {
        comments.forEach(comment => {
          console.log(comment.parent_id === post.id);
          if (comment.parent_id === post.id) {
            if (!post.children) {
              post.children = [comment];
            } else {
              post.children.push(comment);
            }
          }
        })
      })
    })
    .then(() => {
      console.log('this is posts after it is done compiling children', posts);
      this.setState({
        posts: posts,
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
        <div id="profilePhoto"><img src={`http://${this.state.userInfo.userPhotoUrl}`} width="100%" /></div>
        <div id="profileBio">{this.state.userInfo.bio}</div>
        <div id="stats">
            <div className="statsItem">Posts: {this.state.userInfo.postCount}</div>
            <div className="statsItem">Users followed: {this.state.userInfo.followedCount}</div>
            <div className="statsItem">Users following: {this.state.userInfo.followersCount}</div>
        </div>
        <div id="edit" onClick={this.props.handleEditButtonClick} className="profileEdit">Edit...</div>
        <button id="logoutbtn" onClick={this.props.handleLogoutButtonClick} type="button" >Logout</button>
        <div id="myPosts"><MyPosts posts={this.state.posts} user={this.state.userInfo}/></div>
      </div>
    )
  }
}

export default Profile;
