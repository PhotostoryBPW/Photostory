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
      followed: '',
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
      console.log('response', response)
      currentUserInfo = {
        users_id: response.data[0].users_id,
        userHandle: response.data[0].userHandle,
        userName: response.data[0].userName,
        userPhotoUrl: response.data[0].userPhotoUrl || '',
        bio: response.data[0].bio,
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
        followed: following
      })
    })
    .catch( err => {
      console.log(err);
    })
  }
  
  render() {
    // console.log(this.state.currentUser, ' statecurrentuser 1');
    // console.log(this.state.loggedInUser, ' stateloggedinuser 2');
    // console.log(this.props.user, ' propsuser 3');
    // console.log(this.props.loggedInUser, ' propsloggedinuser 4')
    // console.log('this state userinfo! yo', this.state.userInfo)
    // console.log('this.state.followed of userProfile', this.state.followed)
    // console.log('is this true?', this.state.currentUser !== this.props.user)
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
        <div id="profilePosts"><ProfilePosts posts={this.state.posts} user={this.state.userInfo} liked={this.props.liked} view={this.props.view} currentUserProfilePhoto={this.props.userInfo.userPhotoUrl}/></div>
      </div>
        }
      </div>  
    )
  }
}

export default Profile;
