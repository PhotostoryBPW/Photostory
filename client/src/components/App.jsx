import React from 'react';
import NavBar from './NavBar.jsx';
import Feed from './Feed.jsx'
import axios from 'axios';
import sample from '../sample_data.js';
import Header from './Header.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      view: 'feed',
      posts: '',
      users: ''
    }
    
  }

  componentDidMount() {
    this.setState({
      posts: sample.posts,
      users: sample.users
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

  componentDidMount() {
    this.getFeed();
    this.testEntry({ users_id: 1, body: "blah blah blah blah", postLoc: "test location", photoUrl: "source.unsplash.com/1600x900/?featured/?space", createdAt: Date.now() } );
  }

  testEntry(data) {
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
        console.log('response', response)
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
    }
     else if (view === 'profile') {
      return <Profile data={this.state.data} />
    } 
    // else if (view === 'create') {
    //   return <Create data={this.state.data} />
    // } else {
    //   return <Post key={view._id} post={view} />
    // }
  }
  
  render() {
    return (
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
    );
  }
}

export default App;
