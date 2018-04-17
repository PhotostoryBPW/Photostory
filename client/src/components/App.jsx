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
import Post from './Post.jsx';

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
      currentUser: 'nyancat',
      userInfo: {},
      user: { userHandle : 'nyancat',
              userPhotoUrl: 'http://source.unsplash.com/1600x900/?featured/?banana',
              userBio: 'Lorem ipsum dolor sit amet, melius pertinax ut mea. Quo odio verear appareat te, voluptaria dissentias no his, in vix ceteros lucilius lobortis. Eruditi appellantur eu sed, splendide consequuntur duo ei. Vim et sonet nonumy offendit, suas accusam reprehendunt vim ad.',
              postCount: 1,
              followsCount: 1,
              followedByCount: 1,
            },
    }
  }

  isLoggedInHandler() {
    localStorage['isLoggedIn'] = true;
    this.setState({ isLoggedIn: true});
    console.log('this is the app log in state', this.state.isLoggedIn);
  }

  setCurrent(userLoggedIn) {
    this.setState({ 
      currentUser: userLoggedIn,
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
  
  changeView(option) {
    this.setState({
      view: option
    })
  }

  clickHandler(page) {
    this.setState({
      url: page
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
        console.log('this is the posts array', posts),
        console.log('this is the comments array', comments),
        
        posts.map(post => {
          comments.forEach(comment => {
            console.log(comment.parent_id ===post.id);
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

  renderView() {
    const {view} = this.state;

    if (view === 'feed') {
<<<<<<< HEAD
      return <Feed handleClick={() => this.changeView(view)} posts={this.state.data} view={this.state.view}/>;
=======
      return <Feed handleClick={(() => this.changeView(view)) } posts={this.state.posts} users={this.state.users} userInfo={this.state.userInfo} view={this.state.view} liked={this.state.liked} />
>>>>>>> Begin building Like functionality
    } else if (view === 'profile') {
      return <Profile posts={this.state.posts} user={this.state.currentUser} userInfo={this.state.userInfo} liked={this.state.liked} handleClick={this.changeView.bind(this)} handleLogoutButtonClick={this.handleLogoutButtonClick.bind(this)}/>
    } else if (view === 'signup') {
      return <Signup/>
    } else if (view === 'profileEdit') {
      return <ProfileEdit/>
    } else if (view === 'createpost') {
      return <CreatePost />
    }  else if (view === 'search') {
      return <Search posts={this.state.posts}/>
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
                <Header view={this.state.view}/>
              </header>
              <div className="main">
                {this.renderView()}
              </div>
              <footer className="nav">
                <NavBar clickHandler={this.changeView.bind(this)}/>
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
