import React from 'react';
import NavBar from './NavBar.jsx';
import Feed from './Feed.jsx'
import axios from 'axios';
import Header from './Header.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import Profile from './Profile.jsx';
import Search from './Search.jsx';
import CreatePost from './CreatePost.jsx';
import Post from './Post.jsx'
import EditProfile from './EditProfile.jsx';
import NoteFeed from './NoteFeed.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: '',
      view: 'feed',
      posts: '',
      users: '',
      isLoggedIn: localStorage.hasOwnProperty('isLoggedIn'),
      signupView: false,
      loggedInUser: '',
      selectedUser: '',
      userInfo: {},
      notifications: '',
      unreadNotifications: 0,
    } 
  }

  isLoggedInHandler() {
    localStorage['isLoggedIn'] = true;
    this.setState({ isLoggedIn: true});
    console.log('this is the app log in state', this.state.isLoggedIn);
  }

  setCurrent(userLoggedIn) {
    this.setState({ 
      loggedInUser: userLoggedIn,
    })
    console.log('This is the current logged in user on the App', userLoggedIn)
  }

  getUserInfo(user) {
    axios.get(`http://localhost:3000/api/info`, user)
    .then( response => {
      this.setState({ 
        userInfo: response.data
      })
    })
    .catch( err => {
      console.log(err);
    })
  }

  toggleSignup() {
    this.setState({
      signupView: true
    })
  }

  toggleLogin() {
    this.setState({
      signupView: false
    })
  }

  componentWillMount() {
    this.getFeed();
    axios.get('api/checksession')
    .then( response => {
      if (response.data.status === 'active') {
        localStorage['isLoggedIn'] = true;
        this.getNotifications();
        this.getUserInfo(response.data.user);
        this.getLikes();
        this.setState({ 
          loggedInUser: response.data.user,
          posts: sample.posts,
          users: sample.users,
          isLoggedIn: true
        })
      } else {
        if (localStorage.hasOwnProperty('isLoggedIn')) {
          delete localStorage.isLoggedIn;
        }
        this.setState({
          isLoggedIn: false,
        })
      }
    })
    .catch( err => {
      console.log(err);
    })
  }
  //jakes
  changeView(option, username) {
    console.log(username, 'clicked username on post');
    console.log(option);
    console.log('changeview called! this is the state of the app: ', this.state);
    if (option === 'profile' && this.state.view === 'profile') {
      console.log(this.state.loggedInUser, 'loggedInUser?');
      this.setState({
        selectedUser: '',
      })
    }
    this.setState({
        view: option,
        selectedUser: username || ''
      }, () => {
        if (option === 'createpost' || option === 'createpost' || option === 'feed' || option === 'profile') {
          this.getFeed();
          this.getUserInfo(username);
        }
      })
  }
