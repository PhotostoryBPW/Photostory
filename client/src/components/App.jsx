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


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: '',
      view: 'feed',
      posts: '',
      users: '',
      isLoggedIn: false,
      signupView: false,
      currentUser: '',
      // user: { userHandle : 'kfgdkfjghkj',
      //         userPhotoUrl: 'http://source.unsplash.com/1600x900/?featured/?banana',
      //         userBio: 'Lorem ipsum dolor sit amet, melius pertinax ut mea. Quo odio verear appareat te, voluptaria dissentias no his, in vix ceteros lucilius lobortis. Eruditi appellantur eu sed, splendide consequuntur duo ei. Vim et sonet nonumy offendit, suas accusam reprehendunt vim ad.',
      //         postCount: 1,
      //         followsCount: 1,
      //         followedByCount: 1,
      //       },
    }
  }

  isLoggedInHandler() {
    this.setState({ isLoggedIn: true});
    console.log('this is the app log in state', this.state.isLoggedIn);
  }

  setCurrent(userLoggedIn) {
    this.setState({ 
      currentUser: userLoggedIn,
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
    axios.get('api/checksession')
    .then( response => {
      if (response.data === 'active') {
        this.setState({
          isLoggedIn: true,
          posts: sample.posts,
          users: sample.users
        })
        this.getFeed();
      } else {
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
    axios.get('api/feed')
      .then( response => {
        this.setState({ 
          posts: response.data
        })
      })
      .catch( err => {
        console.log(err);
      })
  }

  renderView() {
    const {view} = this.state;
    if (view === 'feed') {
      return <Feed handleClick={(() => this.changeView(view)) } posts={this.state.posts} users={this.state.users} view={this.state.view}/>
    } else if (view === 'profile') {
      return <Profile posts={this.state.posts} user={this.state.currentUser} handleClick={this.changeView.bind(this)}/>
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
    //   return <Post key={view._id} post={view} />
    // }
  }

  render() {
    console.log(localStorage)
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
