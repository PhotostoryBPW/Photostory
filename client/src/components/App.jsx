import React from 'react';
import NavBar from './NavBar.jsx';
import Feed from './Feed.jsx'
import axios from 'axios';
import sample from '../sample_data.js';
import Header from './Header.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import Profile from './Profile.jsx';
import Search from './Search.jsx';
import CreatePost from './CreatePost.jsx';
import Post from './Post.jsx'
import EditProfile from './EditProfile.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: sample.posts,
      view: 'feed',
      posts: '',
      liked: [],
      users: '',
      isLoggedIn: localStorage.hasOwnProperty('isLoggedIn'),
      signupView: false,
      currentUser: '',
      clickedUser: '',
      userInfo: {},
    } 
  }

  isLoggedInHandler() {
    localStorage['isLoggedIn'] = true;
    this.setState({ isLoggedIn: true});
    console.log('this is the app log in state', this.state.isLoggedIn);
  }

  setCurrent(userLoggedIn) {
    this.setState({ 
      currentUser: userLoggedIn.data,
    })
    console.log('This is the current logged in user on the App', this.state.currentUser)
  }

  getUserInfo() {
    axios.get(`http://localhost:3000/api/profile`)
    .then( response => {
      this.setState({ 
        userInfo: response.data,
        currentUser: response.data.userHandle
      })
      console.log('this is the users info :', this.state.userInfo)
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
      if (response.data === 'active') {
        localStorage['isLoggedIn'] = true;
        this.getUserInfo();
        this.getLikes();
        this.setState({ 
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
    console.log(username, 'clicked username on post');
    console.log('changeview called!');
    if (option === 'profile' && this.state.view === 'profile') {
      console.log(this.state.currentUser, 'currentuser?');
      this.setState({
        clickedUser: '',
      })
    }
    
    this.setState({
        view: option,
        clickedUser: username || ''
      })
    
    if (this.state.view === 'createpost' || this.props.view === 'createpost' || this.state.view === 'feed') {
      this.getFeed();
    }
  }

  navBarClickHandler(page) {
    this.setState({
      url: page,
      clickedUser: '',
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

  handleLogoutButtonClick() {
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
      return <Feed handleClick={this.changeView.bind(this)} posts={this.state.data} users={this.state.users} userInfo={this.state.userInfo} view={this.state.view} liked={this.state.liked}/>;
    } else if (view === 'profile') {
      //if clicked user is empty string, do what it normally does
      //else return profile component with user set to clickeduser
      if (this.state.clickedUser === '') {
        return <Profile loggedInUser ={this.state.currentUser} posts={this.state.posts} user={this.state.currentUser} userInfo={this.state.userInfo} liked={this.state.liked} handleEditButtonClick={this.handleEditButtonClick.bind(this)} handleLogoutButtonClick={this.handleLogoutButtonClick.bind(this)} view={this.state.view}/>
      } else {
        return <Profile loggedInUser ={this.state.currentUser} posts={this.state.posts} user={this.state.clickedUser} userInfo={this.state.userInfo} liked={this.state.liked} handleEditButtonClick={this.handleEditButtonClick.bind(this)} handleLogoutButtonClick={this.handleLogoutButtonClick.bind(this)} view={this.state.view}/>
      }
    } else if (view === 'signup') {
      return <Signup/>
    } else if (view === 'editprofile') {
      return <EditProfile/>
    } else if (view === 'createpost') {
      return <CreatePost onSubmit={this.changeView.bind(this)}/>
    }  else if (view === 'search') {
      return <Search posts={this.state.data} liked={this.state.liked}/>
    } 
      // else {
    //   return <Post user={this.state.userInfo} key={view._id} post={view} />
    // }
  }

  render() {
    return (
      <div>
        {
          this.state.isLoggedIn ?
          <div className="container">
            <div className="wrapper">
              <header>
                <Header view={this.state.view} currentUserHandle={this.state.userInfo.userHandle}/>
              </header>
              <div className="main">
                {this.renderView()}
              </div>
              <footer className="nav">
                <NavBar navBarClickHandler={this.changeView.bind(this)}/>
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
