import React from 'react';
import axios from 'axios';
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
      followed: '',
    }
  }

  componentDidMount() {
    this.getCurrentUsersPosts();
  }

  componentWillMount() {
    this.setState({
      currentUser: this.props.user,
      loggedInUser: this.props.loggedInUser
    })
  }
  
  onFollowClickHandler(e) {
    console.log('the state of this on click ', this.state, 'and the value of e on click'. e);
    axios.post('api/follow', this.state.userInfo.users_id)
    .then((response) => {
        if (!this.state.followed) {
          var userInfoUpdated = Object.assign({}, this.state.userInfo, {followedCount: ++this.state.userInfo.followedCount});
          console.log('top question', userInfoUpdated);
          this.setState({
            followed: !this.state.followed,
            userInfo: userInfoUpdated
          })
        } else {
          var userInfoUpdated = Object.assign({}, this.state.userInfo, {followedCount: --this.state.userInfo.followedCount});
          console.log('bottom questions' , userInfoUpdated);
          this.setState({
            followed: !this.state.followed,            
            userInfo: userInfoUpdated
          })
        }
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
    let following;
    axios.get(`api/feed/${this.state.currentUser}`)
    .then( response => {
      currentUserInfo = {
        users_id: response.data[0].users_id,
        userHandle: response.data[0].userHandle,
        userName: response.data[0].userName,
        userLoc: response.data[0].userLoc,
        userPhotoUrl: response.data[0].userPhotoUrl,
        bio: response.data[0].bio,
        email: response.data[0].email,
        followCount: response.data[0].followCount,
        followedCount: response.data[0].followedCount,
      };
      following = response.data[0].isFollowing
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
      if (currentUserInfo.users_id) {
        this.setState({
          userInfo: currentUserInfo,
        })  
      }    
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
        followed: following
      })
    })
    .catch( err => {
      console.log(err);
    })
  }
  
  // setInfo() {
  //   this.state.userInfo = this.props.userInfo;
  //   console.log('info set');
  //   console.log(this.props.userInfo);
  // }

  render() {
    return (
      <div>
        {/* {this.setInfo()} */}
        {
          this.state.userInfo === undefined
          ?
          <div/>
          :
      <div className="profileMain">
        <div id="handle">{this.state.userInfo.userHandle}</div>
        {console.log('in profile load, this is user info: ', this.state.userInfo)}
        <div id="profilePhoto"><img src={`http://${this.state.userInfo.userPhotoUrl}`} width="100%" /></div>
        <div id="profileBio">{this.state.userInfo.bio}</div>
        <div id="stats">
            <div className="statsItem">Posts: {this.state.userInfo.postCount}</div>
            <div className="statsItem">Followers: {this.state.userInfo.followedCount}</div>
            <div className="statsItem">Following: {this.state.userInfo.followCount}</div>
            {
              this.state.currentUser === this.state.loggedInUser
              ?
              <div>
                <div id="edit" onClick={this.props.handleEditButtonClick} className="profileEdit">Edit...</div>
                <button id="logoutbtn" onClick={this.props.handleLogoutButtonClick} type="button" >Logout</button>
              </div>
              :
              !this.state.followed
              ?
              <div id="follow" onClick={this.onFollowClickHandler.bind(this)} className="follow">Follow</div>
              :
              <div id="follow" onClick={this.onFollowClickHandler.bind(this)} className="unFollow">UnFollow</div>
            }
        </div>
        <div id="profilePosts"><ProfilePosts posts={this.state.posts} user={this.state.userInfo} view={this.props.view} currentUserProfilePhoto={this.state.userInfo.userPhotoUrl}/></div>
      </div>
        }
      </div>  
    )
  }
}

export default Profile;
