import React from 'react';
import NavBar from './NavBar.jsx';
import Feed from './Feed.jsx'
import axios from 'axios';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      view: 'feed'
    }
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
    this.testEntry({ users_id: 1, body: "blah blah blah blah", postLoc: "test location", photoUrl: "http://bbbbb.com" } );
  }

  testEntry(data) {
    axios.post('/post', data)
      .then( response => {
        console.log('post success ', response.body);
      })
      .catch( err => {
        console.log(err);
      })
  }

  getFeed() {
    axios.get('/feed')
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
      return <Feed handleClick={(() => this.changeView(view)) } data={this.state.data} view={this.state.view}/>
    }
    //  else if (view === 'admin') {
    //   return <Admin data={this.state.data} />
    // } else if (view === 'create') {
    //   return <Create data={this.state.data} />
    // } else {
    //   return <Post key={view._id} post={view} />
    // }
  }
  
  render() {
    return (
      <div>
        <div className="nav">
          <span className="logo"
            onClick={() => this.changeView('feed')}>
            Photostory
          </span>
          <span className={
            this.state.view === 'feed'
            ? 'nav-selected'
            : 'nav-unselected'}
            onClick={() => this.changeView('feed')}>
            See all Posts
          </span>
        <div className="main">
          {this.renderView()}
        </div>
        <div className="nav">
          <NavBar/>
        </div>
      </div>
    </div>  
    );
  }
}

export default App;
