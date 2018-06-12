import React from 'react';
import axios from 'axios';
import ProfilePosts from './ProfilePosts.jsx';
var moment = require('moment');

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: '',
      userInfo: '',
      posts: '',
      loggedInUser: '',
      followed: '',
    }
  }

  // componentDidUpdate() {
  //   this.props.getInfo(this.props.user);
  // }

  async componentDidMount() {
    console.log('this is this.props.user from the profile: ', this.props.user);

    const userInfo = await axios.get('http://localhost:3000/api/info', {
      params: {
        payload: {username: this.props.user}
      }
    });

    this.getCurrentUsersPosts();
    this.setState({
      currentUser: this.props.user,
      loggedInUser: this.props.loggedInUser,
      userInfo: userInfo,
    });
  }

  componentWillMount() {
    this.props.userInfo === undefined && 
    axios.get('api/checksession')
      .then( response => {
        if (response.data.status === 'active') {
          this.props.getInfo(response.data.user);
        } else {
          axios.get('http://localhost:3000/api/logout');
        }
      })
      .catch( err => {
      console.log(err);
    })
    
    
    
  }

  onFollowClickHandler(e) {
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
    })
    .catch((err) => {
      console.log(err);
    })
  }

  getCurrentUsersPosts() {
    let posts = [];
    let comments = [];
    let following;
    axios.get(`api/feed/${this.props.user}`)
    .then( response => {
      if (response.data !== 'no posts to send') {
        this.setState({userInfo: response.data[0]});
        following = response.data[0].isFollowing
        posts = [];
        comments = [];
        console.log(response.data, '??????');
        if (response.data !== 'no posts to send') {
          response.data.forEach(data => {
            if (data.parent_id) {
              comments.push(data)
            } else {
              posts.push(data);
            }
          })
        }
      }
    })
    .then(() => {  
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
        if (posts.length > 0) {
        this.setState({
          posts: posts.filter(post => post.userHandle === (!!this.state.currentUser ? this.state.currentUser : this.state.loggedInUser)),
          followed: following
        })
      }
    })
    .catch( err => {
      console.log(err);
    })
  }

  render() {
    console.log('this is the props in profile posts: ', this.props);
    console.log('this is the state in profile posts: ', this.state);
    return (
      <div className="profileMain">
        <div id="handle">{this.props.user || this.props.userHandle}</div>
        <div id="profilePhoto"><img src={`http://${this.state.userInfo.userPhotoUrl}`} width="100%" /></div>
        <div id="profileInfo">
          Location: 
          <br />
          <i>{this.state.userInfo.userLoc}</i>
          <br />
          <br />
          Bio: 
          <br />
          <i>{this.state.userInfo.bio}</i>
          <br />
        </div>
        <div id="stats">
            <div className="statsItem">Posts: {this.state.userInfo.postCount}</div>
            <div className="statsItem">Followers: {this.state.userInfo.followedCount}</div>
            <div className="statsItem">Following: {this.state.userInfo.followCount}</div>
            {
              this.props.user === this.props.userHandle
              ?
              <div>
                <div id="edit" onClick={this.props.handleEditButtonClick} className="buttonLight">EDIT PROFILE</div>
                <div id="logoutbtn" onClick={this.props.handleLogoutButtonClick} className="buttonLight">LOGOUT</div>
              </div>
              :
              !this.state.followed
              ?
              <div id="follow" onClick={this.onFollowClickHandler.bind(this)} className="follow buttonLight">FOLLOW</div>
              :
              <div id="follow" onClick={this.onFollowClickHandler.bind(this)} className="unFollow buttonLight">UNFOLLOW</div>
            }
        </div>
        <div id="profilePosts"><ProfilePosts posts={this.state.posts} user={this.state.userInfo} view={this.props.view} userPhotoUrl={this.state.userInfo.userPhotoUrl} userHandle={this.state.userHandle}/></div>
        </div>  
    )
  }
}

export default Profile;
