import React from 'react';
import axios from 'axios';
import ProfileEdit from './ProfileEdit.jsx';
import ProfilePosts from './ProfilePosts.jsx';
var moment = require('moment');

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: '',
      userInfo: {},
      posts: '',
      loggedInUser: '',
    }
  }

  componentDidMount() {
    this.getCurrentUsersPosts();
  }

  componentWillMount() {
    this.setState({
      currentUser: this.props.user,
      loggedInUser: this.props.loggedInUser,
      userInfo: this.props.userInfo,
    })
  }
  
  onFollowClickHandler() {
    console.log(this.state);
    axios.post('api/follow', this.state.userInfo.id)
    .then((response) => {
      console.log('reached the server successfully', response)
    })
    .catch((err) => {
      console.log(err);
    })
  }

  getCurrentUsersPosts() {
    let posts = [];
    let comments = [];
    let currentUserInfo = {};
    axios.get(`api/feed/${this.state.currentUser}`)
    .then( response => {
      console.log('response', response)
      currentUserInfo = {
        id: response.data[0].id,
        userHandle: response.data[0].userHandle,
        userName: response.data[0].userName,
        userPhotoUrl: response.data[0].userPhotoUrl || '',
        bio: response.data[0].bio,
        followersCount: response.data[0].followersCount,
        followedCount: response.data[0].followedCount,
      };
      posts = [];
      comments = [];
      response.data.forEach(data => {
        if (data.parent_id) {
          comments.push(data)
        } else {
          posts.push(data);
        }
      })
    })
    .then(() => {
      this.setState({
        userInfo: currentUserInfo,
      })      
      posts.map(post => {
        comments.forEach(comment => {
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
      this.setState({
        posts: posts,
      })
    })
    .catch( err => {
      console.log(err);
    })
  }
  
  render() {
    console.log(this.state.currentUser, ' statecurrentuser 1');
    console.log(this.state.loggedInUser, ' stateloggedinuser 2');
    console.log(this.props.user, ' propsuser 3');
    console.log(this.props.loggedInUser, ' propsloggedinuser 4')
    console.log('this state userinfo! yo', this.state.userInfo)
    console.log('is this true?', this.state.currentUser !== this.props.user)
    if ((this.state.currentUser !== this.props.user)) {
      this.setState({
        currentUser: this.props.user
      }, () => {
        this.getCurrentUsersPosts();
      });
    }
    return (
      <div>
        {
          this.state.userInfo === undefined
          ?
          <div/>
          :
      <div className="profileMain">
        <div id="handle">{this.state.currentUser}</div>
        <div id="profilePhoto"><img src={`http://${this.state.userInfo.userPhotoUrl}`} width="100%" /></div>
        <div id="profileBio">{this.state.userInfo.bio}</div>
        <div id="stats">
            <div className="statsItem">Posts: {this.state.userInfo.postCount}</div>
            <div className="statsItem">Users followed: {this.state.userInfo.followedCount}</div>
            <div className="statsItem">Users following: {this.state.userInfo.followersCount}</div>
        </div>
        <div>
          <div>
            {
              this.state.currentUser === this.state.loggedInUser
              ?
              <div>
                <div id="edit" onClick={this.props.handleEditButtonClick} className="profileEdit">Edit...</div>
                <button id="logoutbtn" onClick={this.props.handleLogoutButtonClick} type="button" >Logout</button>
              </div>
              :
              <div id="follow" onClick={this.onFollowClickHandler.bind(this)} className="follow">Follow</div>
            }
          </div>
        </div>
        <div id="profilePosts"><ProfilePosts posts={this.state.posts} user={this.state.userInfo}/></div>
      </div>
        }
      </div>  
    )
  }
}

export default Profile;