//lores
  changeView(option, username) {
    console.log(username, 'clicked username on post');
    console.log(option);
    console.log('changeview called! this is the state of the app: ', this.state);
    if (option === 'profile' && this.state.view === 'profile') {
      console.log(this.state.loggedInUser, 'loggedInUser?');
      this.setState({
        selectedUser: '',
      })
    }
    this.getUserInfo(username);
    this.setState({
        view: option,
        selectedUser: username || ''
      }, () => {
        if (option ==='notifications') {
          this.setViewedOnNoteFeed()
          this.setState({
            unreadNotifications: 0,
          })
        }
        else if (option === 'createpost' || option === 'createpost' || option === 'feed' || option === 'profile') {
          this.getFeed();
          this.getUserInfo(username);
        }
      })
  }

  navBarClickHandler(page) {
    this.setState({
      url: page,
      selectedUser: '',
    });
  }

  createPost(data) {
    axios.post('api/post', data)
      .then( response => {
        console.log('post success ', response.body);
      })
      .catch( err => {
        console.log(err);
      })
  }

  getFeed() {
    let posts = [];
    let comments = [];
    axios.get('api/feed')
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
          data: posts,
        })
      })
      .catch( err => {
        console.log(err);
      })
  }

  getLikes() {
    axios.get('api/likes')
      .then( response => {
        var results = [];
        response.data.forEach(function(post) {
          results.indexOf(post.posts_id) < 0 && results.push(post.posts_id);
        })
        this.setState({liked: results});
      })
      .catch(err => {
        console.log(err);
      })
  }
  
  getNotifications() {
    let flattened = [];
    let unread = 0;
    axios.get('api/notifications')
      .then( response => {
        console.log('this is a response for a get notifications axios: ', response)
        flattened = [].concat(...[response.data.comments, response.data.follow, response.data.likes]).sort((a, b) => (b.note_time - a.note_time))
        unread = 0 || flattened.filter(notification => (notification.viewed === 0)).length;
      })
      .then (() => {
        this.setState({
          notifications: flattened,
          unreadNotifications: unread
        });
        console.log('The number of unviewed notifications is: ', unread);
      })
      .catch(err => {
        console.log(err);
      })
  }

  setViewedOnNoteFeed() {
    axios.post('api/view')
      .then (response => {
        console.log('server responded to view posts feed with: ', response);
      })
      .catch(err => {
        console.log(err);
      })
  }

  setLike(post, user) {
    axios.post('api/like', post, user)
      .then( response => {
        console.log('setLike success')
      })
      .catch(err => {
        console.log('setLike error: ', err);
      })
  }

  unLike(post, user) {
    axios.post('api/unlike', post, user)
      .then( response => {
        console.log('unLike success')
      })
      .catch(err => {
        console.log('unLike error: ', err);
      })
  }

  handleLogoutButtonClick(editUsername, payload, ghostuser) {
    axios.get('api/logout')
      .then( response => {
        delete localStorage.isLoggedIn;
        this.setState({isLoggedIn: false});
        if (editUsername === 'true') {
          var newPayload = {
            ghostuser: ghostuser,
            replacementName: payload,
          }
          axios.put('api/updateusername', newPayload)
            .then (resonse => {
              console.log(response);
            })
            .catch(err => {
              console.log(err);
            })
        }
      })
      .catch( err => {
        console.log(err);
      })
  }

  handleEditButtonClick() {
    this.setState({view: 'editprofile'});
  }

  renderView() {
    const {view} = this.state;
    if (view === 'feed') {
      return <Feed handleClick={this.changeView.bind(this)} posts={this.state.data} users={this.state.users} userInfo={this.state.userInfo} view={this.state.view}/>;
    } else if (view === 'profile') {
      //if clicked user is empty string, do what it normally does
      //else return profile component with user set to selectedUser
      if (this.state.selectedUser === '') {
        console.log('no selected user');
        return <Profile loggedInUser={this.state.loggedInUser} posts={this.state.posts} user={this.state.loggedInUser} userInfo={this.state.userInfo} handleEditButtonClick={this.handleEditButtonClick.bind(this)} handleLogoutButtonClick={this.handleLogoutButtonClick.bind(this)} view={this.state.view}/>
      } else {
        console.log('selected user exists');
        return <Profile loggedInUser={this.state.loggedInUser} posts={this.state.posts} user={this.state.selectedUser} userInfo={this.state.userInfo} handleEditButtonClick={this.handleEditButtonClick.bind(this)} handleLogoutButtonClick={this.handleLogoutButtonClick.bind(this)} view={this.state.view}/>
      }
    } else if (view === 'signup') {
      return <Signup/>
    } else if (view === 'editprofile') {
      return <EditProfile handleLogout={this.handleLogoutButtonClick.bind(this)}/>
    } else if (view === 'createpost') {
      return <CreatePost onSubmit={this.changeView.bind(this)}/>
    }  else if (view === 'search') {
      return <Search posts={this.state.data} liked={this.state.liked} handleClick={this.changeView.bind(this)} userInfo={this.state.userInfo}/>
    } else if (view === 'notifications') {
      return <NoteFeed notes={this.state.notifications}/>
    }
  }

  render() {
    return (
      <div>
        {
          this.state.isLoggedIn ?
          <div className="container">
            <div className="wrapper">
              <header>
                <Header view={this.state.view} loggedInUserHandle={this.state.selectedUser || this.state.userInfo.userHandle}/>
              </header>
              <div className="main">
                {this.renderView()}
              </div>
              <footer className="nav">
                <NavBar navBarClickHandler={this.changeView.bind(this)} notifications={this.state.unreadNotifications}/>
              </footer>
            </div>
          </div> 
          :
          <div>
            {this.state.signupView ?
              <div>
                <Signup isLoggedInHandler={this.isLoggedInHandler.bind(this)} toggleLogin={this.toggleLogin.bind(this)}/>
              </div>
                :
              <div>
                <Login setCurrent={this.setCurrent.bind(this)} toggleLoggedIn={this.isLoggedInHandler.bind(this)} toggleSignup={this.toggleSignup.bind(this)}/>
              </div>
            }
          </div> 
        }
      </div>
    );
  }
}

export default App;
