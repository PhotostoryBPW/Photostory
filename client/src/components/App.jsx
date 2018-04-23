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
    
  }

  setCurrent(userLoggedIn) {
    this.setState({ 
      loggedInUser: userLoggedIn,
    })
    
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
        console.log('got in here')
        localStorage['isLoggedIn'] = true;
        this.getNotifications();
        this.getUserInfo(response.data.user);
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

  changeView(option, username) {
    if (option === 'profile' && this.state.view === 'profile') {
      this.setState({
        selectedUser: '',
      })
    }
    if (option === 'feed') {
      this.getFeed();
    }
    this.getUserInfo(username);
    this.getNotifications();
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
        else if (option === 'createpost' || option === 'feed' || option === 'profile' || option === 'editprofile') {
          this.getFeed();
          this.getUserInfo(username);
          
        }
        if (option !== 'profile') {
          this.setState ({
            selectedUser: '',
          })
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
      
        if (response.data.length > 0) {
          response.data.forEach(data => {
            if (data.parent_id) {
              comments.push(data)
            } else {
              posts.push(data);
            }
          })
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
      
        this.setState({
          data: posts,
        })
      })
      .catch( err => {
        console.log(err);
      })
  }

  getNotifications() {
    let flattened = [];
    let unread = 0;
    axios.get('api/notifications')
      .then( response => {
        
        flattened = [].concat(...[response.data.comments, response.data.follow, response.data.likes]).sort((a, b) => (b.note_time - a.note_time))
        unread = 0 || flattened.filter(notification => (notification.viewed === 0)).length;
      })
      .then (() => {
        this.setState({
          notifications: flattened,
          unreadNotifications: unread
        });
        
      })
      .catch(err => {
        console.log(err);
      })
  }

  setViewedOnNoteFeed() {
    axios.post('api/view')
      .then (response => {
        
      })
      .catch(err => {
        console.log(err);
      })
  }

  handleLogoutButtonClick(editUsername, newName, ghostuser) {
    if (editUsername && newName && ghostuser) {
      var newInfo = {newName : newName, ghostuser: ghostuser};
      axios.put('api/updateusername', newInfo)
        .then (response => {
          console.log(response);
        })
        .catch(err => {
          console.log(err);
        })
    }
    axios.get('api/logout')
      .then( response => {
        delete localStorage.isLoggedIn;
        this.setState({isLoggedIn: false});
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
      return <Feed handleClick={this.changeView.bind(this)} posts={this.state.data} users={this.state.users} userInfo={this.state.userInfo} view={this.state.view} userHandle={!!this.state.userInfo.length ? this.state.userInfo[0].userHandle : 'nope'}/>;
    } else if (view === 'profile') {
      if (this.state.selectedUser === '') {
        return <Profile loggedInUser={this.state.loggedInUser} posts={this.state.posts} user={this.state.loggedInUser} userInfo={this.state.userInfo} handleEditButtonClick={this.handleEditButtonClick.bind(this)} handleLogoutButtonClick={this.handleLogoutButtonClick.bind(this)} view={this.state.view} userHandle={!!this.state.userInfo.length ? this.state.userInfo[0].userHandle : 'nope'}/>
      } else {
        return <Profile loggedInUser={this.state.loggedInUser} posts={this.state.posts} getInfo={this.state.getUserInfo} user={this.state.selectedUser} userInfo={this.state.userInfo} handleEditButtonClick={this.handleEditButtonClick.bind(this)} handleLogoutButtonClick={this.handleLogoutButtonClick.bind(this)} view={this.state.view} userHandle={!!this.state.userInfo.length ? this.state.userInfo[0].userHandle : 'nope'}/>
      }
    } else if (view === 'signup') {
      return <Signup/>
    } else if (view === 'editprofile') {
      return <EditProfile handleLogout={this.handleLogoutButtonClick.bind(this)} user={this.state.username} userInfo={this.state.userInfo}/>
    } else if (view === 'createpost') {
      return <CreatePost onSubmit={this.changeView.bind(this)}/>
    }  else if (view === 'search') {
      return <Search posts={this.state.data} handleClick={this.changeView.bind(this)} userInfo={this.state.userInfo}/>
    } else if (view === 'notifications') {
      return <NoteFeed notes={this.state.notifications}/>
    }
  }

  render() {
    console.log('USER INFO ON APP', this.state.userInfo)
    return (
      <div>
        {
          this.state.isLoggedIn ?
          <div className="container">
            <div className="wrapper">
              <header>
                <Header view={this.state.view} currentUserHandle={this.state.selectedUser || this.state.userInfo.userHandle}/>
              </header>
              <div className="main">
                {this.renderView()}
              </div>
              <footer className="nav">
                <NavBar navBarClickHandler={this.changeView.bind(this)} notifications={this.state.unreadNotifications} userHandle={!!this.state.userInfo.length ? this.state.userInfo[0].userHandle : 'nope'}/>
              </footer>
            </div>
          </div> 
          :
          <div>
            {this.state.signupView ?
              <div className="container">
                <div className="loginwrapper">
                  <div>
                    <Signup isLoggedInHandler={this.isLoggedInHandler.bind(this)} toggleLogin={this.toggleLogin.bind(this)}/>
                  </div>
                </div>
              </div>
                :
                <div className="container loginContainer">
                  <div className="loginwrapper">
                    <div>
                      <Login setCurrent={this.setCurrent.bind(this)} toggleLoggedIn={this.isLoggedInHandler.bind(this)} toggleSignup={this.toggleSignup.bind(this)}/>
                    </div>
                  </div>
              </div>
            }
          </div> 
        }
      </div>
    );
  }
}

export default App;
